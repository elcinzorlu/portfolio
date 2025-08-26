export type ProjectMeta = {
  id: string; // slug
  i18nKey: string; // messages içinde kök key
  image?: string;
};

export const projectMetas: ProjectMeta[] = [
  { id: 'enucuzu', i18nKey: 'project.enucuzu', image: '/enucuzu.png' },
  { id: 'chatapp',  i18nKey: 'project.chatapp',  image: '/enucuzu.png' }
];

export function getProjectMetaById(id: string) {
  return projectMetas.find(p => p.id === id);
}

export function getAllProjectIds() {
  return projectMetas.map(p => p.id);
}
