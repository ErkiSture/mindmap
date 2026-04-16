import { use, useEffect, useRef, useState } from "react";
import type { Project } from "../types/project";
import Node from "../components/canvas/Node";
import "../styling/canvas.css";

const MIN_ZOOM = 0.10;
const MAX_ZOOM = 3;

const ZOOM_SENSITIVITY = 0.0007;
const PAN_SENSITIVITY = 1;

const CANVAS_WIDTH = 10000;
const CANVAS_HEIGHT = 8000;

const EDGE_THRESHOLD = 0;

type CanvasProps = {
  project: Project;
};

export default function Canvas({ project }: CanvasProps) {
  const [camera, setCamera] = useState({
    x: 1000,
    y: 1000,
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

  
  const [border, setBorder] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  // ZOOM 
  function handleZoom(e: React.WheelEvent) {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setCamera((c) => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, c.zoom - e.deltaY * ZOOM_SENSITIVITY));

      const worldX = mouseX / c.zoom + c.x;
      const worldY = mouseY / c.zoom + c.y;

      let newCameraX = worldX - mouseX / newZoom;
      let newCameraY = worldY - mouseY / newZoom;

      return {
        zoom: newZoom,
        x: newCameraX,
        y: newCameraY,
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
      x: c.x - dx / c.zoom * PAN_SENSITIVITY,
      y: c.y - dy / c.zoom * PAN_SENSITIVITY,
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
  
  useEffect(() => {
    let left = camera.x < EDGE_THRESHOLD ? (EDGE_THRESHOLD - camera.x) * camera.zoom : 0;
    let right = camera.x > CANVAS_WIDTH - EDGE_THRESHOLD - (window.innerWidth / camera.zoom) ? ((camera.x + window.innerWidth / camera.zoom) - (CANVAS_WIDTH - EDGE_THRESHOLD)) * camera.zoom : 0;
    let top = camera.y < EDGE_THRESHOLD ? (EDGE_THRESHOLD - camera.y) * camera.zoom : 0;
    let bottom = camera.y > CANVAS_HEIGHT - EDGE_THRESHOLD - (window.innerHeight / camera.zoom) ? ((camera.y + window.innerHeight / camera.zoom) - (CANVAS_HEIGHT - EDGE_THRESHOLD)) * camera.zoom : 0;

    setBorder({ top, left, right, bottom });

  }, [camera]);


  return (
    <>
    <div style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: border.left,
      height: "100%",
      background: "gray",
      zIndex: 2,
    }} />

    <div style={{
      position: "absolute",
      right: 0,
      top: 0,
      width: border.right,
      height: "100%",
      background: "gray",
      zIndex: 2,
    }} />

    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: border.top,
      width: "100%",
      background: "gray",
      zIndex: 2,
    }} />

    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      height: border.bottom,
      width: "100%",
      background: "gray",
      zIndex: 2,
    }} />

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
        <Node x={5000} y={5000} width={120} height={80} bgColor="red" camera={camera} />
        <Node x={2000} y={4000} width={120} height={80} bgColor="green" camera={camera} />
        <Node x={4000} y={1500} width={120} height={80} bgColor="blue" camera={camera} />
      </div>


      <div style={{ position: "absolute", bottom: 10, left: 10, zIndex: 1000 }}>
          <p style={{ color: "red" }}>Camera: {JSON.stringify(camera)}</p>
      </div>
    </>
  );
}