"use client";
import React from "react";
import { BsArrowUp } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  const handleMailClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // gmail url
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=ahnafhamid7@gmail.com";

    const newWindow = window.open(gmailUrl, "_blank");

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      window.location.href = "mailto:ahnafhamid7@gmail.com";
    }
  };
  return (
    <footer className="py-6 px-4 bg-card relative border-t border-border mt-8">
      <div className="container flex flex-wrap justify-between items-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} M.Ahnaf Tariq.co. All rights
          reserved.
        </p>
        <div className="flex items-center gap-5">
          <div className="flex gap-2 sm:gap-4">
            <a
              href="https://www.linkedin.com/in/ahnaf-tariq-702054362/"
              target="_blank"
              className="hover:text-primary cursor-pointer"
            >
              <FaLinkedin className="size-5" />
            </a>
            <a
              href="https://github.com/Ahnaf-Tariq"
              target="_blank"
              className="hover:text-primary cursor-pointer"
            >
              <FaGithub className="size-5" />
            </a>
            <a
              href="mailto:ahnafhamid7@gmail.com"
              onClick={handleMailClick}
              className="hover:text-primary cursor-pointer"
            >
              <IoMdMail className="size-5" />
            </a>
          </div>
          <a
            href="#hero"
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <BsArrowUp size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
