import './App.css';
import {
  HeroSection,
  TryHackMeTracker,
  CapabilitiesSection,
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
      <main className="md:ml-20">
        <HeroSection />

        {/* TryHackMe Stats */}
        <section className="py-20 px-8 bg-obsidian">
          <div className="max-w-6xl mx-auto">
            <TryHackMeTracker />
          </div>
        </section>

        {/* Capabilities & Skills */}
        <CapabilitiesSection />

        {/* Credentials */}
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
