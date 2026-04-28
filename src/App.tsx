/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  Terminal,
  ArrowUpRight,
  Mail,
  Linkedin,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return [dark, setDark] as const;
}

function useActiveSection(sections: string[]) {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [sections]);

  return active;
}

export default function App() {
  const [dark, setDark] = useDarkMode();
  const sections = ["about", "builds", "experience", "connect"];
  const activeSection = useActiveSection(sections);

  return (
    <div className="bg-background text-primary selection:bg-surface-container grid-paper min-h-screen font-sans">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-primary/10">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1200px] mx-auto">
          <span className="font-newsreader font-bold text-xl tracking-tighter text-primary">
            Dan
          </span>
          <nav className="hidden md:flex items-center gap-8 font-newsreader text-base tracking-tight">
            {["About", "Builds", "Experience", "Connect"].map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative transition-colors duration-300 ${isActive ? "font-bold text-primary after:absolute after:left-0 after:-bottom-[17px] after:w-full after:h-[2px] after:bg-primary" : "text-primary/60 hover:text-primary"}`}
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-10 max-w-[720px] mx-auto relative">
        {/* Hero Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-24 relative"
          id="about"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-newsreader text-[48px] leading-[1.1] font-semibold tracking-[-0.02em] text-primary mb-6"
          >
            CS Student and Backend Developer{" "}
            <span className="italic" style={{ color: "var(--color-tertiary)" }}>
              interested in low-level systems
            </span>{" "}
            and system design.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-on-surface-variant max-w-xl mb-10 leading-[1.6]"
          >
            I like things like low level systems, system design, devops, a bit
            of cybersecurity here and there, and that's about it. (for now at
            least :))
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            <a
              href="https://github.com/Dan1718"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-background font-bold text-[12px] tracking-[0.1em] uppercase transition-transform active:scale-95 shadow-[0px_4px_12px_rgba(45,41,38,0.05)]"
            >
              <Terminal className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-vincent-74b51729b/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-primary font-bold text-[12px] tracking-[0.1em] uppercase hover:bg-surface-container transition-all"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-primary font-bold text-[12px] tracking-[0.1em] uppercase hover:bg-surface-container transition-all"
            >
              Resume
            </a>
            <a
              href="mailto:danielvincent1718@gmail.com"
              className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-primary font-bold text-[12px] tracking-[0.1em] uppercase hover:bg-surface-container transition-all"
            >
              Email
            </a>
          </motion.div>
        </motion.section>

        <div className="ink-rule mb-24 opacity-50"></div>

        {/* Philosophy Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-24 relative"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="w-2 h-2"
              style={{ background: "var(--color-tertiary)" }}
            ></span>
            <h2 className="font-bold text-[12px] tracking-[0.1em] text-on-surface-variant uppercase">
              Why I do what I do, and what I do as well.
            </h2>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-surface-card p-8 border border-outline-variant shadow-[0px_4px_12px_rgba(45,41,38,0.05)] relative overflow-hidden"
          >

            <p className="text-body-md text-primary mb-6 leading-[1.6]">
              I code because I like to. Building things and solving problems
              makes me happy. Compilers, operating systems, databases,
              distributed systems, understanding how they work, the design
              decisions made, and why they make the tradeoffs they do is the
              kind of thing I find genuinely interesting, and where I want to
              make meaningful contributions eventually. I'm also going deep into
              the DevOps side, deployment pipelines, Infrastructure, the
              tradeoffs made there, and how software goes from code to a running
              system.
            </p>
            <p className="text-body-md text-primary leading-[1.6]">
              On the side I do CTFs and a bit of security research here and
              there, including forensics and reverse engineering. It's a
              different mode of thinking than developing, but I'd say it makes
              me a better engineer, because an instinct to break stuff is formed
              which helps me build better (harder to break) systems.
            </p>{" "}
          </motion.div>
        </motion.section>

        {/* Builds Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-24 relative"
          id="builds"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="w-2 h-2"
              style={{ background: "var(--color-tertiary)" }}
            ></span>
            <h2 className="font-bold text-[12px] tracking-[0.1em] text-on-surface-variant uppercase">
              SELECTED BUILDS
            </h2>
          </motion.div>

          <div className="space-y-16">
            <BuildItem
              id="01"
              status="IN PROGRESS"
              title="ClipCascaded"
              description="Fork and rework of ClipCascade, an open-source cross-platform clipboard sync tool. Reshaping the Linux client into a CLI-first, headless-friendly workflow — removing GUI assumptions and making it run cleanly without an attached TTY."
              tags={["Python", "Java", "Linux"]}
              url="https://github.com/Dan1718/ClipCascaded"
            />
            <BuildItem
              id="02"
              status="COMING SOON"
              title="???"
              description="Something is being built. Check back later."
              tags={[]}
            />
          </div>
        </motion.section>

        {/* Focus Areas */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="w-2 h-2"
              style={{ background: "var(--color-tertiary)" }}
            ></span>
            <h2 className="font-bold text-[12px] tracking-[0.1em] text-on-surface-variant uppercase">
              FOCUS AREAS
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant border border-outline-variant"
          >
            <FocusBox
              title="Backend Systems"
              description="Building APIs, services, and data pipelines that are reliable, observable, and don't fall over. FastAPI, PostgreSQL, Redis."
            />
            <FocusBox
              title="Systems & Internals"
              description="Understanding how things work underneath - OS fundamentals, memory, compilers, runtime behaviour, and low-level programming in C and Rust."
            />
            <FocusBox
              title="DevOps & Infrastructure"
              description="Containers, deployment pipelines, Linux, and the machinery that gets software from source to a running system."
            />
            <FocusBox
              title="Security & CTFs"
              description="Forensics, reversing, web exploitation, and cryptography. Competing in CTFs and figuring out how systems break (and how to break them :))."
            />
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-24 relative"
          id="experience"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="w-2 h-2"
              style={{ background: "var(--color-tertiary)" }}
            ></span>
            <h2 className="font-bold text-[12px] tracking-[0.1em] text-on-surface-variant uppercase">
              WORK EXPERIENCE
            </h2>
          </motion.div>

          <div className="space-y-12">
            <ExperienceItem
              period="Apr 2025 — Dec 2025"
              title="Backend Developer"
              company="Streetsmart"
              role="Volunteer · Remote"
              highlights={[
                "Designed and maintained scalable RESTful APIs using FastAPI for real-time data access and internal analytics tools.",
                "Built end-to-end image processing pipelines integrating computer vision models to extract structured insights from urban imagery.",
                "Implemented geospatial logic to analyze and interpret urban environments, enabling location-based insights and spatial pattern detection.",
                "Optimized backend performance and data workflows to improve system reliability and response times.",
              ]}
              active
            />
            <ExperienceItem
              period="Aug 2024 — Mar 2025"
              title="Development Lead · Backend Engineer"
              company="Whiplano"
              role="Remote"
              highlights={[
                "Led a cross-functional team across backend, frontend, and product design to deliver a complete solution within hackathon constraints.",
                "Architected and built the backend using FastAPI and MySQL, designing database schemas, API endpoints, and system structure from scratch.",
                "Developed and deployed a Solana smart contract to support blockchain functionality required for the project.",
                "Spearheaded product development decisions, aligning technical implementation with user experience and competition criteria.",
              ]}
            />
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 p-12 bg-surface-container border border-dashed border-outline-variant text-center relative overflow-hidden"
          id="connect"
        >
          <div className="absolute inset-0 grid-paper opacity-30 pointer-events-none"></div>
          <h2 className="font-newsreader text-4xl mb-4 relative z-10 leading-tight tracking-tight">
            Let's do something cool together.
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8 max-w-md mx-auto relative z-10">
            I'm open to backend engineering roles, internships, open-source
            collaboration, and interesting technical projects.
          </p>
          <div className="flex justify-center gap-8 relative z-10">
            <a
              href="mailto:danielvincent1718@gmail.com"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary text-background rounded-full transition-all group-hover:scale-110 group-hover:shadow-lg">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-bold text-[10px] tracking-widest uppercase text-primary">
                EMAIL
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-vincent-74b51729b/"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full transition-all group-hover:scale-110 group-hover:bg-surface-card group-hover:shadow-md">
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="font-bold text-[10px] tracking-widest uppercase text-primary">
                LINKEDIN
              </span>
            </a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-primary/10 py-12">
        <div className="max-w-[720px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-primary/60 font-newsreader italic text-sm">
          <p>© 2025 Dan. Created with AI and time (Im not a web developer).</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/Dan1718"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-vincent-74b51729b/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="mailto:danielvincent1718@gmail.com"
              className="hover:text-primary transition-colors hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BuildItem({
  id,
  status,
  title,
  description,
  tags,
  url,
}: {
  id: string;
  status: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
}) {
  return (
    <motion.div variants={fadeInUp} className="group relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span
            className="font-mono text-[12px] tracking-[0.1em] block mb-1 font-bold"
            style={{ color: "var(--color-tertiary)" }}
          >
            {id}. {status}
          </span>
          <h3 className="font-newsreader text-[32px] leading-none font-medium text-primary transition-colors">
            {title}
          </h3>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${title} on GitHub`}
          >
            <ArrowUpRight className="w-5 h-5 text-outline-variant group-hover:text-primary transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>
      <p className="text-body-md text-on-surface-variant mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-4 text-[13px] text-on-surface-variant/70">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/60"></span>{" "}
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8 ink-rule opacity-30"></div>
    </motion.div>
  );
}

function FocusBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-8 hover:bg-surface-card transition-colors">
      <h4 className="font-newsreader text-2xl mb-2 font-medium">{title}</h4>
      <p className="text-sm text-on-surface-variant opacity-80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ExperienceItem({
  period,
  title,
  company,
  role,
  highlights,
  active,
}: {
  period: string;
  title: string;
  company: string;
  role: string;
  highlights: string[];
  active?: boolean;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative pl-8 border-l-2 border-outline-variant/20 group"
    >
      <div
        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 transition-colors duration-500"
        style={{
          borderColor: active
            ? "var(--color-tertiary)"
            : "var(--color-outline-variant)",
        }}
      ></div>
      <span className="font-mono text-[12px] text-on-surface-variant/60 block mb-1">
        {period}
      </span>
      <h3 className="font-newsreader text-2xl text-primary mb-1">
        {title}{" "}
        <span className="italic text-on-surface-variant/40 ml-1">at</span>{" "}
        <span className="font-semibold">{company}</span>
      </h3>
      <span className="font-mono text-[11px] tracking-widest text-on-surface-variant/50 uppercase block mb-4">
        {role}
      </span>
      <ul className="space-y-2">
        {highlights.map((h, i) => (
          <li
            key={i}
            className="flex gap-3 text-body-md text-on-surface-variant leading-relaxed"
          >
            <span
              className="mt-[9px] w-1 h-1 rounded-full shrink-0"
              style={{ background: "var(--color-tertiary)" }}
            ></span>
            {h}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
