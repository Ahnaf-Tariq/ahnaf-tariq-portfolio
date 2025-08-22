"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BiMoon } from "react-icons/bi";
import { IoSunnyOutline } from "react-icons/io5";

export const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed max-sm:hidden top-[13px] right-5 z-50 p-2 rounded-full cursor-pointer transition-colors duration-300",
        "focus:outline-hidden"
      )}
    >
      {isDarkMode ? (
        <IoSunnyOutline className="size-6 text-yellow-300" />
      ) : (
        <BiMoon className="size-6 text-blue-900" />
      )}
    </button>
  );
};
export default ToggleTheme;
