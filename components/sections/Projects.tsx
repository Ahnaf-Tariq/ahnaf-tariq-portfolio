import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";

const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description:
      "A full-stack e-commerce platform with frontend, backend, and admin panel, featuring product management, add-to-cart, order management, and secure Stripe payment integration",
    image: "/projects/picture1.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe"],
    liveUrl: "https://e-commerce-frontend-cyan-seven.vercel.app/",
    githubUrl: "https://github.com/Ahnaf-Tariq/E-commerce-mern-website",
  },
  {
    id: 2,
    title: "Food Delivery Website",
    description:
      "A complete food delivery web application with frontend, backend, and admin panel for managing restaurants, menus, and orders.",
    image: "/projects/picture2.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/Ahnaf-Tariq/FoodDelivery-mern-website",
  },
  {
    id: 3,
    title: "Real Time Chat App",
    description:
      "A fully real-time chat application built with Next.js and Firebase, featuring instant messaging, authentication, and responsive UI.",
    image: "/projects/picture3.png",
    tags: ["Next.js", "TailwindCSS", "Firebase"],
    liveUrl: "https://echo-chat-app-next.vercel.app/",
    githubUrl: "https://github.com/Ahnaf-Tariq/EchoChatApp-next",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={300}
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full text-xs font-medium border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex space-x-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <TbExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/Ahnaf-Tariq"
          >
            My Github <BsArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
