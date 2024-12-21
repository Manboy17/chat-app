export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: string,
  headers: Record<string, string> = {}
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  try {
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request to ${endpoint} failed:`, error);
    throw error;
  }
};
