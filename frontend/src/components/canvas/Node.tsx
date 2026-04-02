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

    // dragging just became true
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleStopDrag)

    // Remove listeners before dragging becomes false 
    return () => {
      window.removeEventListener("mousemove", handleDrag)
      window.removeEventListener("mouseup", handleStopDrag)
    }
  }, [dragging, camera])

  function handleDrag(e: MouseEvent) {

    const newX = e.clientX / camera.zoom + camera.x - offset.x
    const newY = e.clientY / camera.zoom + camera.y - offset.y

    setPos({ x: newX, y: newY })
  }

function handleStartDrag(e: React.MouseEvent): void {
  const mouseX = e.clientX
  const mouseY = e.clientY

  setOffset({
    x: mouseX / camera.zoom + camera.x - pos.x,
    y: mouseY / camera.zoom + camera.y - pos.y
  })

  setDragging(true)
}
    
  function handleStopDrag(): void {
    setDragging(false)
  }
  
  return (
    <div onMouseDown={handleStartDrag}
      style={{
        position: "absolute",
        left: (pos.x - camera.x) * camera.zoom,
        top: (pos.y - camera.y) * camera.zoom,
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