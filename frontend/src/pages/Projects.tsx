import { useEffect, useState } from "react";
import '../styling/projects.css'
import { ProjectCardButton } from "../components/ProjectCardButton";
import type { Project } from '../types/project';


export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
 
  async function createProject() {
    try {
      const res = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({name: 'Unnamed'})
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Server returned an invalid response' };
      }

      if (res.ok) {
        console.log(res.status, data.message);
        setProjects([...projects, data.project]);
      } else {
        console.error('Error creating project on server: ', res.status, data.message);
        return;
      }

    } catch (err) {
      console.error('Network or fetch error during project creation: ', err);
    }
  }

  async function getProjects() {
  try {
    const res = await fetch('/api/projects/get', {
      method: 'GET',
      credentials: 'include',
    })
    
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: 'Server returned an invalid response'}
    }

    if (res.ok) {
      console.log(res.status, data.message, data.projects);
      setProjects(data.projects)
      setLoadingProjects(false);
      setError(null);
    } else {
      console.log('Error fetching projects on server: ', res.status, data.message);
      setError(data.message);
      setLoadingProjects(false);
    }

  } catch (err) {
      console.error('Network or fetch error while gettign projects: ', err)
    }
  }

  useEffect(() => {
    getProjects();
  }, [])

  const projectCards = projects.map((project) => {
    return <ProjectCardButton key={project.id} name={project.name} id={project.id}></ProjectCardButton>
  })

  return (
    <>
    {error ?
      <div>Failed to retrieve projects: {error}</div>
    : loadingProjects ?
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