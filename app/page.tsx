import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import StarBackground from "@/components/StarBackground";
import ToggleTheme from "@/components/ToggleTheme";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* toogle theme */}
      {/* <ToggleTheme /> */}

      {/* background effects */}
      <StarBackground />

      {/* navbar */}
      <Navbar />

      {/* main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
    </div>
  );
}
