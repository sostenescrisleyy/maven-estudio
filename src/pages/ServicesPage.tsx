
import { Header } from '@/components/Header';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { LetsWorkTogether } from '@/components/ui/lets-work-section';

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-20">
                <Services />
                <Process />
                <Testimonials />
                <LetsWorkTogether />
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;
