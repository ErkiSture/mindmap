import '../styling/ProjectSettingsMenu.css'
import Edit from '../assets/Edit';
import Delete from '../assets/Delete'; 
import { useContext, useState } from 'react';
import ProjectCardRenameMenu from './ProjectCardRenameMenu';
import { ProjectsContext } from '../context/projectsContext';
import ProjectCardDeleteMenu from './projectCardDeleteMenu';

type ProjectSettingsMenuProps = {
  id: number
}

export default function ProjectSettingsMenu({ id }: ProjectSettingsMenuProps) {
  const context = useContext(ProjectsContext);
  const [showRenameMenu, setShowRenameMenu] = useState<boolean>(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);

  return (
    <>
    <div className="project-settings-menu" onClick={(e) => e.stopPropagation()}>
      <button id='project-card-rename-button' onClick={() => setShowRenameMenu(true)}>
        <Edit />
        <span>Rename Project</span>
      </button>
      <button id='project-card-delete-button' onClick={() => setShowDeleteMenu(true)}>
        <Delete />
        <span>Delete Project</span>
      </button>
    </div>
    { showRenameMenu && (
      <ProjectCardRenameMenu setShowRenameMenu={setShowRenameMenu} id={id}></ProjectCardRenameMenu>
    )}
    { showDeleteMenu && (
      <ProjectCardDeleteMenu setShowDeleteMenu={setShowDeleteMenu} id={id}></ProjectCardDeleteMenu>
    )}
    </>
  )
}