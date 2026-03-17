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

  const screenX = (x - camera.x) * camera.zoom
  const screenY = (y - camera.y) * camera.zoom

  return (
    <div
      style={{
        position: "absolute",
        left: screenX,
        top: screenY,
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