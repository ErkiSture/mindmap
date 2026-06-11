import { useState } from "react";

export default function useMutation<T>(
  fn: (...args: any[]) => Promise<Response>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mutate(...args: any[]) {
    setLoading(true);
    setError(null);

    try {
      const response = await fn(...args);

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || "Request failed");
        return;
      }
      setData(data);
    } catch (err) {
      console.error(err);
      setError("Request failed");
    } finally {
      setLoading(false);
    }
  }

  return { mutate, data, loading, error };
}