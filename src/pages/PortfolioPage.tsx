
import { Header } from '@/components/Header';
import { Portfolio } from '@/components/Portfolio';
import { Footer } from '@/components/Footer';
import { LetsWorkTogether } from '@/components/ui/lets-work-section';

const PortfolioPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-20">
                <Portfolio />
                <LetsWorkTogether />
            </main>
            <Footer />
        </div>
    );
};

export default PortfolioPage;
