import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    if (!["admin", "user"].includes(role)) {
      return NextResponse.json({ error: "Função inválida" }, { status: 400 });
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      deleted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: {
          uid: user.uid,
          name,
          email,
          role,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Erro ao criar usuário:", error);

    let errorMessage = "Erro interno do servidor";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este email já está em uso";
          break;
        case "auth/invalid-email":
          errorMessage = "Email inválido";
          break;
        case "auth/weak-password":
          errorMessage = "Senha muito fraca";
          break;
        default:
          errorMessage = error.message || "Erro ao criar usuário";
      }

      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const usersQuery = query(
      collection(db, "users"),
      where("deleted", "!=", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(usersQuery);

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
