import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Shopping, PaymentMethod } from "@/app/types/shopping";
import { Product } from "@/app/types/product";
import { UpdateResult } from "@/hooks/crud/types";

export type CompleteShoppingData = {
  paymentMethod: PaymentMethod;
  isPaid: boolean;
};

export async function completeShopping(
  shoppingData: Shopping
): Promise<UpdateResult> {
  try {
    return await runTransaction(db, async (transaction) => {
      const stockUpdates: { productId: string; newQuantity: number }[] = [];

      for (const item of shoppingData.items) {
        const productDoc = await transaction.get(
          doc(db, "products", item.productId)
        );

        if (!productDoc.exists() || productDoc.data()?.deleted === true) {
          throw new Error(`Produto ${item.productName} não foi encontrado`);
        }

        const product = productDoc.data() as Product;

        if (Number(product.quantity) < item.quantity) {
          throw new Error(
            `Estoque insuficiente para ${item.productName}. Disponível: ${product.quantity}, Solicitado: ${item.quantity}`
          );
        }

        const newQuantity = Number(product.quantity) - item.quantity;
        stockUpdates.push({ productId: item.productId, newQuantity });
      }

      const newShoppingData = {
        items: shoppingData.items,
        totalAmount: shoppingData.totalAmount,
        status: "completed" as const,
        paymentMethod: shoppingData.paymentMethod,
        isPaid: shoppingData.isPaid,
        paidAt: shoppingData.isPaid ? serverTimestamp() : null,
        notes: shoppingData.notes || null,
        completedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        deleted: false,
        deletedAt: null,
      };

      const shoppingRef = doc(collection(db, "shopping"));
      transaction.set(shoppingRef, newShoppingData);

      for (const update of stockUpdates) {
        const productRef = doc(db, "products", update.productId);
        transaction.update(productRef, {
          quantity: update.newQuantity,
          updatedAt: serverTimestamp(),
        });
      }

      return {
        success: true,
        data: {
          id: shoppingRef.id,
          message: `Compra processada com sucesso! ${shoppingData.items.length} ${shoppingData.items.length === 1 ? "item processado" : "itens processados"} e estoque atualizado.`,
        },
      };
    });
  } catch (error) {
    console.error("Erro ao concluir compra:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

export async function updatePaymentStatus(
  shoppingId: string,
  isPaid: boolean
): Promise<UpdateResult> {
  try {
    const shoppingDoc = await getDoc(doc(db, "shopping", shoppingId));

    if (!shoppingDoc.exists() || shoppingDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Lista de compras não encontrada",
      };
    }

    await updateDoc(doc(db, "shopping", shoppingId), {
      isPaid,
      paidAt: isPaid ? serverTimestamp() : null,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: {
        message: isPaid
          ? "Pagamento confirmado com sucesso!"
          : "Status de pagamento atualizado!",
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar status de pagamento:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function cancelShopping(
  shoppingId: string
): Promise<UpdateResult> {
  try {
    const shoppingDoc = await getDoc(doc(db, "shopping", shoppingId));

    if (!shoppingDoc.exists() || shoppingDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Lista de compras não encontrada",
      };
    }

    const shopping = shoppingDoc.data() as Shopping;

    if (shopping.status === "completed") {
      return {
        success: false,
        error: "Não é possível cancelar uma compra já concluída",
      };
    }

    await updateDoc(doc(db, "shopping", shoppingId), {
      status: "cancelled",
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: "Compra cancelada com sucesso!" },
    };
  } catch (error) {
    console.error("Erro ao cancelar compra:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}
