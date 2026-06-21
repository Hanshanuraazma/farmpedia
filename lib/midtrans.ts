// @ts-ignore
import midtransClient from "midtrans-client";

// Midtrans Snap Configuration
export const snap = new midtransClient.Snap({
  isProduction: false, // Sandbox mode
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});
