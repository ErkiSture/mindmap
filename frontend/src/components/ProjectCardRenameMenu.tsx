import '../styling/ProjectCardRenameMenu.css'

export default function ProjectCardRenameMenu() {
  return (
    <div className="project-card-rename-menu-overlay" onClick={(e) => e.stopPropagation()}>
      <div className='project-card-rename-menu'>
        <button>
          <span>Rename Project</span>
        </button>
      </div>
    </div>
  )
}