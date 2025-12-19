"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(".about-header", 
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ".about-header",
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

      // Left side (code block) animation
      gsap.fromTo(".about-visual", 
        { opacity: 0, x: -60 },
        {
          scrollTrigger: {
            trigger: ".about-visual",
            start: "top 85%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Right side (content) animation
      gsap.fromTo(".about-content", 
        { opacity: 0, x: 60 },
        {
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 85%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="about-header text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Who I Am</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <div className="about-visual relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 to-cyan-600/20 rounded-3xl rotate-6 blur-xl" />
              <div className="absolute inset-4 bg-linear-to-br from-violet-600/30 to-cyan-600/30 rounded-3xl -rotate-6" />

              {/* Main Card */}
              <div className="relative gradient-border p-8 h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  {/* Code Block Visual */}
                  <div className="bg-[#0d0d15] rounded-lg p-4 text-left font-mono text-sm">
                    <div className="flex gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <pre className="text-xs sm:text-sm overflow-x-auto">
                      <code>
                        <span className="text-violet-400">const</span>{" "}
                        <span className="text-cyan-400">developer</span> = {"{"}
                        {"\n"}
                        {"  "}
                        <span className="text-gray-400">name:</span>{" "}
                        <span className="text-green-400">&quot;Azzeddine Hani Benchalel&quot;</span>,{"\n"}
                        {"  "}
                        <span className="text-gray-400">roles:</span>{" "}
                        <span className="text-green-400">{"["}&quot;Full Stack Dev&quot;,&quot;ML Engineer&quot;{"]"}</span>,{"\n"}
                        {"  "}
                        <span className="text-gray-400">passion:</span>{" "}
                        <span className="text-green-400">{"["}&quot;Building cool stuff&quot;,&quot;Sports&quot;{"]"}</span>,{"\n"}
                        {"  "}
                        <span className="text-gray-400">coffee:</span>{" "}
                        <span className="text-red-400">false</span>,{"\n"}
                        {"}"};
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="about-content space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Turning Ideas Into{" "}
              <span className="gradient-text">Digital Reality</span>
            </h3>

            <p className="text-gray-400 leading-relaxed">
              I&apos;m a passionate developer with a love for creating elegant solutions 
              to complex problems. With expertise in modern web technologies, I 
              specialize in building responsive, user-friendly applications that 
              deliver exceptional experiences.
            </p>

            <p className="text-gray-400 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the 
              developer community. I believe in continuous learning and staying 
              ahead of the curve in this ever-evolving tech landscape.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: "🎯", text: "Problem Solver" },
                { icon: "🚀", text: "Fast Learner" },
                { icon: "💡", text: "Creative Thinker" },
                { icon: "🤝", text: "Team Player" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/10"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Resume Button */}
            <div className="pt-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-all duration-300 glow"
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
