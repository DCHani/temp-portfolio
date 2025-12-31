"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "+", label: "Years Experience", icon: "⏱️" },
  { value: 20, suffix: "+", label: "Projects Built", icon: "🚀" },
  { value: 15, suffix: "+", label: "Technologies", icon: "⚡" },
  { value: 100, suffix: "%", label: "Passion", icon: "❤️" },
];

const expertise = [
  { 
    title: "Frontend Mastery", 
    desc: "Creating great, responsive UIs with React, Next.js & modern CSS",
    icon: "🎨",
    gradient: "from-violet-500 to-fuchsia-500",
    skills: ["React", "Next.js", "Flutter", "Tailwind"]
  },
  { 
    title: "Backend Power", 
    desc: "Building robust APIs and scalable server architectures",
    icon: "⚙️",
    gradient: "from-cyan-500 to-blue-500",
    skills: ["Node.js", "Python", "PostgreSQL", "REST/GraphQL"]
  },
  { 
    title: "AI & Machine Learning", 
    desc: "Implementing intelligent solutions with ML frameworks",
    icon: "🧠",
    gradient: "from-emerald-500 to-teal-500",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP"]
  },
  { 
    title: "DevOps & Cloud", 
    desc: "Deploying and managing applications at scale",
    icon: "☁️",
    gradient: "from-orange-500 to-amber-500",
    skills: ["Docker", "AWS", "CI/CD", "Linux"]
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.25) setActivePanel(0);
            else if (progress < 0.5) setActivePanel(1);
            else if (progress < 0.75) setActivePanel(2);
            else setActivePanel(3);
          },
        },
      });

      // Panel 1: Epic intro with 3D text
      tl.fromTo(".hero-text-line",
        { opacity: 0, y: 120, rotationX: -90, transformOrigin: "50% 50% -50" },
        { opacity: 1, y: 0, rotationX: 0, stagger: 0.15, duration: 0.6, ease: "power4.out" },
        0
      )
      .fromTo(".hero-glow",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        0.2
      )
      .fromTo(".floating-element",
        { opacity: 0, y: 50, scale: 0 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" },
        0.4
      )
      // ADD PAUSE AFTER PANEL 1
      .to({}, { duration: 0.7 }, "+=0"); // Pause for 0.3 seconds

      // Panel 1 → 2
      tl.to(".panel-1", { 
        opacity: 0, 
        scale: 0.8, 
        rotationX: 15,
        filter: "blur(20px)", 
        duration: 1.0 
      })
      .fromTo(".panel-2",
        { opacity: 0, scale: 1.2, rotationX: -15, filter: "blur(20px)" },
        { opacity: 1, scale: 1, rotationX: 0, filter: "blur(0px)", duration: 0.5 },
        "-=0.5" // Overlap slightly
      );

      // Panel 2: Stats with counter animation
      tl.fromTo(".stat-card",
        { opacity: 0, y: 80, rotationY: -30 },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0, 
          stagger: 0.15, 
          duration: 0.5,
          ease: "power3.out",
          onStart: () => {
            // Animate counters
            stats.forEach((stat, i) => {
              gsap.to({}, {
                duration: 2,
                onUpdate: function() {
                  const progress = this.progress();
                  setCounters(prev => {
                    const newCounters = [...prev];
                    newCounters[i] = Math.floor(stat.value * progress);
                    return newCounters;
                  });
                }
              });
            });
          }
        }
      )
      // ADD PAUSE AFTER PANEL 2
      .to({}, { duration: 0.7 }, "+=0"); // Pause for 0.3 seconds

      // Panel 2 → 3
      tl.to(".panel-2", { 
        opacity: 0, 
        scale: 0.8,
        y: -100,
        filter: "blur(20px)", 
        duration: 0.5 
      })
      .fromTo(".panel-3",
        { opacity: 0, y: 100, filter: "blur(20px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 },
        "-=0.3"
      );

      // Panel 3: Expertise cards
      tl.fromTo(".expertise-card",
        { opacity: 0, x: -100, rotationY: 45 },
        { opacity: 1, x: 0, rotationY: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" }
      )
      .fromTo(".skill-tag",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.03, duration: 0.3, ease: "back.out(1.7)" }
      )
      // ADD PAUSE AFTER PANEL 3
      .to({}, { duration: 0.7 }, "+=0"); // Pause for 0.3 seconds

      // Panel 3 → 4
      tl.to(".panel-3", { 
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)", 
        duration: 0.5 
      })
      .fromTo(".panel-4",
        { opacity: 0, scale: 1.1, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5 },
        "-=0.3"
      );

      // Panel 4: CTA
      tl.fromTo(".cta-title span",
        { opacity: 0, y: 50, rotationX: -45 },
        { opacity: 1, y: 0, rotationX: 0, stagger: 0.08, duration: 0.4 }
      )
      .fromTo(".cta-button",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)" }
      )
      .fromTo(".orbit-ring",
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }
      )
      // ADD PAUSE AFTER PANEL 4 (final pause)
      .to({}, { duration: 0.7 }, "+=0"); // Longer pause at the end

      // Continuous animations
      gsap.to(".float-slow", { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".float-fast", { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".rotate-slow", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
      gsap.to(".pulse-glow", { 
        boxShadow: "0 0 60px rgba(139, 92, 246, 0.6)", 
        duration: 1.5, 
        repeat: -1, 
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen w-full bg-[#030305] overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-full h-full opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at ${30 - mousePos.x}% ${70 - mousePos.y}%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at ${70 + mousePos.x}% ${30 + mousePos.y}%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
            `,
            transition: "background 0.3s ease-out"
          }}
        />
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px"
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-violet-500 float-slow opacity-60" />
      <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-cyan-500 float-fast opacity-50" />
      <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-fuchsia-500 float-slow opacity-40" />
      <div className="absolute top-1/2 right-[8%] w-4 h-4 rounded-full bg-violet-400/30 float-fast" />

      {/* Progress indicator - hidden on mobile */}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1">
        <div className="h-32 w-1 rounded-full bg-zinc-800 overflow-hidden">
          <div 
            className="w-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500 transition-all duration-300 rounded-full"
            style={{ height: `${(activePanel + 1) * 25}%` }}
          />
        </div>
        <span className="text-[10px] text-zinc-600 mt-2">{activePanel + 1}/4</span>
      </div>

      {/* Panel navigation dots - hidden on mobile */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
        {["Intro", "Stats", "Skills", "Connect"].map((label, i) => (
          <div key={i} className="group flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                activePanel === i 
                  ? "bg-violet-500 scale-125" 
                  : "bg-zinc-700 group-hover:bg-zinc-500"
              }`} />
              {activePanel === i && (
                <>
                  <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-30" />
                  <div className="absolute -inset-1 rounded-full border border-violet-500/50" />
                </>
              )}
            </div>
            <span className={`text-xs transition-all duration-300 ${
              activePanel === i ? "text-white opacity-100 translate-x-0" : "text-zinc-600 opacity-0 -translate-x-2"
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center" style={{ perspective: "1200px" }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20">

          {/* Panel 1: Epic Intro */}
          <div className="panel-1 absolute inset-0 flex items-center justify-center">
            <div className="relative text-center" style={{ transformStyle: "preserve-3d" }}>
              {/* Background glow */}
              <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[100px]" />
              
              {/* Floating decorative elements - hidden on small mobile */}
              <div className="floating-element absolute -top-16 -left-8 sm:-top-20 sm:-left-20 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border border-violet-500/30 rotate-12 hidden sm:flex items-center justify-center text-xl sm:text-2xl">
                💻
              </div>
              <div className="floating-element absolute -top-8 -right-8 sm:-top-10 sm:-right-16 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-cyan-500/30 hidden sm:flex items-center justify-center text-lg sm:text-xl">
                ⚡
              </div>
              <div className="floating-element absolute -bottom-12 -left-4 sm:-bottom-16 sm:-left-10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-fuchsia-500/30 -rotate-12 hidden sm:flex items-center justify-center text-base sm:text-lg">
                🎯
              </div>
              <div className="floating-element absolute -bottom-10 -right-8 sm:-bottom-12 sm:-right-20 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border border-emerald-500/30 rotate-6 hidden sm:flex items-center justify-center text-xl sm:text-2xl">
                🚀
              </div>

              {/* Main text */}
              <div className="relative" style={{ transform: `rotateX(${mousePos.y * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)` }}>
                <span className="hero-text-line block text-xs sm:text-sm lg:text-base text-violet-400 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
                  Discover
                </span>
                <h2 className="hero-text-line text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter">
                  <span className="block bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                    WHO I
                  </span>
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    AM
                  </span>
                </h2>
                <p className="hero-text-line mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-lg lg:text-xl text-zinc-500 max-w-lg mx-auto px-4 sm:px-0">
                  A developer passionate about creating 
                  <span className="text-white"> extraordinary </span>
                  digital experiences
                </p>
              </div>

              {/* Scroll hint */}
              <div className="hero-text-line absolute -bottom-16 sm:-bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-zinc-600 tracking-widest uppercase">Scroll to explore</span>
                <div className="w-4 sm:w-5 h-6 sm:h-8 rounded-full border border-zinc-700 flex justify-center p-1">
                  <div className="w-0.5 sm:w-1 h-1.5 sm:h-2 rounded-full bg-violet-500 animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Stats */}
          <div className="panel-2 absolute inset-0 flex items-center justify-center opacity-0">
            <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <span className="text-xs sm:text-sm text-cyan-400 tracking-widest uppercase">Numbers speak</span>
                <h3 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  My <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Impact</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="stat-card group relative"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-800/50 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-violet-500/50 hover:scale-105">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Icon */}
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{stat.icon}</div>
                      
                      {/* Counter */}
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        {counters[index]}{stat.suffix}
                      </div>
                      
                      {/* Label */}
                      <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 font-medium">{stat.label}</div>
                      
                      {/* Decorative line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 3: Expertise */}
          <div className="panel-3 absolute inset-0 flex items-center justify-center opacity-0">
            <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <span className="text-xs sm:text-sm text-fuchsia-400 tracking-widest uppercase">What I do</span>
                <h3 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Areas of <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">Expertise</span>
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {expertise.map((item, index) => (
                  <div 
                    key={index}
                    className="expertise-card group relative"
                  >
                    <div className="relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-violet-500/30">
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      <div className="relative flex gap-3 sm:gap-4 lg:gap-5">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradient} p-[1px]`}>
                          <div className="w-full h-full rounded-lg sm:rounded-xl bg-zinc-900 flex items-center justify-center text-lg sm:text-xl lg:text-2xl">
                            {item.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-zinc-500 line-clamp-2">{item.desc}</p>
                          
                          {/* Skill tags */}
                          <div className="mt-2 sm:mt-3 lg:mt-4 flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
                            {item.skills.map((skill, i) => (
                              <span 
                                key={i}
                                className="skill-tag px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:border-violet-500/50 hover:text-white transition-all"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 4: CTA */}
          <div className="panel-4 absolute inset-0 flex items-center justify-center opacity-0">
            <div className="relative text-center px-4">
              {/* Orbit rings - scaled for mobile */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="orbit-ring absolute w-[160px] h-[160px] xs:w-[200px] xs:h-[200px] sm:w-[300px] sm:h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/20 rotate-slow" />
                <div className="orbit-ring absolute w-[220px] h-[220px] xs:w-[280px] xs:h-[280px] sm:w-[400px] sm:h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-500/15" style={{ animation: "spin 25s linear infinite reverse" }} />
                <div className="orbit-ring absolute w-[280px] h-[280px] xs:w-[350px] xs:h-[350px] sm:w-[500px] sm:h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 rotate-slow" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 p-[2px] pulse-glow">
                    <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
                      🤝
                    </div>
                  </div>
                </div>

                <h3 className="cta-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                  {"Let's Work".split("").map((char, i) => (
                    <span key={i} className="inline-block text-white">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                  <br />
                  {"Together".split("").map((char, i) => (
                    <span key={i} className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      {char}
                    </span>
                  ))}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg text-zinc-500 mb-6 sm:mb-8 lg:mb-10 max-w-md mx-auto px-2">
                  Ready to bring your vision to life? Let&apos;s create something amazing.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 lg:gap-x-10 gap-y-3 sm:gap-y-4">
                  <a 
                    href="#contact" 
                    className="cta-button group relative text-white font-medium text-base sm:text-lg lg:text-xl"
                  >
                    <span className="relative z-10">Get In Touch</span>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100" />
                    <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  <a 
                    href="/Azzeddine Hani Benchalel.pdf" 
                    download 
                    className="cta-button group relative text-zinc-400 font-medium text-base sm:text-lg lg:text-xl hover:text-zinc-200 transition-colors duration-200 flex items-center gap-1.5 sm:gap-2"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download CV</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-zinc-400 group-hover:w-full transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030305] to-transparent pointer-events-none" />
    </section>
  );
}
