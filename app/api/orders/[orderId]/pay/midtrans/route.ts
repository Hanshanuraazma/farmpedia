import { NextRequest, NextResponse } from "next/server";
import { getAuthUserId, getCurrentUser } from "@/lib/firebase-admin-auth";
import { client } from "@/sanity/lib/client";
import { ORDER_STATUSES, PAYMENT_STATUSES } from "@/lib/orderStatus";
import { snap } from "@/lib/midtrans";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const userId = await getAuthUserId();
    const user = await getCurrentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await params;

    const order = await client.fetch(
      `*[_type == "order" && _id == $orderId && firebaseUid == $userId][0]{
        _id,
        orderNumber,
        customerName,
        email,
        firebaseUid,
        status,
        paymentStatus,
        paymentMethod,
        totalPrice,
        subtotal,
        shipping,
        tax,
        productDiscount,
        amountDiscount,
        businessDiscount,
        coupon {
          discountAmount
        },
        currency,
        address
      }`,
      { orderId, userId },
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (
      order.status === ORDER_STATUSES.PAID ||
      order.paymentStatus === PAYMENT_STATUSES.PAID
    ) {
      return NextResponse.json(
        { error: "Order is already paid" },
        { status: 400 },
      );
    }

    if (order.status === ORDER_STATUSES.CANCELLED) {
      return NextResponse.json(
        { error: "Cannot pay for cancelled order" },
        { status: 400 },
      );
    }

    const totalAmount =
      (order.subtotal || 0) + (order.shipping || 0) + (order.tax || 0);

    const couponDiscount = order.coupon?.discountAmount || order.amountDiscount || 0;
    const businessDiscount = order.businessDiscount || 0;
    const totalDiscount = couponDiscount + businessDiscount + (order.productDiscount || 0);
    const payableAmount = totalAmount - totalDiscount;

    const transactionId = `FARM-${order.orderNumber || order._id.substring(0, 8)}-${Date.now()}`;
    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "https://farmpediagopedia.vercel.app";

    // Convert to IDR for Midtrans processing (mock exchange rate for demo)
    let exchangeRate = 1;
    if (order.currency === "USD") exchangeRate = 17000;
    else if (order.currency === "SGD") exchangeRate = 13000;
    else if (!order.currency) exchangeRate = 13000; // default assumption to SGD now

    const finalAmountIDR = Math.round(payableAmount * exchangeRate);

    const parameter = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: finalAmountIDR,
      },
      customer_details: {
        first_name: order.customerName,
        email: order.email || user.email || "customer@farmpedia.com",
        phone: order.address?.phone || "0800000000",
        billing_address: {
          first_name: order.address?.name || order.customerName,
          address: order.address?.address || "",
          city: order.address?.city || "",
          postal_code: order.address?.zip || "",
          country_code: "IDN"
        }
      },
      callbacks: {
        finish: `${baseUrl}/payment-success?order_id=${order._id}&orderNumber=${order.orderNumber || ""}`,
        error: `${baseUrl}/user/orders/${order._id}?cancelled=true`,
        unfinish: `${baseUrl}/user/orders/${order._id}?cancelled=true`
      }
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      success: true,
      token: transaction.token,
      gatewayUrl: transaction.redirect_url,
      message: "Midtrans session created successfully",
    });
  } catch (error: any) {
    console.error("Midtrans payment error:", error);
    return NextResponse.json(
      { error: "Failed to create Midtrans payment session: " + error.message },
      { status: 500 },
    );
  }
}
