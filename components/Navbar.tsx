"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import ToggleTheme from "./ToggleTheme";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState(navItems[0].href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "fixed w-full py-5 z-40 transition-all duration-300",
        isScrolled && "bg-background/80 backdrop-blur-md shadow-xs"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> M.Ahnaf </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden sm:flex space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setActiveNavLink(item.href)}
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors duration-300",
                activeNavLink === item.href && "text-primary"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile nav */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="sm:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <RxCross2 size={24} /> : <IoIosMenu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed h-[100dvh] top-0 left-0 w-full bg-background/95 z-40 flex flex-col items-center pt-24",
            "transition-all duration-300 sm:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden sm:block">
          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
