import '../../styling/icon/iconButton.css'
import ThreeDots from '../../assets/ThreeDots';
import { ProjectsContext } from '../../context/projectsContext';
import { useContext } from 'react';

type ProjectSettingsButtonProps = {
  name: string
  id: number
}

export default function ProjectSettingsButton( { name, id }: ProjectSettingsButtonProps) {
    const context = useContext(ProjectsContext);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
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