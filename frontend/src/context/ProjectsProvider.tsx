import { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";
import { ProjectsContext } from "./projectsContext"
import type { Project } from "../types/project";
import useFetch from "../hooks/useFetch";

type Props = {
    children: React.ReactNode;
}

export default function ProjectsProvider({ children }: Props) {
    const { data, loading, error } = useFetch<{ projects: Project[] }>(
        "api/projects/get", 
        { credentials: "include" }
    )
    
    const [projects, setProjects] = useState<Project[]>([])
    useEffect(() => {if (data?.projects) setProjects(data.projects)}, [data])

    const [ showSettingsCardId, setShowSettingsCardId ] = useState<number | null>(null);
    const [ showSettings, setShowSettings ] = useState<boolean>(false);

    function toggleSettings(projectId: number) {
        if (showSettingsCardId === projectId) {
        setShowSettingsCardId(null);
        setShowSettings(false);
        } else {
        setShowSettingsCardId(projectId);
        setShowSettings(true);
        }
    }

    // RENAME PROJECT
    async function renameProject(projectId: number, newName: String): Promise<{ success: boolean, error: string | null }> {
        // Can't use useFetch since hooks can only be used top level

        // Rename project backend 
        const { ok, data } = await apiFetch("api/projects/rename", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            projectId: projectId,
            newName: newName
        }),
        credentials: "include"
        });

        // Handle response
        let error;
        if (ok) {
            // Update project in state
            setProjects(projects.map(project => project.id === projectId ? data : project));
        } else {;
            error = (data.message || "Failed to rename project");
        }

        console.log("test", {ok, data, error})
        return { success: ok, error: error || null};
    }


    // CREATE PROJECT
    const [createProjectLoading, setCreateProjectLoading] = useState<boolean>(false);
    const [createProjectError, setCreateProjectError] = useState<string | null>(null);

    async function createProject() {
        if (createProjectLoading) return;
        setCreateProjectLoading(true);
        setCreateProjectError(null);

        const { ok, data } = await apiFetch('/api/projects/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({name: 'Unnamed'})
        });

        if (ok) {
        setProjects([...projects, data.project]);
        console.log(data.message)
        } else {
        setCreateProjectError(data.message || "Failed to create project");
        console.error(data.message);
        }
        setCreateProjectLoading(false);
    }


    // DELETE PROJECT
    async function deleteProject(id: number): Promise<{ success: boolean, error: string | null }> {
        const { ok, data } = await apiFetch('/api/projects/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ projectId: id })
        });

        let error: string | null = null;
        if (ok) {
        setProjects(projects.filter(project => project.id !== id));
        } else {
        error = data?.message || 'Failed to delete project';
        console.error(error);
        }

        return { success: ok, error };
    }

    return (
        <ProjectsContext.Provider value = {{ 
            toggleSettings, 
            renameProject, 
            deleteProject, 
            createProject, 
            showSettings, 
            showSettingsCardId, 
            projects, 
            loading, 
            error,
            createProjectLoading,
            createProjectError

        }}>
            {children}
        </ProjectsContext.Provider>
    )
}