import { useParams } from "react-router-dom"
import type { Project } from "../types/project";
import Canvas from "../components/Canvas";
import useFetch from "../hooks/useFetch";import { useEffect, useState } from "react";


export default function Project() {
  const { projectId } = useParams();
  
  if (!projectId) return <div>Invalid project</div>

  const [ project, setProject ] = useState<Project | null>(null)

  const { data, loading, error } = useFetch<{ project: Project, message: string }>(`/api/projects/get/${projectId}`, { credentials: 'include' });

  useEffect(() => {
    setProject(data?.project ?? null);
    if (!loading) console.log(data?.message)
  }, [data])

  if (loading) return <div>Loading project...</div>
  if (error) return <div>Failed to load project: {error}</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <>
      <h1>{project.name}</h1>
      <Canvas project={project} />
    </>
  );
}