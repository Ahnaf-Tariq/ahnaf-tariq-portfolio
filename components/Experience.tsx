import React from "react";
import { FaReact, FaUsers, FaCodeBranch } from "react-icons/fa";

const Experience = () => {
  const skills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "Frontend Development",
    "Team Collaboration",
  ];
  return (
    <section id="experience" className="py-20 px-4 relative bg-secondary/30">
      <div className="container max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Experience</span>
        </h2>

        {/* Card */}
        <div className="gradient-border p-6 sm:p-8 rounded-xl bg-card shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mb-6">
            <img
              src="/getweys-logo.webp"
              alt="Getweys Logo"
              className="size-16 sm:size-20 rounded-lg object-contain bg-white p-1"
            />
            <div className="flex flex-col md:flex-row justify-between items-start sm:container gap-4 md:gap-2">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  Frontend Developer Intern
                </h3>
                <p className="text-primary text-lg font-medium">Getweys</p>
                <p className="text-muted-foreground text-sm">
                  Karachi, Sindh, Pakistan{" "}
                  <span className="text-primary">· On-site</span>
                </p>
                <p className="text-sm font-medium mt-1">
                  August 2025 - Present
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-500">
                  Currently Working
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">
            Working as a Frontend Developer Intern at Getweys, contributing to
            scalable and modern web applications while gaining hands-on
            experience with cutting-edge technologies.
          </p>

          {/* Responsibilities */}
          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-lg">
              Key Responsibilities & Achievements:
            </h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                Developing responsive and user-friendly interfaces using{" "}
                <span className="font-medium">
                  React.js, Next.js, and TypeScript.
                </span>
              </li>
              <li>
                Styling applications with{" "}
                <span className="font-medium">Tailwind CSS</span> for modern UI.
              </li>
              <li>
                Collaborating with senior developers to implement quality UIs
                and assist in backend integration with{" "}
                <span className="font-medium">MongoDB</span>.
              </li>
              <li>
                Writing clean, reusable, and maintainable code following best
                practices.
              </li>
              <li>
                Participating in code reviews and knowledge-sharing sessions.
              </li>
              <li>
                Learning and applying new technologies in an agile environment.
              </li>
            </ul>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-1 rounded-full text-sm bg-primary/10 text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
