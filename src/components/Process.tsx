import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal, ParallaxSection } from '@/components/ui/scroll-reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Process() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const steps = [
    {
      icon: '🎯',
      title: t('process.step1'),
      description: t('process.step1Desc'),
    },
    {
      icon: '🧭',
      title: t('process.step2'),
      description: t('process.step2Desc'),
    },
    {
      icon: '✨',
      title: t('process.step3'),
      description: t('process.step3Desc'),
    },
    {
      icon: '👁️',
      title: t('process.step4'),
      description: t('process.step4Desc'),
    },
    {
      icon: '🔧',
      title: t('process.step5'),
      description: t('process.step5Desc'),
    },
    {
      icon: '📦',
      title: t('process.step6'),
      description: t('process.step6Desc'),
    },
  ];
  return (
    <section id="processo" className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="fade" className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            {t('process.label')}
          </span>
          <h2 className="text-section max-w-2xl mx-auto">
            {t('process.title')}{' '}
            <span className="text-gradient">{t('process.titleHighlight')}</span>
          </h2>
        </ScrollReveal>

        <ParallaxSection speed={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <ScrollReveal
                key={step.title}
                direction="scale"
                delay={index * 0.08}
                threshold={0.2}
              >
                <div className="group relative p-8 rounded-2xl bg-card border border-border card-hover shine-effect h-full">
                  {/* Step number */}
                  <span className="absolute top-6 right-6 text-6xl text-foreground/5 group-hover:text-foreground/10 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon with rotation on hover */}
                  <div className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {step.icon}
                  </div>

                  <h3 className="text-xl mb-3 relative z-10">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ParallaxSection>

        <div className="mt-16 flex justify-center w-full">
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
