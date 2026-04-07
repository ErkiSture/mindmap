import { useEffect, useRef, useState } from "react";
import type { Project } from "../types/project"
import Node from "../components/canvas/Node";
import '../styling/canvas.css'

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

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const ctx = canvas.getContext("2d")
  //   if (!ctx) return
  // }, [])

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handler, { passive: false });

    return () => window.removeEventListener("wheel", handler);
  }, []);

  function zoom(e: React.WheelEvent) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setCamera(c => {
      const newZoom = Math.max(0.2, Math.min(3, c.zoom - e.deltaY * 0.004));

      const worldX = mouseX / c.zoom + c.x;
      const worldY = mouseY / c.zoom + c.y;

      return {
        zoom: newZoom,
        x: worldX - mouseX / newZoom,
        y: worldY - mouseY / newZoom
      }
    })
  }

  function pan(e: React.MouseEvent) {
    console.log("pan")
  }

  return (
    <div
      ref={canvasRef}
      className="canvas"
      onMouseDown={pan}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <Node x={100} y={100} width={120} height={80} bgColor="red" camera={camera}/>
      <Node x={500} y={200} width={120} height={80} bgColor="green" camera={camera}/>
      <Node x={300} y={500} width={120} height={80} bgColor="blue" camera={camera}/>

    </div>
  )
}