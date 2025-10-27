import { Product } from "@/app/types/product";
import { ApiResponse } from "./user";

// GET - Buscar todos os produtos
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  try {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao buscar usuários",
      };
    }

    return {
      success: true,
      data: data.products,
    };
  } catch {
    return {
      success: false,
      error: "Erro de conexão",
    };
  }
}
