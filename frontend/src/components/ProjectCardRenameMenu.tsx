import type React from 'react';
import '../styling/ProjectCardRenameMenu.css'
import { useState } from 'react';

type Props = {
  setShowRenameMenu: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  toggleSettings: Function;
  renameProject: Function;
}

export default function ProjectCardRenameMenu({ setShowRenameMenu, id, toggleSettings, renameProject }: Props) {

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<String | null>();

  // renameProject is passed from Projects.tsx and updates project name frontend and backend
  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const value = (form.elements.namedItem("project-name") as HTMLInputElement).value;

    setLoading(true);
    setLoadingError(null);
    const { success, error } = await renameProject(id, value);
    setLoading(false);
    setLoadingError(error);
    
    if (!success) return;
    toggleSettings(id);
  }
  
  function cancel() {
    setShowRenameMenu(false);
    toggleSettings(id);
  }

  return (
    <div className="project-card-rename-menu-overlay" onClick={(e) => e.stopPropagation()}>
      <div className='project-card-rename-menu'>
        <form onSubmit={onSubmit}>
          <label htmlFor="project-name">New Project Name:</label>
          <input name='project-name' id="project-name" type="text"/>
          <div className='button-row'>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <button type='submit'>
              OK
            </button>
          </div>
          { loadingError && (
            <div>Error updating project name</div>
          )}

          { loading && (
            <div>Saving...</div>
          )}
        </form>
      </div>
    </div>
  )
}