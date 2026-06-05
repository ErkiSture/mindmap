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
    const res = fetch("/api/project/rename", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify("dfgdg")
    })
  }
  
  function cancel() {
    setShowRenameMenu(false)
    toggleSettings(id)
  }

  return (
    <div className="project-card-rename-menu-overlay" onClick={(e) => e.stopPropagation()}>
      <div className='project-card-rename-menu'>
        <form onSubmit={onSubmit}>
          <label htmlFor="project-name">New Project Name:</label>
          <input id="project-name" type="text"/>
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