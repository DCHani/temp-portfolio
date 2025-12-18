"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics dashboard.",
    image: "/projects/project1.png",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind"],
    category: "WEB APP",
    demoUrl: "#",
    codeUrl: "#",
    features: [
      "User authentication & authorization",
      "Payment processing with Stripe",
      "Real-time inventory tracking",
    ],
  },
  {
    id: 2,
    title: "AI Task Manager",
    description:
      "Smart task management app powered by AI that automatically prioritizes and schedules your tasks based on deadlines and importance.",
    image: "/projects/project2.png",
    tags: ["React", "OpenAI", "Node.js", "MongoDB", "Socket.io"],
    category: "AI / DATA",
    demoUrl: "#",
    codeUrl: "#",
    features: [
      "AI-powered task prioritization",
      "Smart scheduling algorithm",
      "Real-time collaboration features",
    ],
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description:
      "A modern chat application with real-time messaging, file sharing, and video calling capabilities.",
    image: "/projects/project3.png",
    tags: ["React", "Socket.io", "WebRTC", "Express", "Redis"],
    category: "WEB APP",
    demoUrl: "#",
    codeUrl: "#",
    features: [
      "Real-time messaging",
      "Video & audio calling",
      "End-to-end encryption",
    ],
  },
  {
    id: 4,
    title: "Portfolio Dashboard",
    description:
      "Analytics dashboard for tracking investment portfolios with real-time market data and performance metrics.",
    image: "/projects/project4.png",
    tags: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    category: "WEB APP",
    demoUrl: "#",
    codeUrl: "#",
    features: [
      "Real-time market data",
      "Interactive charts & graphs",
      "Portfolio performance tracking",
    ],
  },
];

const categories = ["All", "WEB APP", "AI / DATA"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-header", 
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".project-card", 
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-header text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            BUILT, NOT IMAGINED
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every card below maps to a real repo / demo. Explore my work showcasing
            innovative solutions and clean code.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white glow"
                  : "bg-violet-500/10 text-gray-400 hover:text-white hover:bg-violet-500/20 border border-violet-500/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative gradient-border overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.demoUrl}
                      className="p-2 rounded-lg bg-violet-500/10 text-gray-400 hover:text-violet-400 hover:bg-violet-500/20 transition-all"
                      title="Live Demo"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    <a
                      href={project.codeUrl}
                      className="p-2 rounded-lg bg-violet-500/10 text-gray-400 hover:text-violet-400 hover:bg-violet-500/20 transition-all"
                      title="View Code"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <svg
                        className="w-4 h-4 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#0d0d15] text-gray-400 border border-violet-500/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-violet-600/5 to-cyan-600/5 transition-opacity duration-300 pointer-events-none ${
                  hoveredProject === project.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-violet-500/50 text-white font-semibold hover:bg-violet-500/10 transition-all duration-300"
          >
            View All Projects
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
