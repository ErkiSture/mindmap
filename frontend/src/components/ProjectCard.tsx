import { useNavigate } from 'react-router-dom';
import '../styling/ProjectCard.css'
import ProjectSettingsButton from './ProjectSettingsButton';
import { useState } from 'react';
import ProjectSettingsMenu from './ProjectSettingsMenu';

type ProjectCardButtonProps = {
  name: String;
  id: number;
}

export function ProjectCardButton({ name, id }: ProjectCardButtonProps) {
  const navigate = useNavigate()

  const [ showSettings, setShowSettings ] = useState<boolean>(false);

  return (
    <>
      <div className="project-card" onClick={() => navigate(`/projects/${id}`)}>
        <ProjectSettingsButton showSettings={showSettings} setShowSettings={setShowSettings} />
          {name}
        { showSettings && (
          <ProjectSettingsMenu />
        )}
      </div>
    </>
  )
}