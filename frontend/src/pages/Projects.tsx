import { useEffect, useState } from "react";
import '../styling/projects.css'
import { ProjectCard } from "../components/ProjectCard";
import type { Project } from '../types/project';


export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([])

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
    } else {
      console.log('Error fetching projects on server: ', res.status, data.message);
    }

  } catch (err) {
      console.error('Network or fetch error while gettign projects: ', err)
    }
  }

  useEffect(() => {
    getProjects();
  }, [])

  const projectCards = projects.map((project, index) => {
    return <ProjectCard key={index} name={project.name}></ProjectCard>
  })

  return (
    <>
      <h1>{ }</h1>
      <h1>Projects page</h1>
        <div className="project-cards-container"> 
          {projects ? projectCards : <div>Loading projects...</div>} 
        </div>
      <button onClick={() => createProject()}>Create project</button>  
    </>
  );
}

//Fix loading status for display of projects