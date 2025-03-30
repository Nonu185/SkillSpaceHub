import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Implement request caching for GET requests
  const cacheKey = `${method}-${url}-${data ? JSON.stringify(data) : ''}`;
  
  // Only cache GET requests
  if (method === 'GET' && sessionStorage.getItem(cacheKey)) {
    const cachedResponse = JSON.parse(sessionStorage.getItem(cacheKey) || '');
    const cachedTime = cachedResponse.timestamp;
    
    // Use cache if it's less than 60 seconds old
    if (Date.now() - cachedTime < 60000) {
      const response = new Response(JSON.stringify(cachedResponse.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      return response;
    }
  }
  
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  
  // Cache successful GET responses
  if (method === 'GET' && res.ok) {
    const clonedRes = res.clone();
    const responseData = await clonedRes.json();
    sessionStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: responseData
    }));
  }
  
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});
