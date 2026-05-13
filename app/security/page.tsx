import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import SecurityContent from '@/sections/SecurityContent';

export default function SecurityPage() {
  return (
    <main className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10">
        <SecurityContent />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}