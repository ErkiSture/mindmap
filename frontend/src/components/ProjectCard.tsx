import '../styling/projectCardButton.css'

type ProjectCardProps = {
  name: String;
}

export function ProjectCard({ name }: ProjectCardProps) {

  return (
    <button className='project-card-button'>
      {name}
    </button>
  )

}