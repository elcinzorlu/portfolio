"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import Image from "next/image";

import Link from "next/link";
import { projects } from "./projects/projectData";

// Matrix Rain Component
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

// Portfolio Page
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 border-b border-green-700 bg-black/70">
          <div className="text-2xl font-bold text-green-400">Portfolio</div>
          <ul className="flex gap-6 text-green-300">
            <li className="hover:text-green-500 cursor-pointer">Home</li>
            <li className="hover:text-green-500 cursor-pointer">About</li>
            <li className="hover:text-green-500 cursor-pointer">Projects</li>
            <li className="hover:text-green-500 cursor-pointer">Contact</li>
          </ul>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-600 hover:text-black"
            >
              Login
            </Button>
            <Button className="bg-green-500 hover:bg-green-400 text-black">
              Sign Up
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center px-12 py-20">
          <div>
            <h1 className="text-5xl font-extrabold text-green-400 mb-4">
              ELCIN ZORLU{" "}
            </h1>
            <h2 className="text-2xl text-blue-400 mb-4">
              Backend Software Engineer
            </h2>
            <p className="text-green-200 leading-relaxed">
              Throughout my educational journey, I have developed myself in the
              areas of research, self- motivation, entrepreneurship, and
              acquiring different skills. I have integrated my knowledge of
              Industrial Engineering with software and continue to enhance my
              skills in this field. I am highly dedicated and enthusiastic about
              being efficient in the professional work environment.
              Additionally, I believe that willingness, attentiveness, and
              careful work always lead to successful outcomes. Therefore, I have
              no doubt that I can contribute to your organization with my
              abilities and work discipline.
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
              className="rounded-2xl shadow-[0_0_25px_rgba(0,255,0,0.7)] "
              width={400}
              height={400}
            />
          </motion.div>
        </section>

        {/* Projects */}
        <section className="px-8 py-12">
          <h1 className="text-3xl font-bold mb-6 text-green-400">
            My Projects
          </h1>

          <ul className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 border border-green-400 rounded-lg"
              >
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-300 mb-3">{project.description}</p>
                <Link
                  href={`/projects/${project.id}`}
                  className="text-green-400 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="p-6 border-t border-green-700 text-center text-green-500 text-sm bg-black/70">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://linkedin.com/in/elcinzorlu"
              className="hover:text-green-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/elcinzorlu"
              className="hover:text-green-300"
            >
              GitHub
            </a>
            <a
              href="https://medium.com/@elcinnzorlu"
              className="hover:text-green-300"
            >
              Medium
            </a>
          </div>
          <p>
            © 2025 Backend Engineer | Inspired by the Matrix | Retro Vibes ✨
          </p>
        </footer>
      </div>
    </div>
  );
}
