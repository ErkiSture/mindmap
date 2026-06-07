import { createContext } from "react"
import type { Project } from "../types/project";

type ProjectsContext = {
    toggleSettings: Function;
    renameProject: Function;
    deleteProject: Function;
    createProject: Function;
    showSettings: boolean;
    showSettingsCardId: number | null;
    projects: Project[];
    loadingProjects: boolean;
    loadingProjectsError: string | null;
    createProjectLoading: boolean;
    createProjectError: string | null;
}

export const ProjectsContext = createContext<ProjectsContext | null>(null);

