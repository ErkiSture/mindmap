import { useParams } from "react-router-dom"
import type { Project } from "../types/project";
import Canvas from "../components/Canvas";
import useFetch from "../hooks/useFetch";

export default function Project() {
  const { projectId } = useParams();

  if (!projectId) return <div>Invalid project</div>

  const { data, loading, error } = useFetch<{ project: Project, message: string }>(
    `/api/projects/get/${projectId}`,
    { credentials: "include" }
  );

  const project = data?.project ?? null;

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