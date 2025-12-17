"use client";

import { useEffect, useState } from "react";

const roles = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl float"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl float"
          style={{ animationDelay: "-1.5s" }}
        />

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Greeting */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-300">Available for opportunities</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-gray-300">Hello, I&apos;m</span>
          <br />
          <span className="gradient-text glow-text">Your Name</span>
        </h1>

        {/* Typewriter Role */}
        <div className="h-12 mb-8">
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-400">
            A{" "}
            <span className="text-violet-400 typewriter-cursor pr-1">
              {displayText}
            </span>
          </p>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed">
          Crafting innovative digital experiences with clean code and creative design.
          Passionate about building products that make a difference.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-all duration-300 glow flex items-center gap-2"
          >
            View My Work
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-violet-500/50 text-white font-semibold hover:bg-violet-500/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-violet-500/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-violet-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "3+", label: "Years Experience" },
            { value: "20+", label: "Projects Completed" },
            { value: "15+", label: "Technologies" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
