import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
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
      </main>
    </div>
  );
}
