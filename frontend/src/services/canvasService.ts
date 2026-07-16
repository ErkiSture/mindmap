export function getNodes(projectId: number) {
  return fetch(`/api/projects${projectId}/nodes`)
}