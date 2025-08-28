export type ProjectMeta = {
  id: string; // slug
  i18nKey: string; // messages içinde kök key
  image?: string;
  technologies?: string[];
};

export const projectMetas: ProjectMeta[] = [
  {
    id: "enucuzu",
    i18nKey: "project.enucuzu",
    image: "/enucuzu.png",
    technologies: ["Go", "PostgreSQL", "Redis", "Docker", "Microservices","ElasticSeach","Nats","Grafana"],
  },
  {
    id: "yuex",
    i18nKey: "project.yuex",
    image: "/yuex.png",
    technologies: ["Go","Blockchain", "PostgreSQL", "Redis", "Docker", "Microservices","Nats","Grafana"],
  },
  {
    id: "mepsan",
    i18nKey: "project.mepsan",
    image: "/mepsan.png",
    technologies: ["Python","Flask", "Java", "Android", "MongoDB", "MVVM"],
  },
];

export function getProjectMetaById(id: string) {
  return projectMetas.find((p) => p.id === id);
}

export function getAllProjectIds() {
  return projectMetas.map((p) => p.id);
}
