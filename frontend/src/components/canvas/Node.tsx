type NodeProps = {
  x: number
  y: number
  width: number
  height: number
  bgColor: string
  camera: any
}

export default function Node({ x, y, width, height, bgColor, camera }: NodeProps) {
  return (
    <div 
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: width,
      height: height,
      backgroundColor: bgColor,
      transform:`scale(${camera.zoom})`,        
      transformOrigin:"top left"
    }}>Node</div>
  )
}