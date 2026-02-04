import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal, ParallaxSection } from '@/components/ui/scroll-reveal';
import { Counter } from '@/components/ui/counter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Stats() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    { number: 50, suffix: '+', label: t('stats.projects') },
    { number: 98, suffix: '%', label: t('stats.satisfaction') },
    { number: 100, suffix: '%', label: t('stats.clients') },
    { number: 5, suffix: '+', label: t('stats.years') },
  ];
  return (
    <section id="resultados" className="py-12 md:py-24 lg:py-32 bg-card-secondary relative overflow-hidden">
      <AnimatedBackground />
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-foreground/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-foreground/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="fade" className="text-center mb-8 md:mb-12 lg:mb-16" threshold={0.3}>
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            {t('stats.label')}
          </span>
          <h2 className="text-section max-w-2xl mx-auto">
            {t('stats.title')}{' '}
            <span className="text-gradient">{t('stats.titleHighlight')}</span>
          </h2>
        </ScrollReveal>

        <ParallaxSection speed={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                direction="up"
                delay={index * 0.1}
                threshold={0.2}
              >
                <div className="text-center group">
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110">
                    <Counter
                      target={stat.number}
                      suffix={stat.suffix}
                      className="text-gradient"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ParallaxSection>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12">
        <div className="flex justify-center w-full">
          <Button
            onClick={() => navigate('/contato')}
            className="rounded-full px-8 py-6 text-lg group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            {t('hero.cta')} <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
