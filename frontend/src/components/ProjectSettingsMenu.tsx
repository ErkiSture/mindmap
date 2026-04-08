import '../styling/ProjectSettingsMenu.css'
import Edit from '../assets/Edit';
import Delete from '../assets/Delete'; 
import { useState } from 'react';
import ProjectCardRenameMenu from './ProjectCardRenameMenu';

export default function ProjectSettingsMenu() {
  const [showRenameMenu, setShowRenameMenu] = useState<boolean>(false);

  return (
    <>
    <div className="project-settings-menu" onClick={(e) => e.stopPropagation()}>
      <button id='project-card-rename-button' onClick={() => setShowRenameMenu(true)}>
        <Edit />
        <span>Rename Project</span>
      </button>
      <button id='project-card-delete-button'>
        <Delete />
        <span>Delete Project</span>
      </button>
    </div>
    { showRenameMenu && (
      <ProjectCardRenameMenu></ProjectCardRenameMenu>
    )}
    </>
  )
}