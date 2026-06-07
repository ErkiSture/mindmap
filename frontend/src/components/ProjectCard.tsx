import { useNavigate } from 'react-router-dom';
import '../styling/ProjectCard.css'
import ProjectSettingsButton from './ProjectSettingsButton';
import { useContext, useState } from 'react';
import ProjectSettingsMenu from './ProjectSettingsMenu';
import { ProjectsContext } from '../context/projectsContext';

type ProjectCardProps = {
  name: String;
  id: number;
}

export function ProjectCard({ name, id }: ProjectCardProps) {
  const context = useContext(ProjectsContext);
  const { toggleSettings, renameProject, showSettings, showSettingsCardId } = context!;
  const navigate = useNavigate()

  return (
    <>
      <div className="project-card" onClick={() => navigate(`/projects/${id}`)}>
        <ProjectSettingsButton name={name} id={id}/>
          {name}
        {showSettings && (id === showSettingsCardId) && (
          <ProjectSettingsMenu id={id}/>
        )}
      </div>
    </>
  )
}