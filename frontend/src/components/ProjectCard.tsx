import { useNavigate } from 'react-router-dom';
import '../styling/ProjectCard.css'
import ProjectSettingsButton from './ProjectSettingsButton';

type ProjectCardButtonProps = {
  name: String;
  id: number;
}

export function ProjectCardButton({ name, id }: ProjectCardButtonProps) {
  const navigate = useNavigate()

  return (
    <>
      <div className='project-card' onClick={() => navigate(`/projects/${id}`)}>
        <ProjectSettingsButton />
          {name}
      </div>
    </>
  )
}