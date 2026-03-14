import { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";
import type { Dispatch, SetStateAction } from "react";

export default function useFetch<T>(url: string,  options?: RequestInit):  
{ 
  data: T | null,
  loading: boolean,
  error: string | null,
  setData: Dispatch<SetStateAction<T | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
} 
{
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    async function getData() {
      const res = await apiFetch(url, options);

      if (res.ok) {
        setData(res.data);
        setLoading(false);
      } else {
        setError(res.data.message || "Unknown error");
        setLoading(false);
      }
    }

    getData()
  }, [])
  return { data, loading, error, setData, setLoading, setError }
}

