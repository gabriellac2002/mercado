import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET - Buscar um usuário específico
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
      createdAt: userDoc.data()?.createdAt?.toDate().toISOString(),
      updatedAt: userDoc.data()?.updatedAt?.toDate().toISOString(),
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar usuário
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, email, role } = body;

    // Verificar se o usuário existe
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Validações
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Nome, email e função são obrigatórios" },
        { status: 400 }
      );
    }

    if (!["admin", "user"].includes(role)) {
      return NextResponse.json({ error: "Função inválida" }, { status: 400 });
    }

    // Atualizar dados do usuário
    await updateDoc(doc(db, "users", id), {
      name,
      email,
      role,
      updatedAt: serverTimestamp(),
    });

    // Buscar dados atualizados
    const updatedUserDoc = await getDoc(doc(db, "users", id));
    const updatedUserData = {
      id: updatedUserDoc.id,
      ...updatedUserDoc.data(),
      createdAt: updatedUserDoc.data()?.createdAt?.toDate().toISOString(),
      updatedAt: updatedUserDoc.data()?.updatedAt?.toDate().toISOString(),
    };

    return NextResponse.json(
      {
        message: "Usuário atualizado com sucesso",
        user: updatedUserData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir usuário
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    // Verificar se o usuário existe
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists() || userDoc.data()?.deleted === true) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Marcar usuário como deletado (soft delete)
    await updateDoc(doc(db, "users", id), {
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      { message: "Usuário excluído com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}
