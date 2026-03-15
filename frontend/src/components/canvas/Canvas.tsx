import { useEffect, useRef, useState } from "react";
import type { Project } from "../../types/project"
import Node from "./Node";

type CanvasProps = {
  project: Project;
}

export default function Canvas({ project }: CanvasProps ) {

  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    zoom: 1
  })

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")
    if (!ctx) return
  }, [])

  function zoom(e: React.WheelEvent) {
    e.preventDefault()

    setCamera(c => ({
      ...c,
      zoom: Math.max(0.2, Math.min(3, c.zoom - e.deltaY * 0.001))
    }))
  }


  return (
    <>
      <div 
      onWheel={zoom}
      style={{
        // transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`,
        // transformOrigin: "0 0",
        width: "100vw",
        height: "100vh",
        background: "black",
      }}> 
        <canvas ref={canvasRef} width={500} height={500} style={{ position: "absolute" }}></canvas>
        <Node x={100} y={100} width={100} height={100} bgColor={"red"} camera={camera}></Node>
        <Node x={500} y={200} width={100} height={200} bgColor={"green"} camera={camera}></Node>
        <Node x={300} y={600} width={200} height={100} bgColor={"blue"} camera={camera}></Node>
      </div>
    </>
  )
}