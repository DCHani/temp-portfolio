"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Construction Company Website",
    description:
      "A website for a construction company featuring project showcases, service details, and contact forms, with an aditional admin dashboard for managing content.",
    image: "/images/projects/project1.png",
    tags: ["Next.js", "TypeScript", "Gsap", "PostgreSQL", "Tailwind", "Node.js"],
    category: "WEB APP",
    demoUrl: "https://nassar-constraction.vercel.app",
    features: [
      "User authentication & authorization",
      "Smoothness integrated using Gsap",
      "Real-time inventory tracking",
    ],
  },
  {
    id: 2,
    title: "Real-estate Company Website",
    description:
      "a modern website for a real-estate company with property listings, agent profiles, and an admin dashboard for content management.",
    image: "/images/projects/project2.png",
    tags: ["Next.js", "TypeScript", "Gsap", "PostgreSQL", "Tailwind", "Node.js"],
    category: "WEB APP",
    demoUrl: "https://www.nassargroupllc.com",
    features: [
      "Admin dashboard for content management",
      "Real Time map integration",
      "Stunning project showcases",
    ],
  },
  {
    id: 3,
    title: "A delivery Company Website",
    description: "A website for a delivery company featuring real-time tracking and forms to be filled by any type of user.",
    image: "/images/projects/project3.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Javascript"],
    category: "WEB APP",
    demoUrl: "https://www.areex-delivery.com",
    features: [
      "Real-time order tracking",
      "Forms for different user types",
      "Multi-language support",
    ],
  },
  {
    id: 4,
    title: "An Insurance Company website",
    description: "A website for an insurance company with policy details, claim forms, and interactive visualizations.",
    image: "/images/projects/project4.png",
    tags: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    category: "WEB APP",
    demoUrl: "https://minarcoins.com",
    features: [
      "Interactive data visualizations",
      "Comprehensive policy details",
      "User-friendly claim forms",
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
            Every card below maps to a hosted running website. Explore my work showcasing
            innovative solutions and clean code.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-linear-to-r from-violet-600 to-cyan-600 text-white glow"
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
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0d0d15] via-[#0d0d15]/50 to-transparent" />
              </div>

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
                className={`absolute inset-0 bg-linear-to-r from-violet-600/5 to-cyan-600/5 transition-opacity duration-300 pointer-events-none ${hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {/* <div className="text-center mt-12">
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
        </div> */}
      </div>
    </section>
  );
}
