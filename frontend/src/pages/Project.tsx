import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Project } from "../types/project";
import Canvas from "../components/Canvas";
import useProject from "../hooks/useProject";

export default function Project() {
  const { projectId } = useParams();
  
  if (!projectId) return <div>Invalid project</div>

  const { project, loading, error } = useProject(projectId);

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