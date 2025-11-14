import { Category } from "@/app/types/category";
import { ApiResponse } from "./user";

// GET - Buscar todas as categorias
export async function getCategories(): Promise<ApiResponse<Category[]>> {
  try {
    const response = await fetch("/api/categories", {
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
