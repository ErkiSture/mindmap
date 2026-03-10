import { useState, useEffect } from "react";
import type { Project } from "../types/project";


export default function useProject(projectId: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null)

  async function getProject(projectId: string) {
    try {
      const res = await fetch(`/api/projecsts/${projectId}`, {
        method: "GET",
        credentials: "include",      
      })

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Server returned an invalid response' };
      }

      if (res.ok) {
        setProject(data.project);
        setLoading(false);
        setError(null);
      } else {
        console.error('Error fetching project on server: ', res.status, data.message);
        setError(data.message);
        setLoading(false);
      }
    } catch (err) {
      console.error('Network or fetch error during project creation: ', err);
    }
  }

  useEffect(() => {
    getProject(projectId)
  }, [projectId])

  return { project, loading, error}
}