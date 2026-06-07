import type React from 'react';
import '../styling/ProjectCardActionMenu.css'
import { useContext, useState } from 'react';
import { ProjectsContext } from '../context/projectsContext';

type Props = {
  setShowRenameMenu: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

export default function ProjectCardRenameMenu({ setShowRenameMenu, id }: Props) {
  const context = useContext(ProjectsContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<String | null>();

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    if (loading) return;

    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const value = (form.elements.namedItem("project-name") as HTMLInputElement).value;

    setLoading(true);
    setLoadingError(null);
    const { success, error } = await context!.renameProject(id, value);
    setLoading(false);
    setLoadingError(error);
    
    if (!success) return;
    context!.toggleSettings(id);
  }
  
  function cancel() {
    setShowRenameMenu(false);
    context!.toggleSettings(id);
  }

  return (
    <div className="project-card-action-menu-overlay" onClick={(e) => e.stopPropagation()}>
      <div className='project-card-action-menu'>
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