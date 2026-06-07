import { useState } from "react";

export default function useMutation<T>(fn: Function) {

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  async function mutate(...args: any[]) {
    setLoading(true);
    setError(null);

    const result = await fn(...args);
    console.log("result", result)   

    if (result.ok) {
    setData(result.data);
    } else {
    setError(result.data?.message || "Error");
    }

    setLoading(false);
    return await result.json();
  };
  return { mutate, data, loading, error }
}