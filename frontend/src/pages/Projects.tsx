import { useEffect, useState } from "react";
import '../styling/projects.css'
import { ProjectCard } from "../components/ProjectCard";
import type { Project } from '../types/project';
import useFetch from "../hooks/useFetch";
import apiFetch from "../utils/apiFetch";


export default function Projects() {

  const { data, loading, error } = useFetch<{ projects: Project[] }>(
    "api/projects/get", 
    { credentials: "include" }
  )
 
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => {if (data?.projects) setProjects(data.projects)}, [data])

  const [ showSettingsCardId, setShowSettingsCardId ] = useState<number | null>(null);
  const [ showSettings, setShowSettings ] = useState<boolean>(false);

  function toggleSettings(projectId: number) {
    if (showSettingsCardId === projectId) {
      setShowSettingsCardId(null);
      setShowSettings(false);
    } else {
      setShowSettingsCardId(projectId);
      setShowSettings(true);
    }
  }

  function setProjectName(projectId: number, newName: String) {}
  
  async function createProject() {
    const { ok, data } = await apiFetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({name: 'Unnamed'})
    });

    if (ok) {
      setProjects([...projects, data.project]);
      console.log(data.message)
    } else {
      console.error(data.message);
    }
  }

  if (loading) return <div>Loading projects...</div>
  if (error) return <div>Failed to retrieve projects: {error}</div>
    
  const projectCards = projects.map((project) => {
    return <ProjectCard 
      key={project.id} 
      name={project.name} 
      id={project.id} 
      showSettingsCardId = {showSettingsCardId}
      showSettings = {showSettings}
      toggleSettings={toggleSettings}>
    </ProjectCard>
  })

  return (
      <>
        <div className="project-cards-container">{projectCards}</div>
        <button onClick={() => createProject()}>Create project</button>  
      </>
  )
}