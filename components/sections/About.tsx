import React from "react";
import { FaCode, FaLightbulb, FaRocket } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 relative">
      {" "}
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate Web Developer & Tech Creator
            </h3>

            <p className="text-muted-foreground">
              With over 2 years of experience in web development, I specialize
              in creating responsive, accessible, and performant web
              applications using modern technologies.
            </p>

            <p className="text-muted-foreground">
              I enjoy turning complex challenges into simple, elegant solutions
              while continuously exploring new tools and practices to stay ahead
              in the fast-moving world of web development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="/Ahnaf-Tariq-Resume.pdf"
                target="_blank"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                View Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <FaCode className="size-5 sm:size-6 text-primary" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-semibold text-lg">Web Development</h4>
                  <p className="text-muted-foreground">
                    Creating responsive websites and web applications with
                    modern frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <FaLightbulb className="size-5 sm:size-6 text-primary" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-semibold text-lg">Problem Solving</h4>
                  <p className="text-muted-foreground">
                    Turning complex challenges into simple, efficient solutions
                    through logical thinking and clean code.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <FaRocket className="size-5 sm:size-6 text-primary" />
                </div>

                <div className="text-left space-y-1">
                  <h4 className="font-semibold text-lg">Continuous Learning</h4>
                  <p className="text-muted-foreground">
                    Always exploring new tools, frameworks, and techniques to
                    stay sharp and ahead in the ever-evolving web landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
