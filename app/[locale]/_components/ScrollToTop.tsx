'use client';

import {ArrowUp} from 'lucide-react';
import {useEffect, useState} from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full 
                 bg-gradient-to-br from-[#f805e4] to-[#e8ff1a] 
                 shadow-[0_0_20px_rgba(193,255,26,0.5)] 
                 hover:scale-110 transition-transform"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6 text-black" />
    </button>
  );
}
