export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UpdateUserData {
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function createUser(
  userData: CreateUserData
): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao criar usuário",
      };
    }

    return {
      success: true,
      data: data.user,
    };
  } catch {
    return {
      success: false,
      error: "Erro de conexão",
    };
  }
}

// GET - Buscar todos os usuários
export async function getUsers(): Promise<ApiResponse<User[]>> {
  try {
    const response = await fetch("/api/users", {
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
      data: data.users,
    };
  } catch {
    return {
      success: false,
      error: "Erro de conexão",
    };
  }
}

// GET - Buscar um usuário específico
export async function getUser(id: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao buscar usuário",
      };
    }

    return {
      success: true,
      data: data.user,
    };
  } catch {
    return {
      success: false,
      error: "Erro de conexão",
    };
  }
}

// PUT - Atualizar usuário
export async function updateUser(
  id: string,
  userData: UpdateUserData
): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao atualizar usuário",
      };
    }

    return {
      success: true,
      data: data.user,
    };
  } catch {
    return {
      success: false,
      error: "Erro de conexão",
    };
  }
}

// DELETE - Excluir usuário
export async function deleteUser(id: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao excluir usuário",
      };
    }

    return {
      success: true,
      data: data.message,
    };
  } catch {
    return {
      success: false,
      error: "Erro de conexão",
    };
  }
}
