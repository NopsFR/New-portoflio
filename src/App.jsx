import './App.css';
import {
  HeroSection,
  TryHackMeTracker,
  TechArsenal,
  AchievementGallery,
  SideNav,
  ScanlineOverlay,
  GridBackground,
  Footer,
} from './components/cipher';

function App() {
  return (
    <div className="bg-obsidian text-white overflow-x-hidden">
      {/* Background Elements */}
      <GridBackground />
      <ScanlineOverlay />

      {/* Main Content */}
      <main className="mr-16">
        <HeroSection />

        {/* TryHackMe Stats */}
        <section className="py-20 px-8 bg-obsidian">
          <div className="max-w-6xl mx-auto">
            <TryHackMeTracker />
          </div>
        </section>

        {/* Skills Arsenal */}
        <TechArsenal />

        {/* Achievements */}
        <AchievementGallery />
      </main>

      {/* Navigation */}
      <SideNav />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
