export default function Projects() {

  const testData = {
    name: "Filip",
  }

  async function createProject() {
    const res = await fetch('/api/projects/create_project', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(testData)
    });
    const data = await res.json();
    console.log(res, data)
  }

  return (
    <>
      <h1>PROJECTS PAGE</h1>
      <button onClick={() => createProject()}>Create project</button>
    </>
  )
}