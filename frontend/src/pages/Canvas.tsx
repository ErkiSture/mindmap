import { useEffect, useRef, useState } from "react";
import type { Project } from "../types/project";
import Node from "../components/canvas/Node";
import "../styling/canvas.css";

type CanvasProps = {
  project: Project;
};

export default function Canvas({ project }: CanvasProps) {
  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Prevent browser zoom (important for pinch)
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, []);

  
  // ZOOM 
  function handleZoom(e: React.WheelEvent) {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setCamera((c) => {
      const newZoom = Math.max(0.2, Math.min(3, c.zoom - e.deltaY * 0.001));

      const worldX = mouseX / c.zoom + c.x;
      const worldY = mouseY / c.zoom + c.y;

      return {
        zoom: newZoom,
        x: worldX - mouseX / newZoom,
        y: worldY - mouseY / newZoom,
      };
    });
  }


  //PAN MOUSE
  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!dragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setCamera((c) => ({
      ...c,
      x: c.x - dx / c.zoom,
      y: c.y - dy / c.zoom,
    }));

    last.current = { x: e.clientX, y: e.clientY };
  }

  function onMouseUp() {
    dragging.current = false;
  }


  // WHEEL HANDLER
  function onWheel(e: React.WheelEvent) {
    // e.preventDefault();

    if (e.ctrlKey || e.metaKey) {
      // Zoom on mouse wheel or trackpad pinch
      handleZoom(e);
    } else {
      // PAN TRACKPAD
      setCamera((c) => ({
        ...c,
        x: c.x + e.deltaX / c.zoom,
        y: c.y + e.deltaY / c.zoom,
      }));
    }
  }

  return (
    <div
      ref={canvasRef}
      className="canvas"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        cursor: dragging.current ? "grabbing" : "grab",
      }}
    >
      <Node x={100} y={100} width={120} height={80} bgColor="red" camera={camera} />
      <Node x={500} y={200} width={120} height={80} bgColor="green" camera={camera} />
      <Node x={300} y={500} width={120} height={80} bgColor="blue" camera={camera} />
    </div>
  );
}