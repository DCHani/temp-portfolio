"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Construction Company Website",
    description: "A website for a construction company featuring project showcases, service details, and contact forms, with an admin dashboard.",
    image: "/images/projects/project1.png",
    tags: ["Next.js", "TypeScript", "GSAP", "PostgreSQL", "Tailwind"],
    demoUrl: "https://nassar-constraction.vercel.app",
    year: "2025",
    color: "#8b5cf6",
  },
  {
    id: 2,
    title: "Real-estate Platform",
    description: "A modern website for a real-estate company with property listings, agent profiles, and an admin dashboard for content management.",
    image: "/images/projects/project2.png",
    tags: ["Next.js", "TypeScript", "GSAP", "PostgreSQL", "Node.js"],
    demoUrl: "https://www.nassargroupllc.com",
    year: "2025",
    color: "#06b6d4",
  },
  {
    id: 3,
    title: "Delivery Tracking System",
    description: "A website for a delivery company featuring real-time tracking and forms to be filled by any type of user.",
    image: "/images/projects/project3.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Maps API"],
    demoUrl: "https://www.areex-delivery.com",
    year: "2025",
    color: "#10b981",
  },
  {
    id: 4,
    title: "Insurance Portal",
    description: "A website for an insurance company with policy details, claim forms, and interactive visualizations.",
    image: "/images/projects/project4.png",
    tags: ["Vue.js", "D3.js", "Python", "FastAPI"],
    demoUrl: "https://minarcoins.com",
    year: "2025",
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Suturing Robot",
    description:" An imitation learning-based suturing robot developed using Python and C# in Unity, designed to assist in surgical procedures by automating suturing tasks.",
    image: "/images/projects/project5.png",
    tags: ["Imitation Learning", "Robotics", "Python", "C#","Unity"],
    // demoUrl: "https://minarcoins.com",
    year: "2025",
    color: "#d6315a",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInSection, setIsInSection] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Track when user is in the projects section
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setIsInSection(true),
        onLeave: () => setIsInSection(false),
        onEnterBack: () => setIsInSection(true),
        onLeaveBack: () => setIsInSection(false),
      });

      const cards = gsap.utils.toArray<HTMLElement>(".project-slide");

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: i === cards.length - 1 ? "bottom bottom" : "bottom top",
          pin: i !== cards.length - 1,
          pinSpacing: false,
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        // Animate content
        const content = card.querySelector(".project-content");
        const image = card.querySelector(".project-image");
        const tags = card.querySelectorAll(".project-tag");

        if (content) {
          gsap.fromTo(content,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (image) {
          gsap.fromTo(image,
            { scale: 1.2 },
            {
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (tags.length) {
          gsap.fromTo(tags,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-[#030305]">
      {/* Section indicator - Left side */}
      <div className={`fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-none transition-all duration-500 ${isInSection ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800">
          02
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-zinc-700 to-transparent" />
        <span className="text-xs text-zinc-600 uppercase tracking-widest [writing-mode:vertical-lr]">
          Projects
        </span>
      </div>

      {/* Progress indicator - Right side */}
      <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 transition-all duration-500 ${isInSection ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}`}>
        {projects.map((project, i) => (
          <button
            key={i}
            className={`group relative transition-all duration-500 ${i === activeIndex ? "scale-100" : "scale-75 opacity-50"
              }`}
            onClick={() => {
              const element = document.querySelectorAll(".project-slide")[i];
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${i === activeIndex
                  ? "scale-125"
                  : "border-zinc-700 hover:border-zinc-500"
                }`}
              style={{
                borderColor: i === activeIndex ? project.color : undefined,
                background: i === activeIndex ? project.color : "transparent",
                boxShadow: i === activeIndex ? `0 0 20px ${project.color}60` : "none",
              }}
            />
            {/* Tooltip */}
            <span className={`absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 text-xs text-zinc-300 whitespace-nowrap border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
              {project.title.split(" ").slice(0, 2).join(" ")}
            </span>
          </button>
        ))}
        <div className="mt-4 text-center">
          <span className="text-xs font-mono text-zinc-600">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <div className="w-4 h-px bg-zinc-700 mx-auto my-1" />
          <span className="text-xs font-mono text-zinc-700">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Project slides */}
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="project-slide relative h-screen w-full"
        >
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Image */}
            <div className="project-image absolute inset-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-[#030305]/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/70 to-transparent" />

            {/* Accent glow */}
            <div
              className="absolute bottom-0 left-0 w-1/2 h-1/2 blur-[150px] opacity-30"
              style={{ background: project.color }}
            />
            <div
              className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
              style={{ background: project.color }}
            />
          </div>

          {/* Content */}
          <div className="project-content relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
              <div className="max-w-3xl">
                {/* Project number & year */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div
                    className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-2"
                    style={{
                      borderColor: `${project.color}50`,
                      background: `${project.color}10`,
                    }}
                  >
                    <span
                      className="text-xl sm:text-2xl font-black"
                      style={{ color: project.color }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">Featured Project</span>
                    <span className="text-sm text-zinc-400">{project.year}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.05]">
                  {project.title.split(" ").map((word, i) => (
                    <span key={i} className="inline-block mr-4">
                      {i === 0 ? (
                        <span style={{ color: project.color }}>{word}</span>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 mb-6 sm:mb-10 leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="project-tag px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 backdrop-blur-sm hover:border-zinc-600 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 sm:gap-5"
                >
                  <span
                    className="px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                      boxShadow: `0 10px 40px ${project.color}40`,
                    }}
                  >
                    View Live Site
                  </span>
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hidden sm:flex"
                    style={{
                      borderColor: `${project.color}50`,
                      background: `${project.color}10`,
                    }}
                  >
                    <svg
                      className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: project.color }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </a>
                )}
              </div>
            </div>
          </div>

          {/* Large background number */}
          <div className="absolute bottom-0 right-0 lg:bottom-10 lg:right-10 pointer-events-none overflow-hidden">
            <span
              className="text-[25vw] lg:text-[20vw] font-black leading-none opacity-[0.03]"
              style={{ color: project.color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Decorative lines */}
          <div
            className="absolute top-20 right-20 w-32 h-32 border-t-2 border-r-2 rounded-tr-3xl opacity-20 hidden lg:block"
            style={{ borderColor: project.color }}
          />
          <div
            className="absolute bottom-20 left-20 w-32 h-32 border-b-2 border-l-2 rounded-bl-3xl opacity-20 hidden lg:block"
            style={{ borderColor: project.color }}
          />

          {/* Scroll indicator - first slide only */}
          {index === 0 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              <span className="text-xs text-zinc-600 uppercase tracking-widest">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2">
                <div className="w-1 h-2 rounded-full bg-zinc-500 animate-bounce" />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Final CTA section */}
      <div className="relative h-screen w-full flex items-center justify-center bg-[#030305] overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-6">
          {/* Icon */}
          <div className="relative w-28 h-28 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
              <svg className="w-12 h-12 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <h4 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Want to see more?
          </h4>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-500 mb-8 sm:mb-12 max-w-xl mx-auto">
            Let&apos;s collaborate and build something extraordinary together.
          </p>

          {/* CTA links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a
              href="#contact"
              className="group relative text-xl sm:text-2xl lg:text-3xl font-semibold text-white transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <span className="relative">
                  Start a Project
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-full transition-all duration-500 ease-out" />
                </span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </a>
            <span className="hidden sm:block w-px h-8 bg-zinc-700" />
            <a
              href="https://github.com/DCHani"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-400 hover:text-white transition-all duration-300"
            >
              <span className="relative">
                View GitHub
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zinc-500 group-hover:w-full transition-all duration-500 ease-out" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
