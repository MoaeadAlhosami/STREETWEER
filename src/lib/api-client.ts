const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "https://fakestoreapi.com";

// Get token from storage (for client-side requests)
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed?.state?.token || null;
    }
  } catch {
    return null;
  }
  return null;
};

async function request<T>(path: string, init?: RequestInit & { requiresAuth?: boolean }): Promise<T> {
  const token = init?.requiresAuth ? getToken() : null;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${path}`, {
    ...init,
    headers,
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong fetching data.";
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorData?.error || errorMessage;
    } catch {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit & { requiresAuth?: boolean }) => 
    request<T>(path, { ...init, method: "GET" }),
  
  post: <T>(path: string, body?: unknown, init?: RequestInit & { requiresAuth?: boolean }) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body ?? {}),
      ...init,
    }),
  
  put: <T>(path: string, body?: unknown, init?: RequestInit & { requiresAuth?: boolean }) =>
    request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body ?? {}),
      ...init,
    }),
  
  delete: <T>(path: string, init?: RequestInit & { requiresAuth?: boolean }) =>
    request<T>(path, {
      method: "DELETE",
      ...init,
    }),
};

