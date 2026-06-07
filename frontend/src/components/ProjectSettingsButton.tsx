import '../styling/iconButton.css'
import ThreeDots from '../assets/ThreeDots';
import ProjectSettingsMenu from './ProjectSettingsMenu';
import { ProjectsContext } from '../context/projectsContext';
import { useContext } from 'react';

type ProjectSettingsButtonProps = {
  name: String
  id: number
}

export default function ProjectSettingsButton( { name, id }: ProjectSettingsButtonProps) {
    const context = useContext(ProjectsContext);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
      console.log(context?.toggleSettings);
      context?.toggleSettings(id);
    }

    return (
      <>
        <button className="project-settings-button icon-button" onClick={(e) => handleClick(e)}>
            <ThreeDots />
        </button>
      </>
    )
}