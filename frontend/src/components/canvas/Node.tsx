import { useEffect, useState } from "react"

type NodeProps = {
  x: number
  y: number
  width: number
  height: number
  bgColor: string
  camera: {
    x: number
    y: number
    zoom: number
  }
}

export default function Node({
  x,
  y,
  width,
  height,
  bgColor,
  camera
}: NodeProps) {

  const [dragging, setDragging] = useState<boolean>(false)
  const [pos, setPos] = useState<{x: number, y: number}>({ x: x, y: y})
  const [offset, setOffset] = useState<{x: number, y: number}>({ x: 0, y: 0})

  useEffect(() => {
    if (!dragging) return
    window.addEventListener("mousemove", handleDrag);
    return () => {
      window.removeEventListener("mousemove", handleDrag)
    }
  }, [dragging])

  function handleDrag(e: MouseEvent) {
    setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }
  
  function handleStartDrag(e: React.MouseEvent): void {
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y })
    setDragging(true)
  }
    
  function handleStopDrag(): void {
    setDragging(false)
  }
  
  return (
    <div onMouseDown={handleStartDrag} onMouseUp={handleStopDrag}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width,
        height,
        backgroundColor: bgColor,
        transform: `scale(${camera.zoom})`,
        transformOrigin: "top left",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}
    >
      Node
    </div>
  )
}