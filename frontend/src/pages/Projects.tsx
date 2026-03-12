import { useEffect, useState } from "react";
import '../styling/projects.css'
import { ProjectCardButton } from "../components/ProjectCardButton";
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
    
  const projectCards = projects.map((project) => {
    return <ProjectCardButton key={project.id} name={project.name} id={project.id}></ProjectCardButton>
  })

  return (
    <>
    {error ?
      <div>Failed to retrieve projects: {error}</div>
    : loading ?
      <>
        <div>loading projects...</div>
      </>
    : projectCards.length > 0 ?
      <>
        <div className="project-cards-container">{projectCards}</div>
        <button onClick={() => createProject()}>Create project</button>  
      </>
    :
      <>
        <div>You have no projects</div>
        <button onClick={() => createProject()}>Create project</button>  
      </>
    }
    </>
  )
}