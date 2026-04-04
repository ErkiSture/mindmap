import '../styling/iconButton.css'
import ThreeDots from '../assets/ThreeDots';

export default function ProjectSettingsButton() {

    return (
    <button className="project-settings-button icon-button" onClick={(e) => {
        e.stopPropagation();
    }}>
        <ThreeDots />
    </button>
    )
}