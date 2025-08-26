// app/projects/projectData.ts
export type Project = {
  id: string;               // slug (route için)
  title: string;
  description: string;      // listede kısa açıklama
  details: string;          // detay sayfasında uzun açıklama (markdown/plain)
  image?: string;           // opsiyonel görsel
};

export const projects: Project[] = [
  {
    id: "enucuzu",
    title: "Enucuzu.com",
    description: "Flight & Hotel Booking Platform",
    details: `
Enucuzu.com; uçak, otel ve araç kiralama rezervasyonlarının yapılabildiği bir seyahat platformudur.
Backend: Go (mikro servis mimarisi), Docker, PostgreSQL, Redis (cache/session).
    `,
    image: "/projects/enucuzu.jpg",
  },
  {
    id: "chatapp",
    title: "ChatApp",
    description: "Real-time messaging with WebSockets",
    details: `
Node.js ve WebSocket ile gerçek zamanlı mesajlaşma.
Redis pub/sub ile yatay ölçekleme, Kubernetes üzerinde deployment ve autoscaling.
    `,
    image: "/projects/chatapp.jpg",
  },
];

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export function getAllProjectIds() {
  return projects.map((p) => p.id);
}