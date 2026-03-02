import { useEffect, useState } from "react";

export default function Projects() {

  const [projects, setProjects] = useState<[]>([])

  async function createProject() {
    try {
      const res = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({name: 'Unnamed'})
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
        console.error('Error creating project on server: ', res.status, data.message);
        return;
      }

    } catch (err) {
      console.error('Network or fetch error during project creation: ', err);
    }
  }

  // Load all projects of user so they can be displayed
  useEffect(() => {
    async function getProjects() {
    try {
      const res = await fetch('/api/projects/get', {
        method: 'GET',
        credentials: 'include',
      })
      
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Server returned an invalid response'}
      }

      if (res.ok) {
        console.log(res.status, data.message);
        setProjects(data.projects)
      } else {
        console.log('Error fetching projects on server: ', res.status, data.message);
      }

    } catch (err) {
        console.error('Network or fetch error while gettign projects: ', err)
      }
    }
    getProjects();
  }, [])


  return (
    <>
      <h1>Projects page</h1>
      <button onClick={() => createProject()}>Create project</button>  
    </>
  );
}