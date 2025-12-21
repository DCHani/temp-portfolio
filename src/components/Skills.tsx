"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", level: 95, color: "#61DAFB" },
  { name: "Next.js", level: 92, color: "#ffffff" },
  { name: "TypeScript", level: 90, color: "#3178C6" },
  { name: "Node.js", level: 88, color: "#339933" },
  { name: "Python", level: 92, color: "#3776AB" },
  { name: "TensorFlow", level: 85, color: "#FF6F00" },
  { name: "PostgreSQL", level: 85, color: "#4169E1" },
  { name: "Docker", level: 78, color: "#2496ED" },
];

const expertise = [
  {
    title: "Frontend",
    description: "Building responsive, performant interfaces with modern frameworks",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Backend",
    description: "Designing scalable APIs and robust server architectures",
    techs: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    title: "AI / ML",
    description: "Implementing intelligent solutions with machine learning",
    techs: ["TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "DevOps",
    description: "Streamlining deployment and infrastructure management",
    techs: ["Docker", "AWS", "CI/CD", "Linux", "Git"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSkill, setActiveSkill] = useState(0);
  const [counts, setCounts] = useState(skills.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            // Update active skill based on scroll progress
            const newIndex = Math.min(
              Math.floor(self.progress * skills.length),
              skills.length - 1
            );
            setActiveSkill(newIndex);
          },
        },
      });

      // Animate the circular progress
      tl.to(".skill-ring", {
        rotation: 360,
        duration: 1,
        ease: "none",
      }, 0);

      // Animate skill bars sequentially
      skills.forEach((_, i) => {
        tl.to(`.skill-bar-${i}`, {
          scaleX: 1,
          duration: 0.1,
          ease: "power2.out",
        }, i * 0.1);
      });

      // Fade in expertise cards
      tl.fromTo(".expertise-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.2,
          ease: "power2.out",
        },
        0
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate counters
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => prev.map((count, i) => {
        if (i <= activeSkill && count < skills[i].level) {
          return Math.min(count + 2, skills[i].level);
        }
        return count;
      }));
    }, 20);

    return () => clearInterval(interval);
  }, [activeSkill]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative h-screen bg-[#030305] overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient based on active skill */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${skills[activeSkill].color}15 0%, transparent 50%),
                         radial-gradient(circle at 70% 70%, ${skills[activeSkill].color}10 0%, transparent 40%)`,
          }}
        />
        
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating particles - using fixed positions to avoid hydration mismatch */}
        {[
          { left: 5, top: 10, delay: 0.2, duration: 2.5 },
          { left: 15, top: 80, delay: 1.5, duration: 3.2 },
          { left: 25, top: 30, delay: 0.8, duration: 2.8 },
          { left: 35, top: 60, delay: 2.1, duration: 3.5 },
          { left: 45, top: 15, delay: 0.5, duration: 2.3 },
          { left: 55, top: 85, delay: 1.8, duration: 3.1 },
          { left: 65, top: 45, delay: 2.5, duration: 2.6 },
          { left: 75, top: 70, delay: 0.3, duration: 3.4 },
          { left: 85, top: 25, delay: 1.2, duration: 2.9 },
          { left: 95, top: 55, delay: 2.8, duration: 3.0 },
          { left: 10, top: 40, delay: 0.7, duration: 2.4 },
          { left: 20, top: 90, delay: 1.9, duration: 3.3 },
          { left: 30, top: 5, delay: 2.3, duration: 2.7 },
          { left: 40, top: 75, delay: 0.4, duration: 3.6 },
          { left: 50, top: 35, delay: 1.1, duration: 2.2 },
          { left: 60, top: 95, delay: 2.6, duration: 3.8 },
          { left: 70, top: 20, delay: 0.9, duration: 2.1 },
          { left: 80, top: 50, delay: 1.6, duration: 3.7 },
          { left: 90, top: 65, delay: 2.0, duration: 2.5 },
          { left: 3, top: 48, delay: 1.3, duration: 3.0 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Section indicator - hidden on md, show on lg */}
      <div className="absolute top-8 left-8 z-20 hidden lg:flex items-center gap-4">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800">
          03
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Section</span>
          <span className="text-sm text-zinc-400 font-medium">Tech Stack</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 md:gap-8 lg:gap-12 xl:gap-20 items-center">
            
            {/* Mobile Circular visualization - shown only on small screens */}
            <div className="relative flex md:hidden items-center justify-center order-first">
              {/* Central ring */}
              <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56">
                {/* Outer rotating ring */}
                <div className="skill-ring absolute inset-0 rounded-full border border-zinc-800">
                  {skills.map((skill, i) => {
                    const angle = (i / skills.length) * 360 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + 48 * Math.cos(rad);
                    const y = 50 + 48 * Math.sin(rad);
                    
                    return (
                      <div
                        key={skill.name}
                        className={`absolute w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full transition-all duration-500 ${
                          i === activeSkill ? "scale-150" : "scale-100"
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          background: i <= activeSkill ? skill.color : "#27272a",
                          boxShadow: i === activeSkill ? `0 0 20px ${skill.color}` : "none",
                        }}
                      />
                    );
                  })}
                </div>

                {/* Middle ring */}
                <div className="absolute inset-4 xs:inset-5 rounded-full border border-zinc-800/50" />

                {/* Inner content */}
                <div className="absolute inset-7 xs:inset-8 sm:inset-9 rounded-full bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center backdrop-blur-sm">
                  <span
                    className="text-2xl xs:text-3xl sm:text-3xl font-black transition-colors duration-300"
                    style={{ color: skills[activeSkill].color }}
                  >
                    {counts[activeSkill]}%
                  </span>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-white mt-0.5">
                    {skills[activeSkill].name}
                  </span>
                  <span className="text-[6px] xs:text-[7px] text-zinc-500 uppercase tracking-widest mt-0.5">
                    Proficiency
                  </span>
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-colors duration-700"
                  style={{ background: skills[activeSkill].color }}
                />
              </div>

              {/* Mobile skill dots indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {skills.map((skill, i) => (
                  <button
                    key={skill.name}
                    onClick={() => setActiveSkill(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeSkill ? 'scale-125' : ''}`}
                    style={{
                      background: i <= activeSkill ? skill.color : '#3f3f46',
                      boxShadow: i === activeSkill ? `0 0 8px ${skill.color}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Circular visualization - hidden on small, shown on md+ (OLD CODE) */}
            <div className="relative hidden md:flex items-center justify-center">
              {/* Central ring */}
              <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                {/* Outer rotating ring */}
                <div className="skill-ring absolute inset-0 rounded-full border border-zinc-800">
                  {skills.map((skill, i) => {
                    const angle = (i / skills.length) * 360 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + 48 * Math.cos(rad);
                    const y = 50 + 48 * Math.sin(rad);
                    
                    return (
                      <div
                        key={skill.name}
                        className={`absolute w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-500 ${
                          i === activeSkill ? "scale-150" : "scale-100"
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          background: i <= activeSkill ? skill.color : "#27272a",
                          boxShadow: i === activeSkill ? `0 0 20px ${skill.color}` : "none",
                        }}
                      />
                    );
                  })}
                </div>

                {/* Middle ring */}
                <div className="absolute inset-5 md:inset-6 lg:inset-7 xl:inset-8 rounded-full border border-zinc-800/50" />

                {/* Inner content */}
                <div className="absolute inset-9 md:inset-10 lg:inset-14 xl:inset-16 rounded-full bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center backdrop-blur-sm">
                  <span
                    className="text-3xl md:text-3xl lg:text-5xl xl:text-7xl font-black transition-colors duration-300"
                    style={{ color: skills[activeSkill].color }}
                  >
                    {counts[activeSkill]}%
                  </span>
                  <span className="text-xs md:text-sm lg:text-xl xl:text-2xl font-bold text-white mt-0.5 lg:mt-1 xl:mt-2">
                    {skills[activeSkill].name}
                  </span>
                  <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-xs text-zinc-500 uppercase tracking-widest mt-0.5 lg:mt-1">
                    Proficiency
                  </span>
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-colors duration-700"
                  style={{ background: skills[activeSkill].color }}
                />
              </div>

              {/* Skill list - hidden on md, show on lg */}
              <div className="absolute -right-4 lg:right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
                {skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                      i === activeSkill
                        ? "bg-zinc-800/80 scale-105"
                        : "bg-transparent hover:bg-zinc-800/30"
                    }`}
                    onClick={() => setActiveSkill(i)}
                  >
                    <div
                      className={`skill-bar-${i} h-1 rounded-full origin-left transition-all duration-500`}
                      style={{
                        width: "40px",
                        background: i <= activeSkill ? skill.color : "#3f3f46",
                        transform: `scaleX(${i <= activeSkill ? 1 : 0.3})`,
                      }}
                    />
                    <span className={`text-sm font-medium transition-colors ${
                      i === activeSkill ? "text-white" : "text-zinc-500"
                    }`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Expertise cards */}
            <div className="space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6">
              <div className="mb-1.5 xs:mb-2 md:mb-3 lg:mb-6 xl:mb-8">
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 xs:mb-1.5 md:mb-2 lg:mb-3 xl:mb-4">
                  My Tech Stack
                </h2>
                <p className="text-zinc-400 text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs lg:text-base xl:text-lg max-w-lg">
                  Years of experience crafting digital solutions with cutting-edge technologies
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5">
                {expertise.map((item, i) => (
                  <div
                    key={item.title}
                    className="expertise-card group relative p-2 xs:p-2.5 sm:p-3 md:p-3 lg:p-4 xl:p-5 rounded-md xs:rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 hover:bg-zinc-800/30"
                  >
                    {/* Icon and Title - inline on small/medium heights, stacked on large */}
                    <div className="flex items-center gap-2 mb-1 xs:mb-1.5 sm:mb-2 xl:flex-col xl:items-start xl:gap-0">
                      <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-md xs:rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-violet-400 xl:mb-4 group-hover:scale-110 transition-transform [&>svg]:w-4 [&>svg]:h-4 xs:[&>svg]:w-5 xs:[&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7 lg:[&>svg]:w-8 lg:[&>svg]:h-8 shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg font-bold text-white xl:mb-2">{item.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-zinc-500 mb-1 xs:mb-1.5 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-0.5 xs:gap-1 md:gap-1.5">
                      {item.techs.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs px-1 xs:px-1.5 sm:px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm xs:rounded md:rounded-md bg-zinc-800 text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.techs.length > 3 && (
                        <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs px-1 xs:px-1.5 sm:px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm xs:rounded md:rounded-md bg-zinc-800 text-zinc-500">
                          +{item.techs.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Hover gradient */}
                    <div className="absolute inset-0 rounded-md xs:rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Stats row */}
              {/* <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 md:gap-4 lg:gap-6 xl:gap-8 pt-2 md:pt-3 lg:pt-5 xl:pt-6 border-t border-zinc-800/50">
                <div className="text-center sm:text-left">
                  <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white">15+</span>
                  <span className="block text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-zinc-500">Technologies</span>
                </div>
                <div className="w-px h-5 md:h-6 lg:h-8 xl:h-10 bg-zinc-800 hidden sm:block" />
                <div className="text-center sm:text-left">
                  <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white">5+</span>
                  <span className="block text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-zinc-500">Years Exp.</span>
                </div>
                <div className="w-px h-5 md:h-6 lg:h-8 xl:h-10 bg-zinc-800 hidden sm:block" />
                <div className="text-center sm:text-left">
                  <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white">20+</span>
                  <span className="block text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-zinc-500">Projects</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="absolute bottom-3 xs:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 xs:gap-3 text-zinc-600">
        <div className="flex gap-1.5">
          {skills.map((_, i) => (
            <div
              key={i}
              className={`w-6 h-1 rounded-full transition-all duration-300 ${
                i <= activeSkill ? "bg-violet-500" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-mono">
          {String(activeSkill + 1).padStart(2, "0")}/{String(skills.length).padStart(2, "0")}
        </span>
      </div>

      {/* Corner decoration - hidden on md */}
      <div className="absolute bottom-8 right-8 text-right hidden lg:block">
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Scroll to explore</span>
        <div className="mt-2 flex justify-end">
          <svg className="w-5 h-5 text-zinc-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
