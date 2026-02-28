export default function Projects() {

  const testData = {
    name: "Filip",
  }

  async function createProject() {
    try {
      const res = await fetch('/api/projects/create_project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Server returned invalid response' };
      }

      if (res.ok) {
        console.log(res.status, data.message);
      } else {
        console.error('Error creating project on server:', res.status, data.message);
        return;
      }

    } catch (err) {
      console.error('Network or fetch error during project creation:', err);
    }
  }

  return (
    <>
      <h1>Projects page</h1>
      <button onClick={() => createProject()}>Create project</button>
    </>
  )
}