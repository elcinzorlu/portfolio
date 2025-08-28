// app/[locale]/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { getProjectMetaById, getAllProjectIds } from "../projectData";

export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  // Next.js 15: params async
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🔹 Aktif locale’i middleware’den al
  const locale = await getLocale();

  // 🔹 Çevirileri aktif locale’e göre yükle
  const t = await getTranslations();

  const meta = getProjectMetaById(id);
  if (!meta) return notFound();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${locale}`} className="text-green-300 hover:underline">
          {"<-"} {t("project.back")}
        </Link>

        <h1 className="text-4xl font-extrabold mt-4 mb-4">
          {t(`${meta.i18nKey}.title`)}
        </h1>

        {meta.image && (
          <div className="mb-6">
            <Image
              src={meta.image} // örn: "/enucuzu.png"
              alt={t(`${meta.i18nKey}.title`)}
              width={1200}
              height={630}
              className="rounded-2xl shadow-[0_0_25px_rgba(0,255,0,0.4)]"
            />
          </div>
        )}

        <article className="prose prose-invert max-w-none text-green-200 whitespace-pre-line mb-8">
          {t(`${meta.i18nKey}.details`)}
        </article>

        {/* ✅ Technologies Section */}
        {meta.technologies && meta.technologies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              {t("project.techTitle")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {meta.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-green-900/40 border border-green-500 rounded-xl 
                     text-green-300 text-sm shadow-[0_0_10px_rgba(0,255,0,0.3)]
                     hover:bg-green-600 hover:text-black transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
