import type React from 'react';
import '../styling/ProjectCardRenameMenu.css'

type Props = {
  setShowRenameMenu: React.Dispatch<React.SetStateAction<boolean>>;
  id: number
  toggleSettings: Function;
}

export default function ProjectCardRenameMenu({ setShowRenameMenu, id, toggleSettings }: Props) {

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  
  function cancel() {
    setShowRenameMenu(false)
    toggleSettings(id)
  }

  return (
    <div className="project-card-rename-menu-overlay" onClick={(e) => e.stopPropagation()}>
      <div className='project-card-rename-menu'>
        <form onSubmit={onSubmit}>
          <input type="text"/>
          <div className='button-row'>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <button type='submit'>
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}