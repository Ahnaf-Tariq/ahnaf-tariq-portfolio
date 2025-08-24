import React from "react";
import { BsArrowUp } from "react-icons/bs";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
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
              href="#"
              target="_blank"
              className="hover:text-primary cursor-pointer"
            >
              <FaLinkedin className="size-5" />
            </a>
            <a
              href="#"
              target="_blank"
              className="hover:text-primary cursor-pointer"
            >
              <FaGithub className="size-5" />
            </a>
            <a
              href="mailto:hello@gmail.com"
              target="_blank"
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
