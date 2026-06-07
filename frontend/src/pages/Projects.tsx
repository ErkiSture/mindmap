import { useContext, useEffect, useState } from "react";
import '../styling/projects.css'
import { ProjectCard } from "../components/ProjectCard";
import type { Project } from '../types/project';
import useFetch from "../hooks/useFetch";
import apiFetch from "../utils/apiFetch";
import { ProjectsContext } from "../context/projectsContext";


export default function Projects() {
  const context = useContext(ProjectsContext);
  const { toggleSettings, renameProject, deleteProject, createProject, showSettings, showSettingsCardId, projects, loading, error, createProjectLoading, createProjectError } = context!;

  if (loading) return <div>Loading projects...</div>
  if (error) return <div>Failed to retrieve projects: {error}</div>
    
  const projectCards = projects.map((project) => {
    return <ProjectCard
      key={project.id} 
      name={project.name} 
      id={project.id}>
    </ProjectCard>
  })
  return (
      <>
        <div className="project-cards-container">{projectCards}</div>
        <button onClick={() => createProject()}>Create project</button> 

        { createProjectError && (
          <div>Failed to create a project</div>
        )} 

        { createProjectLoading && (
          <div>Creating project...</div>
        )} 
      </>
  )
}