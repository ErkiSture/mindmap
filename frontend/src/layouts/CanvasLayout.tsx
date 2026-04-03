import Project from "../pages/Project"
import CanvasOverlay from "../components/canvas/CanvasOverlay"
import '../styling/canvas.css'


export default function CanvasLayout() {
  return (
    <div className="canvas-wrapper">
      <Project></Project>
      <CanvasOverlay></CanvasOverlay>
    </div>
  )
}