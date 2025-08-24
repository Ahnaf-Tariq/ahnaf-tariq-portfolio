import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import StarBackground from "@/components/StarBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* background effects */}
      <StarBackground />

      {/* navbar */}
      <Navbar />

      {/* main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}
