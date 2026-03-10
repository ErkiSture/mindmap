import { useNavigate } from 'react-router-dom';
import '../styling/projectCardButton.css'

type ProjectCardButtonProps = {
  name: String;
  id: number;
}

export function ProjectCardButton({ name, id }: ProjectCardButtonProps) {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(`/projects/${id}`)}  className='project-card-button'>
      {name}
    </button>
  )
}