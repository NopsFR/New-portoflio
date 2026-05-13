import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import THMProgress from '@/sections/THMProgress';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <THMProgress />
        <Contact />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
