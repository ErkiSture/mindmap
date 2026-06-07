import type React from 'react';
import '../styling/ProjectCardRenameMenu.css'
import { useContext, useState } from 'react';
import { ProjectsContext } from '../context/projectsContext';

type Props = {
  setShowDeleteMenu: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

export default function ProjectCardDeleteMenu({ setShowDeleteMenu, id }: Props) {
  const context = useContext(ProjectsContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<String | null>();

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setLoadingError(null);
    const { success, error } = await context!.deleteProject(id);
    setLoading(false);
    setLoadingError(error);
    
    if (!success) return;
    context!.toggleSettings(id);
  }
  
  function cancel() {
    setShowDeleteMenu(false);
    context!.toggleSettings(id);
  }

  return (
    <div className="project-card-rename-menu-overlay" onClick={(e) => e.stopPropagation()}>
      <div className='project-card-rename-menu'>
        <form onSubmit={onSubmit}>
          <label htmlFor="project-name">Are you sure you want to delete this project?</label>
          <div className='button-row'>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <button type='submit'>
              OK
            </button>
          </div>
          { loadingError && (
            <div>Error removing project</div>
          )}

          { loading && (
            <div>removing...</div>
          )}
        </form>
      </div>
    </div>
  )
}