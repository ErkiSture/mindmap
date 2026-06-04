import { useNavigate } from 'react-router-dom';
import '../styling/ProjectCard.css'
import ProjectSettingsButton from './ProjectSettingsButton';
import { useState } from 'react';
import ProjectSettingsMenu from './ProjectSettingsMenu';

type ProjectCardProps = {
  name: String;
  id: number;
  showSettingsCardId: number | null;
  showSettings: boolean;
  toggleSettings: Function;
}

export function ProjectCard({ name, id, showSettingsCardId, showSettings, toggleSettings }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <>
      <div className="project-card" onClick={() => navigate(`/projects/${id}`)}>
        <ProjectSettingsButton name={name} id={id} toggleSettings={toggleSettings}/>
          {name}
        {showSettings && (id === showSettingsCardId) && (
          <ProjectSettingsMenu id={id} toggleSettings={toggleSettings}/>
        )}
      </div>
    </>
  )
}