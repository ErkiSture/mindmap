import '../styling/ProjectSettingsMenu.css'
import Edit from '../assets/Edit';
import Delete from '../assets/Delete'; 
import { useState } from 'react';
import ProjectCardRenameMenu from './ProjectCardRenameMenu';

type ProjectSettingsMenuProps = {
  id: number
  toggleSettings: Function
  renameProject: Function;
}

export default function ProjectSettingsMenu({ id, toggleSettings, renameProject }: ProjectSettingsMenuProps) {
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
      <ProjectCardRenameMenu setShowRenameMenu={setShowRenameMenu} id={id} toggleSettings={toggleSettings} renameProject={renameProject}></ProjectCardRenameMenu>
    )}
    </>
  )
}