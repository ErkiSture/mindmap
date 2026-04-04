import CanvasOverlay from "../components/canvas/CanvasOverlay"
import '../styling/canvas.css'
import Canvas from "../pages/Canvas"
import { useParams } from "react-router-dom";
import type { Project } from "../types/project";

import useFetch from "../hooks/useFetch";
export default function CanvasLayout() {

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
    <div className="canvas-wrapper">
      <Canvas project={project}></Canvas>
      <CanvasOverlay></CanvasOverlay>
    </div>
  )
}