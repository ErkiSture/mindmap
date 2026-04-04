import ReturnButton from "./ReturnButton"
import TopHud from "./TopHud"

export default function CanvasOverlay() {
  return (
    <div className="canvas-overlay-item">
        <ReturnButton></ReturnButton>
        <TopHud></TopHud>
    </div>
  )
}