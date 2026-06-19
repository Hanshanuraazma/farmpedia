import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

const products = [
  { name: "Susu Sapi Murni Pasteurisasi 1L", price: 25000, stock: 50, description: "Susu sapi segar yang dipasteurisasi." },
  { name: "Telur Ayam Kampung Organik (10 Butir)", price: 35000, stock: 30, description: "Telur ayam kampung organik kaya omega 3." },
  { name: "Daging Sapi Khas Dalam 500g", price: 80000, stock: 20, description: "Daging sapi pilihan segar untuk masakan." },
  { name: "Sayur Bayam Hidroponik 250g", price: 15000, stock: 40, description: "Sayur bayam segar bebas pestisida." },
  { name: "Beras Merah Organik 1kg", price: 28000, stock: 60, description: "Beras merah tinggi serat untuk kesehatan." },
  { name: "Madu Hutan Asli 250ml", price: 75000, stock: 25, description: "Madu murni dari hutan liar." },
  { name: "Ayam Broiler Utuh Bersih 1kg", price: 40000, stock: 35, description: "Ayam potong segar siap masak." },
  { name: "Buah Naga Merah 1kg", price: 30000, stock: 20, description: "Buah naga manis dan segar." },
  { name: "Tempe Kedelai Super 500g", price: 10000, stock: 50, description: "Tempe kedelai murni tanpa campuran." },
  { name: "Tahu Putih Segar (10 Pcs)", price: 12000, stock: 45, description: "Tahu putih lembut cocok untuk tumisan." },
  { name: "Susu Kambing Etawa Murni 500ml", price: 35000, stock: 15, description: "Susu kambing segar tanpa pengawet." },
  { name: "Tomat Ceri Organik 250g", price: 18000, stock: 30, description: "Tomat ceri manis untuk salad." },
  { name: "Wortel Segar Brastagi 500g", price: 14000, stock: 40, description: "Wortel manis kaya vitamin A." },
  { name: "Bawang Merah Brebes 500g", price: 25000, stock: 60, description: "Bawang merah pilihan dengan kualitas terbaik." },
  { name: "Kentang Dieng Super 1kg", price: 22000, stock: 35, description: "Kentang segar cocok untuk digoreng atau direbus." }
];

export async function GET() {
  try {
    const createdProducts = [];
    
    for (const prod of products) {
      // Create a slug from the name
      const slugValue = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      const doc = {
        _type: "product",
        name: prod.name,
        slug: {
          _type: "slug",
          current: slugValue,
        },
        price: prod.price,
        stock: prod.stock,
        description: prod.description,
        status: "new",
        hasWeights: false,
        hasVariants: false,
        isFeatured: true
      };
      
      const result = await writeClient.create(doc);
      createdProducts.push(result);
    }
    
    return NextResponse.json({ success: true, message: "Created 15 products successfully", data: createdProducts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
