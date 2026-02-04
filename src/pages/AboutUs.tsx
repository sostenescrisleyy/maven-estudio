
import { Header } from '@/components/Header';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { Stats } from '@/components/Stats';
import { LetsWorkTogether } from '@/components/ui/lets-work-section';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-20">
                <About />
                <Stats />
                <LetsWorkTogether />
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
