import '../styling/iconButton.css'
import ThreeDots from '../assets/ThreeDots';
import ProjectSettingsMenu from './ProjectSettingsMenu';

type ProjectSettingsButtonProps = {
  showSettings: boolean;
  setShowSettings: Function;
}

export default function ProjectSettingsButton( { showSettings, setShowSettings }: ProjectSettingsButtonProps) {

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
      setShowSettings(!showSettings)
    }

    return (
      <>
        <button className="project-settings-button icon-button" onClick={(e) => handleClick(e)}>
            <ThreeDots />
        </button>
      </>
    )
}