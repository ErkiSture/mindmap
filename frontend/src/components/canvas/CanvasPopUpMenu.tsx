import { useEffect } from "react"
import useMutation from "../../hooks/useMutation"

type Props = {
  projectId: number
  pos: { x: number, y: number}
}

export default function CanvasPopUpMenu({ pos, projectId }: Props) {
  const { mutate, data, loading, error } = useMutation(async () => {
    return await fetch(`/api/projects/${projectId}/nodes`, {credentials: "include"})
  })
  
  useEffect(() => {
    console.log(data, loading, error);
  }, [data])

  function createNode() {
    console.log("Creating node at", pos)
    mutate();
  }

  return (
    <div className="canvas-popup-menu" style={{ top: pos.y, left: pos.x }}>
      <button onClick={createNode}>Create node</button>
    </div>
  )
}


