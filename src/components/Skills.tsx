"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: "🤖",
    skills: [
      { name: "Python", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 82 },
      { name: "Pandas / NumPy", level: 88 },
    ],
  },
  {
    title: "Frontend Development",
    icon: "🎨",
    skills: [
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 85 },
      { name: "Flutter", level: 78 },
      { name: "Gsap", level: 60 },
    ],
  },
  {
    title: "Backend & Databases",
    icon: "⚙️",
    skills: [
      { name: "Node.js / Express.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "Django", level: 82 },
      { name: "MongoDB / Firebase", level: 80 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 69 },
      { name: "Linux", level: 65 },
    ],
  },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setWidth(level), 200);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-violet-400 font-mono text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-violet-500/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-header", 
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ".skills-header",
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

      gsap.fromTo(".skill-card", 
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-violet-950/10 via-transparent to-violet-950/10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="skills-header text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">My Tech Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Proficient in modern web technologies and constantly expanding my skill set
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="skill-card gradient-border p-6 hover:glow transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                <span className="ml-auto px-2 py-1 rounded-lg bg-violet-500/10 text-violet-400 text-sm font-mono">
                  {category.skills.length}+
                </span>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-6">
            Also experienced with
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "REST APIs",
              "Redux",
              "Jest",
              "CI/CD",
              "Linux",
              "WebSockets",
              "Three.js",
              "Framer Motion",
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-violet-500/10 text-gray-300 text-sm border border-violet-500/20 hover:border-violet-500/50 hover:bg-violet-500/20 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
