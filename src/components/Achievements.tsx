"use client";

const achievements = [
  {
    title: "Top 15",
    subtitle: "Hackathon Finalist",
    description: "National level hackathon among top teams",
    icon: "🏆",
    highlight: true,
  },
  {
    title: "Top 50",
    subtitle: "Coding Competition",
    description: "Ranked among 2500+ participants",
    icon: "🥇",
    highlight: false,
  },
  {
    title: "1000+",
    subtitle: "GitHub Stars",
    description: "Open source contributions recognized",
    icon: "⭐",
    highlight: true,
  },
  {
    title: "500+",
    subtitle: "Community Members",
    description: "Founded a tech community",
    icon: "👥",
    highlight: false,
  },
];

const certifications = [
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
  { name: "React Developer", issuer: "Meta" },
  { name: "Full Stack Development", issuer: "Udemy" },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            Recognition
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Achievements & Impact</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hackathons, community building, and real-world impact through tech
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`relative gradient-border p-6 text-center group hover:glow transition-all duration-300 ${
                achievement.highlight ? "lg:transform lg:scale-105" : ""
              }`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{achievement.icon}</div>

              {/* Title */}
              <div className="text-3xl font-bold gradient-text mb-2">
                {achievement.title}
              </div>

              {/* Subtitle */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {achievement.subtitle}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">{achievement.description}</p>

              {/* Decorative corner */}
              {achievement.highlight && (
                <div className="absolute -top-1 -right-1 w-16 h-16 overflow-hidden">
                  <div className="absolute top-4 -right-4 w-20 h-6 bg-gradient-to-r from-violet-600 to-cyan-600 transform rotate-45 text-xs font-bold text-white flex items-center justify-center">
                    TOP
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="gradient-border p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            📜 Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{cert.name}</h4>
                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            📅 Journey Timeline
          </h3>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600 via-cyan-500 to-violet-600 hidden md:block" />

            {/* Timeline Items */}
            {[
              { year: "2024", title: "Senior Developer", desc: "Leading development teams" },
              { year: "2023", title: "Full Stack Developer", desc: "Building scalable applications" },
              { year: "2022", title: "Frontend Developer", desc: "Creating beautiful UIs" },
              { year: "2021", title: "Started Coding", desc: "The beginning of the journey" },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div className="gradient-border p-4 inline-block">
                    <span className="text-violet-400 font-mono text-sm">
                      {item.year}
                    </span>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 glow absolute left-1/2 -translate-x-1/2" />

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
