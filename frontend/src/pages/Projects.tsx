import { useContext } from "react";
import '../styling/project/projects.css'
import { ProjectCard } from "../components/project/ProjectCard";
import { ProjectsContext } from "../context/projectsContext";


export default function Projects() {
  const context = useContext(ProjectsContext);
  const { createProject, projects, loadingProjects, loadingProjectsError, createProjectLoading, createProjectError } = context!;

  if (loadingProjects) return <div>Loading projects...</div>
  if (loadingProjectsError) return <div>Failed to retrieve projects: {loadingProjectsError}</div>

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