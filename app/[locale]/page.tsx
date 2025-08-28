"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projectMetas } from "./projects/projectData";
import LocaleSwitcher from "./_components/LocaleSwitcher";

// Matrix Rain Component (client)
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters =
      "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワン".split(
        ""
      );
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }, () => 1);
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-50"
    />
  );
}
export default function Home() {
  const t = useTranslations();
  // Client component’te locale’i almak için useParams:
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "tr";

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 border-b border-green-700 bg-black/70">
          <div className="text-2xl font-bold text-green-400">Portfolio</div>

          <ul className="flex gap-6 text-green-300">
            <li className="hover:text-green-500 cursor-pointer">
              <a href="/">{t("nav.home")}</a>

            </li>
            <li className="hover:text-green-500 cursor-pointer">
              {t("nav.about")}
            </li>
            <li className="hover:text-green-500 cursor-pointer">
              {t("nav.projects")}
            </li>
            <li className="hover:text-green-500 cursor-pointer">
              <a href="#contact">{t("nav.contact")}</a>
            </li>
          </ul>

          <div className="flex gap-2 items-center">
            {/* Dil değiştirici */}
            <LocaleSwitcher locale={locale as "tr" | "en"} />
            <button className="border border-green-400 text-green-400 px-3 py-1 rounded">
              {t("cta.login")}
            </button>
            <button className="bg-green-500 hover:bg-green-400 text-black px-3 py-1 rounded">
              {t("cta.signup")}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-12 items-center px-12 py-20">
          <div>
            <h1 className="text-5xl font-extrabold text-green-400 mb-4">
              {t("hero.title")}
            </h1>
            <h2 className="text-2xl text-blue-400 mb-4">
              {t("hero.subtitle")}
            </h2>
            <p className="text-green-200 leading-relaxed">
              {t("hero.description")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <Image
              src="/elcin.jpeg"
              alt="ELÇİN ZORLU"
              className="rounded-2xl shadow-[0_0_25px_rgba(0,255,0,0.7)]"
              width={400}
              height={400}
              priority
            />
          </motion.div>
        </section>

        {/* Projects */}
        <section className="px-8 py-12">
          <h1 className="text-3xl font-bold mb-6 text-green-400">
            {t("projects.title")}
          </h1>

          <ul className="grid md:grid-cols-3 gap-6">
            {projectMetas.map((p) => (
              <li key={p.id} className="p-4 border border-green-400 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  {t(`${p.i18nKey}.title`)}
                </h2>
                <p className="text-gray-300 mb-3">{t(`${p.i18nKey}.short`)}</p>
                <Link
                  href={`/${locale}/projects/${p.id}`}
                  className="text-green-400 hover:underline"
                >
                  {t("projects.viewDetails")}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl border border-emerald-900/60 bg-white/5 p-6 shadow-[0_0_20px_rgba(16,185,129,0.12)]">
              <h3 className="text-2xl font-bold text-emerald-300 mb-4">
                {t("nav.contact")}
              </h3>
              <ul className="space-y-2 text-emerald-100/90">
                <li>
                  📧{" "}
                  <a
                    href="mailto:elcinnzorlu@hotmail.com"
                    className="hover:text-white"
                  >
                    elcinnzorlu@hotmail.com
                  </a>
                </li>
                <li>
                  💼{" "}
                  <a
                    href="https://linkedin.com/in/elcinzorlu"
                    target="_blank"
                    className="hover:text-white"
                  >
                     LinkedIn
                  </a>
                </li>
                <li>
                  💻{" "}
                  <a
                    href="https://github.com/elcinzorlu"
                    target="_blank"
                    className="hover:text-white"
                  >
                     GitHub
                  </a>
                </li>
                <li>
                  ✍️{"  "}
                  <a
                    href="https://medium.com/@elcinnzorlu"
                    target="_blank"
                    className="hover:text-white"
                  >
                     Medium
                  </a>
                </li>
                <li>📍 Izmir, TR</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-900/60 bg-white/5 p-6">
              <h4 className="text-lg font-semibold text-emerald-300">
              {t('contact.availableForTitle')}
              </h4>
              <p className="mt-2 text-emerald-100/90">
              {t('contact.availableFor')}
              </p>
              <a
                href="mailto:elcinnzorlu@hotmail.com"
                className="inline-flex mt-4 rounded-xl px-4 py-2 bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition shadow-[0_0_18px_rgba(16,185,129,0.35)]"
              >
                {t('contact.sayHi')}
              </a>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="p-6 border-t border-green-700 text-center text-green-500 text-sm bg-black/70">
          <p>{t("footer.copy")}</p>
        </footer>
      </div>
    </div>
  );
}
