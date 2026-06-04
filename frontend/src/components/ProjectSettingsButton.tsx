import '../styling/iconButton.css'
import ThreeDots from '../assets/ThreeDots';
import ProjectSettingsMenu from './ProjectSettingsMenu';

type ProjectSettingsButtonProps = {
  name: String
  id: number
  toggleSettings: Function;
}

export default function ProjectSettingsButton( { name, id, toggleSettings }: ProjectSettingsButtonProps) {

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
      toggleSettings(id)
    }

    return (
      <>
        <button className="project-settings-button icon-button" onClick={(e) => handleClick(e)}>
            <ThreeDots />
        </button>
      </>
    )
}