// app/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectById, getAllProjectIds } from "../projectData";

type Props = {
  params: { id: string };
};

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectById(params.id);
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-green-300 hover:underline">
          ← Back to Projects
        </Link>

        <h1 className="text-4xl font-extrabold mt-4 mb-4">{project.title}</h1>

        {project.image && (
          <div className="mb-6">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={630}
              className="rounded-2xl shadow-[0_0_25px_rgba(0,255,0,0.4)]"
            />
          </div>
        )}

        <article className="prose prose-invert max-w-none text-green-200 whitespace-pre-line">
          {project.details}
        </article>
      </div>
    </div>
  );
}

// Static pre-render (önerilir):
export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}
