import '../styling/ProjectSettingsMenu.css'
import Edit from '../assets/Edit';
import Delete from '../assets/Delete'; 

export default function ProjectSettingsMenu() {
  return (
    <div className="project-settings-menu" onClick={(e) => e.stopPropagation()}>
      <button>
        <Edit />
        <span>Rename Project</span>
      </button>
      <button>
        <Delete />
        <span>Delete Project</span>
      </button>
    </div>
  )
}