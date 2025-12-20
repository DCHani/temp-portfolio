"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: "+", label: "Projects Delivered", icon: "🚀" },
  { value: 5, suffix: "+", label: "Years Experience", icon: "⏳" },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
  { value: 3, suffix: "", label: "Languages Spoken", icon: "🌍" },
];

const milestones = [
  {
    year: "2020",
    title: "Started Coding",
    subtitle: "The Beginning",
    description: "First lines of code and the start of an exciting journey",
    icon: "🌱",
    color: "#f59e0b",
  },
  {
    year: "2023",
    title: "Bachelor's Degree",
    subtitle: "Computer Science",
    description: "Strong foundation in algorithms, data structures, and software engineering",
    icon: "📚",
    color: "#10b981",
  },
    {
    year: "2024",
    title: "Freelance Developer",
    subtitle: "Full Stack & AI",
    description: "Building production-ready applications for clients worldwide",
    icon: "💼",
    color: "#06b6d4",
  },  
  {
    year: "2024-2025",
    title: "AI Nexus Founder",
    subtitle: "President of AI Nexus",
    description: "Leading a scientific club of AI enthusiasts to explore and innovate in artificial intelligence",
    icon: "🤖",
    color: "#3421ad",
  },
  {
    year: "2025",
    title: "Master's Degree",
    subtitle: "Data Science & AI",
    description: "Advanced specialization in machine learning and deep learning.",
    icon: "🎓",
    color: "#8b5cf6",
  },



];

const expertise = [
  { name: "Full Stack Development", level: 92 },
  { name: "AI & Machine Learning", level: 88 },
  { name: "UI/UX Design", level: 85 },
  { name: "Database Architecture", level: 87 },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for scroll-based animations
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.5,
          onEnter: () => setHasAnimated(true),
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * milestones.length),
              milestones.length - 1
            );
            setActiveTimeline(newIndex);
          },
        },
      });

      // Animate header
      gsap.fromTo(".ach-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate stats
      gsap.fromTo(".stat-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate expertise bars
      gsap.fromTo(".expertise-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".expertise-section",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate counters
  useEffect(() => {
    if (!hasAnimated) return;

    const interval = setInterval(() => {
      setCounts(prev => prev.map((count, i) => {
        if (count < stats[i].value) {
          const increment = Math.ceil(stats[i].value / 50);
          return Math.min(count + increment, stats[i].value);
        }
        return count;
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative h-screen bg-[#030305] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Animated gradient */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${milestones[activeTimeline].color}15 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, ${milestones[activeTimeline].color}10 0%, transparent 40%)`,
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Section indicator */}
      <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800">
          04
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Section</span>
          <span className="text-sm text-zinc-400 font-medium">Achievements</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left - Stats & Info */}
            <div className="space-y-10">
              {/* Header */}
              <div className="ach-header">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
                  <span className="text-sm text-violet-400 uppercase tracking-widest">Track Record</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Achievements & Impact
                </h2>
                <p className="text-zinc-400 text-lg max-w-md">
                  A journey of continuous growth, learning, and delivering value through technology.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="stat-card group relative p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{stat.icon}</span>
                      <div
                        className="w-2 h-2 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ background: milestones[i % milestones.length].color }}
                      />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                      {counts[i]}{stat.suffix}
                    </div>
                    <div className="text-sm text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Expertise bars */}
              <div className="expertise-section space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Core Expertise</h3>
                {expertise.map((skill, i) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">{skill.name}</span>
                      <span className="text-zinc-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="expertise-bar h-full rounded-full origin-left"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${milestones[i % milestones.length].color}, ${milestones[(i + 1) % milestones.length].color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />

              {/* Timeline items */}
              <div className="space-y-6">
                {milestones.map((milestone, i) => (
                  <div
                    key={milestone.year}
                    className={`relative pl-16 transition-all duration-500 ${i === activeTimeline
                        ? "opacity-100 translate-x-0"
                        : i < activeTimeline
                          ? "opacity-40 -translate-x-2"
                          : "opacity-40 translate-x-2"
                      }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 top-3 w-5 h-5 rounded-full border-2 transition-all duration-500 ${i === activeTimeline ? "scale-125" : "scale-100"
                        }`}
                      style={{
                        borderColor: milestone.color,
                        background: i === activeTimeline ? milestone.color : "transparent",
                        boxShadow: i === activeTimeline ? `0 0 20px ${milestone.color}` : "none",
                      }}
                    />

                    {/* Content card */}
                    <div
                      className={`p-5 rounded-2xl border transition-all duration-500 ${i === activeTimeline
                          ? "bg-zinc-800/50 border-zinc-700 scale-100"
                          : "bg-zinc-900/30 border-zinc-800/30 scale-95"
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{milestone.icon}</span>
                        <span
                          className="text-sm font-mono px-2 py-0.5 rounded-full"
                          style={{
                            color: milestone.color,
                            background: `${milestone.color}15`,
                          }}
                        >
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{milestone.title}</h3>
                      <p className="text-sm text-violet-400 mb-2">{milestone.subtitle}</p>
                      <p className={`text-sm text-zinc-500 transition-all duration-500 ${i === activeTimeline ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
                        }`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {milestones.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-8 rounded-full transition-all duration-300 ${i <= activeTimeline ? "bg-violet-500" : "bg-zinc-800"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-zinc-600">
        <div className="flex gap-1.5">
          {milestones.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-1 rounded-full transition-all duration-300 ${i <= activeTimeline ? "bg-violet-500" : "bg-zinc-800"
                }`}
            />
          ))}
        </div>
        <span className="text-xs font-mono">
          {String(activeTimeline + 1).padStart(2, "0")}/{String(milestones.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
