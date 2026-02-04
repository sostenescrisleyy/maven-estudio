import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Stats } from '@/components/Stats';
import { Testimonials } from '@/components/Testimonials';
import { Portfolio } from '@/components/Portfolio';
import { Videomaker } from '@/components/Videomaker';

import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { LetsWorkTogether } from '@/components/ui/lets-work-section';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Videomaker />
        <Process />
        <Stats />
        <Testimonials />
        <FAQ />
        <LetsWorkTogether />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
