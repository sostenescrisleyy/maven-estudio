import { useMemo } from 'react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal, ParallaxSection } from '@/components/ui/scroll-reveal';
import { Layers, Target, Eye, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function About() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const features = useMemo(() => [
    {
      icon: Target,
      title: t('about.strategy'),
      description: t('about.strategyDesc'),
    },
    {
      icon: Layers,
      title: t('about.consistency'),
      description: t('about.consistencyDesc'),
    },
    {
      icon: Eye,
      title: t('about.differentiation'),
      description: t('about.differentiationDesc'),
    },
    {
      icon: Heart,
      title: t('about.connection'),
      description: t('about.connectionDesc'),
    },
  ], [t, language]);
  return (
    <section id="sobre" className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <AnimatedBackground />
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-maven-surface to-transparent opacity-50 blur-3xl z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <ParallaxSection speed={0.15}>
            <div>
              <ScrollReveal direction="fade" delay={0} threshold={0.3}>
                <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                  {t('about.label')}
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.05} threshold={0.3}>
                <h2 className="text-section mb-8 md:mb-10">
                  {t('about.title')}{' '}
                  <span className="text-gradient">{t('about.titleHighlight')}</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.1} threshold={0.3}>
                <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                  {t('about.description1')}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.15} threshold={0.3}>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {t('about.description2')}
                </p>
              </ScrollReveal>
            </div>
          </ParallaxSection>

          {/* Right content - Features grid */}
          <ParallaxSection speed={-0.1}>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-stretch">
              {features.map((feature, index) => (
                <ScrollReveal
                  key={`${feature.title}-${language}-${index}`}
                  direction="scale"
                  delay={index * 0.05}
                  threshold={0.2}
                  className="h-full"
                >
                  <div className="p-5 md:p-6 lg:p-8 rounded-2xl bg-card border border-border card-hover shine-effect group h-full flex flex-col">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 md:mb-8 transition-transform duration-500 group-hover:rotate-12 flex-shrink-0">
                      <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
                    </div>
                    <h3 className="text-lg md:text-xl mb-3 md:mb-4 flex-shrink-0 font-semibold">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ParallaxSection>
        </div>
      </div>

      <div className="mt-16 flex justify-center w-full">
        <Button
          onClick={() => navigate('/contato')}
          className="rounded-full px-8 py-6 text-lg group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
        >
          {t('hero.cta')} <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
