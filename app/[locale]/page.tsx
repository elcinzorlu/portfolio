"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projectMetas } from "./projects/projectData";
import LocaleSwitcher from "./_components/LocaleSwitcher";

// ---- About Section (Timeline + Cards) ----
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import ScrollToTop from "./_components/ScrollToTop";

type Experience = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  highlights?: string[];
};

type Education = {
  school: string;
  degree: string;
  location?: string;
  start: string;
  end: string;
  gpa?: string;
};

function AboutSection() {
  const t = useTranslations();

  const experiences: Experience[] = [
    {
      role: "Backend Software Engineer",
      company: "Enucuzu.com/Yuex Yazılım Teknoloji A. Ş.",
      location: "Izmir, TR",
      start: "2022",
      end: t("about.present", { default: "Present" }),
      highlights: [
        "Go microservices, PostgreSQL, Redis",
        "Kubernetes + Docker, CI/CD, Grafana",
        "High-traffic booking flows, caching & resilience",
      ],
    },
    {
      role: "Software Engineer ",
      company: "Mepsan Petrol Cihazları A.Ş.",
      location: "Izmir, TR",
      start: "2021",
      end: "2022",
      highlights: [
        "Python, Flask API, Java Android, POS",
        "MongoDB, CI/CD",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Mepsan Petrol Cihazları A.Ş.",
      location: "Izmir, TR",
      start: "2021",
      end: "2021",
      highlights: [
        "Python, Flask API, Java Android, POS",
        "MongoDB, CI/CD",
      ],
    },
    {
      role: "Industrial Engineer Intern",
      company: "Ugur Promilling",
      location: "Çorum, TR",
      start: "2019",
      end: "2019",
      highlights: [
        "Project management, Quality, Manufacure",
      ],
    },
  ];

  const education: Education[] = [
    {
      school: "Alanya Alaaddin Keykubat Üniversitesi",
      degree: "B.Sc. Industrial Engineering",
      location: "Antalya, TR",
      start: "2017",
      end: "2021",
    },
  ];

  const skills = [
    "Agile Development Day - Coderspace 2024",
    "Girişimcilik eğitimi-KOSGEB",
    "Java Kodlama Eğitimi-Ecodation",
    "Yazılım Uzmanlığı(C# ve MsSql)-Platon Bilişim",
  ];

  return (
    <section id="about" className="max-w-6xl px-13 py-20 text-left">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-3xl md:text-4xl font-bold bg-clip-text bg-gradient-to-r text-blue-400 to-cyan-400 mb-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]"
      >
        {t("about.title", { default: "About Me" })}
      </motion.h2>

  

      <div className="grid lg:grid-cols-3 gap-8 ">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-400 " />
            {t("about.experience", { default: "Experience" })}
          </h3>

          <ol className="relative border-s border-emerald-800/60 ">
            {experiences.map((exp, idx) => (
              <li key={idx} className="ms-6 mb-8 border-blue-400 ">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/30 border border-blue-400">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-400 " />
                </span>
                <div className="rounded-xl border border-blue-400 from-black/40 to-emerald-900/20 p-4 hover:border-cyan-500/40 transition">
                  <div className="flex flex-wrap items-center gap-2 text-emerald-200">
                    <span className="text-white font-semibold">{exp.role}</span>
                    <span className="text-[#f0b40b]">· {exp.company}</span>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-emerald-300/80">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-cyan-300" />
                      {exp.start} — {exp.end}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-cyan-300" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {exp.highlights && (
                    <ul className="mt-3 list-disc ms-5 text-emerald-100/90">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-400 " />
            {t("about.education", { default: "Education" })}
          </h3>

          {education.map((ed, idx) => (
            <div
              key={idx}
              className="mb-6 rounded-xl border border-blue-400 from-black/40 to-cyan-900/10 p-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <div className="text-white font-semibold">{ed.school}</div>
              <div className="text-[#f0b40b]">{ed.degree}</div>
              <div className="mt-1 flex flex-wrap gap-3 text-sm text-emerald-300/80">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-cyan-300" />
                  {ed.start} — {ed.end}
                </span>
                {ed.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    {ed.location}
                  </span>
                )}      
              </div>
            </div>
          ))}

          <h4 className="text-lg font-semibold text-blue-400 ">
            {t("about.skills", { default: "Skills" })}
          </h4>
          <div className="flex flex-wrap gap-2 py-5">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-blue-400 from-emerald-500/10 to-cyan-500/10 px-3 py-1 text-sm text-emerald-100 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] transition"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "tr";

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />

      <div className="relative z-10">
        <nav className="flex justify-between items-center p-6 border-b border-green-700 bg-black/70">
          <div className="text-2xl font-bold text-green-400">Portfolio</div>

          <ul className="flex gap-6 text-green-300">
            <li className="hover:text-green-500 cursor-pointer">
              <Link href={`/${locale}`}>{t("nav.home")}</Link>
            </li>
            <li className="hover:text-green-500 cursor-pointer">
              <a href="#about">{t("nav.about")}</a>
            </li>
            <li className="hover:text-green-500 cursor-pointer">
              <a href="#projects">{t("nav.projects")}</a>
            </li>
            <li className="hover:text-green-500 cursor-pointer">
              <a href="#contact">{t("nav.contact")}</a>
            </li>
          </ul>

          <div className="flex gap-2 items-center">
            <button className="border border-green-400 text-green-400 px-3 py-1 rounded">
              <LocaleSwitcher locale={locale as "tr" | "en"} />
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-12 items-center px-12 py-10">
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
              width={300}
              height={300}
              priority
            />
          </motion.div>
        </section>

        <AboutSection />

        <section id="projects" className="px-13 py-12">
          <h1 className="text-4xl font-bold mb-6 text-green-400">
            {t("projects.title")}
          </h1>

          <ul className="grid md:grid-cols-3 gap-6 py-8">
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
                {t("contact.availableForTitle")}
              </h4>
              <p className="mt-2 text-emerald-100/90">
                {t("contact.availableFor")}
              </p>
              <a
                href="mailto:elcinnzorlu@hotmail.com"
                className="inline-flex mt-4 rounded-xl px-4 py-2 bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition shadow-[0_0_18px_rgba(16,185,129,0.35)]"
              >
                {t("contact.sayHi")}
              </a>
            </div>
          </div>
        </section>

        <ScrollToTop />

        <footer className="p-6 border-t border-green-700 text-center text-green-500 text-sm bg-black/70">
          <p>{t("footer.copy")}</p>
        </footer>
      </div>
    </div>
  );
}
