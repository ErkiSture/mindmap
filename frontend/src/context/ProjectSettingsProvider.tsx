import { ProjectSettingsContext } from "./ProjectSettingsContext";

export default function ProjectsSettingsProvider({ children }: { children: React.ReactNode }) {

  return (
    <ProjectSettingsContext.Provider value={null}>
      { children }
    </ProjectSettingsContext.Provider>
  )
}