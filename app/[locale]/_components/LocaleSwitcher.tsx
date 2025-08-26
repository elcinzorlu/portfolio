'use client';

import {usePathname} from 'next/navigation';
import Link from 'next/link';

export default function LocaleSwitcher({locale}:{locale:'tr'|'en'}) {
  const pathname = usePathname(); // örn: /tr/projects/enucuzu
  const other = locale === 'tr' ? 'en' : 'tr';
  // mevcut path’taki ilk segmenti değiştir
  const segments = pathname.split('/');
  segments[1] = other;
  const target = segments.join('/') || `/${other}`;

  return (
    <Link href={target} className="text-green-300 hover:underline">
      {other.toUpperCase()}
    </Link>
  );
}
