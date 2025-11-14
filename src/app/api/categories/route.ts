import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";

export async function GET() {
  try {
    const categoriesQuery = query(
      collection(db, "categories"),
      where("deleted", "!=", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(categoriesQuery);

    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
    }));

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}
