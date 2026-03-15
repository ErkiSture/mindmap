import { useEffect, useRef } from "react";
import type { Project } from "../types/project"

type CanvasProps = {
  project: Project;
}

export default function Canvas({ project }: CanvasProps ) {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize()
    window.addEventListener("resize", resize);


    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [])

  return (
    <>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </>
  )
}