import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";

export async function GET() {
  try {
    const shoppingQuery = query(
      collection(db, "shopping"),
      where("deleted", "!=", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(shoppingQuery);

    const shopping = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        totalAmount: Number(data.totalAmount) || 0,
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
        completedAt: data.completedAt?.toDate().toISOString(),
        paidAt: data.paidAt?.toDate().toISOString(),
        deletedAt: data.deletedAt?.toDate().toISOString(),
      };
    });

    return NextResponse.json({ shopping }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    return NextResponse.json(
      { error: "Erro ao buscar compras" },
      { status: 500 }
    );
  }
}
