import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useLanguage } from '@/contexts/LanguageContext';

const videos = [
  {
    id: 'oj1XPGyVMKo',
    title: 'Cinematic Video 1'
  },
  {
    id: 'Y_tFPMPCn_M',
    title: 'Cinematic Video 2'
  },
  {
    id: 'S5JIm46GCvw',
    title: 'Cinematic Video 3'
  },
  {
    id: '3nmAn0_v71I',
    title: 'Cinematic Video 4'
  }
];

export function Videomaker() {
  const { t } = useLanguage();

  return (
    <section id="videomaker" className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="fade" className="text-center mb-16 md:mb-24">
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            {t('videomaker.label')}
          </span>
          <h2 className="text-section max-w-2xl mx-auto mb-4">
            {t('videomaker.title')}{' '}
            <span className="text-gradient">{t('videomaker.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('videomaker.description')}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {videos.map((video, index) => (
            <ScrollReveal
              key={video.id}
              direction="up"
              delay={index * 0.1}
              className="group relative aspect-video rounded-2xl overflow-hidden border border-border/50 bg-card shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-muted/20 animate-pulse z-0" />
              <iframe
                className="absolute inset-0 w-full h-full z-10"
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
