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

    console.log("Query Snapshot:", querySnapshot);

    const categories = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt,
      };
    });

    console.log("Fetched categories:", categories);

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}
