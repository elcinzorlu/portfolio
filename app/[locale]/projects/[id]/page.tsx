import {notFound} from 'next/navigation';
import Image from 'next/image';
import {getProjectMetaById, getAllProjectIds} from '../projectData';
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

export function generateStaticParams() {
  return getAllProjectIds().map(id => ({id}));
}

export default async function ProjectDetailPage({params}:{params:Promise<{id: string; locale: 'tr' | 'en'}>;}) {
  const {id, locale} = await params;               // ✅ await et
  const t = await getTranslations({locale}); 
  const meta = getProjectMetaById(id);
  if (!meta) return notFound();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-green-300 hover:underline">
           {t(`project.back`)}
        </Link>
        <h1 className="text-4xl font-extrabold mt-4 mb-4">{t(`${meta.i18nKey}.title`)}</h1>
        {meta.image && (
          <div className="mb-6">
            <Image src={meta.image} alt={t(`${meta.i18nKey}.title`)} width={1200} height={630} className="rounded-2xl shadow-[0_0_25px_rgba(0,255,0,0.4)]"/>
          </div>
        )}
        <article className="prose prose-invert max-w-none text-green-200 whitespace-pre-line">
          {t(`${meta.i18nKey}.details`)}
        </article>
      </div>
    </div>
  );
}
