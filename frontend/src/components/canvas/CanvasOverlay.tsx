import ReturnButton from "./ReturnButton"
import TopHud from "./TopHud"

export default function CanvasOverlay() {
  return (
    <div className="canvas-overlay-wrapper canvas-overlay-item">
        <ReturnButton></ReturnButton>
        <TopHud></TopHud>
    </div>
  )
}