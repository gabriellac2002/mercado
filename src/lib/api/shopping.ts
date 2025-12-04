import { Shopping } from "@/app/types/shopping";
import { ApiResponse } from "./user";

// GET - Buscar todos os shoppings
export async function getShopping(): Promise<ApiResponse<Shopping[]>> {
  try {
    const response = await fetch("/api/shopping", {
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
      data: data.shopping,
    };
  } catch {
    return {
      success: false,
      error: "Erro de conexão",
    };
  }
}
