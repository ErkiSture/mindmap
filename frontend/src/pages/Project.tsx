import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Project } from "../types/project";


export default function Project() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);

  async function getProject() {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
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
        setProject(data.project)
      } else {
        console.error('Error fetching project on server: ', res.status, data.message);
      }

    } catch (err) {
      console.error('Network or fetch error during project creation: ', err);
    }


  }


  useEffect(() => {
    getProject()
  });

  return (
    <h1>Project id: {projectId}</h1>
  )
}