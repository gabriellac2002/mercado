import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";

export async function GET() {
  try {
    const productsQuery = query(
      collection(db, "products"),
      where("deleted", "!=", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(productsQuery);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
