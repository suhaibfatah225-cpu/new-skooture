import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Traction from '../components/Traction';
import Legacy from '../components/Legacy';
import WhySection from '../components/WhySection';
import BentoFeatures from '../components/BentoFeatures';
import GlobalPresence from '../components/GlobalPresence';
import AICore from '../components/AICore';
import TopFeatures from '../components/TopFeatures';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-500/30 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Traction />
        <Legacy />
        <WhySection />
        <BentoFeatures />
        <GlobalPresence />
        <AICore />
        <TopFeatures />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
