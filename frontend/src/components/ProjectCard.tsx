import '../styling/projectCard.css'

type ProjectCardProps = {
  name: String;
}

export function ProjectCard({ name }: ProjectCardProps) {

  return (
    <div className='project-card'>
      {name}
    </div>
  )

}