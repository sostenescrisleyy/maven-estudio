
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal, ParallaxSection } from '@/components/ui/scroll-reveal';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { publicUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 'maven-estudio-web',
    title: 'Maven Estúdio Website',
    cover: '/maven-estudio-site.png',
    description: 'Website oficial do estúdio com design moderno, animações interativas e alta performance',
    category: 'Web Design',
    type: 'web',
    imagePosition: 'object-top'
  },
  {
    id: 'kyven-figure',
    title: 'Kyven Figure Store',
    cover: '/kyven-figure-loja.png',
    description: 'E-commerce completo e imersivo para loja de colecionáveis e action figures',
    category: 'Web Design',
    type: 'web',
    externalLink: 'https://kyvenfigure.com.br',
    imagePosition: 'object-top'
  },
  {
    id: 'natulife-store',
    title: 'Natu Life Store',
    cover: '/natulife-loja.png',
    description: 'E-commerce com design clean e foco na experiência de compra natural',
    category: 'Web Design',
    type: 'web',
    externalLink: 'https://natulife.com.br',
    imagePosition: 'object-top'
  },
  {
    id: 'acontece-blog',
    title: 'Acontece Goiás Blog',
    cover: '/acontece-blog.png',
    externalLink: 'https://acontecegoias.com.br',
    description: 'Portal de notícias e conteúdo dinâmico com foco em retenção de leitura',
    category: 'Web Design',
    type: 'web',
    imagePosition: 'object-top'
  },
  {
    id: 'saia-da-sala',
    title: 'Saia da Sala Blog',
    cover: '/saia-da-sala-blog.png',
    externalLink: 'https://saiadasala.com.br',
    description: 'Blog educacional e lifestyle com design moderno e responsivo',
    category: 'Web Design',
    type: 'web',
    imagePosition: 'object-top'
  },
  {
    id: 'surf-cabeleireiro',
    title: 'Surf Cabeleireiro',
    cover: '/surf-cabeleireiro-agendamento.png',
    externalLink: 'https://surfcabeleireiro.com.br',
    description: 'Página de apresentação moderna com sistema de agendamento online integrado',
    category: 'Web Design',
    type: 'web',
    imagePosition: 'object-top'
  },
  {
    id: 'lealdino',
    title: 'Lealdino Jorge',
    cover: '/lealdino-jorge.png',
    description: 'Identidade visual completa para consultor e responsável por consórcios',
    category: 'Branding',
    type: 'branding'
  },
  {
    id: 'maven-estudio',
    title: 'Maven Estúdio',
    cover: '/maven-estudio.png',
    description: 'Rebranding estratégico para estúdio de design',
    category: 'Branding',
    type: 'branding'
  },
  {
    id: 'natulife',
    title: 'Natu Life Branding',
    cover: '/natu-life.png',
    description: 'Identidade visual para marca de cosméticos 100% veganos e naturais',
    category: 'Branding',
    type: 'branding'
  },
];

export function Portfolio() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const sections = [
    { id: 'branding', label: 'Identidade Visual / Branding' },
    { id: 'web', label: 'Web Design & Desenvolvimento' }
  ];

  return (
    <section id="portfolio" className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="fade" className="text-center mb-16 md:mb-24">
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            {t('portfolio.label')}
          </span>
          <h2 className="text-section max-w-2xl mx-auto mb-4">
            {t('portfolio.title')}{' '}
            <span className="text-gradient">{t('portfolio.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('portfolio.description')}
          </p>
        </ScrollReveal>

        <div className="space-y-24 md:space-y-32">
          {sections.map((section) => (
            <div key={section.id} className="space-y-8 md:space-y-12">
              <ScrollReveal direction="left" className="flex items-center gap-4 mb-8">
                <div className="h-[1px] bg-gradient-to-r from-primary/50 to-transparent w-12 md:w-24" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {section.label}
                </h3>
                <div className="h-[1px] bg-gradient-to-l from-primary/50 to-transparent flex-1" />
              </ScrollReveal>

              <ParallaxSection speed={0.05}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {projects
                    .filter(p => p.type === section.id)
                    .map((project, index) => (
                      <ScrollReveal
                        key={project.id}
                        direction="up"
                        delay={index * 0.1}
                        threshold={0.1}
                      >
                        <div
                          onClick={() => project.externalLink ? window.open(project.externalLink, '_blank') : navigate(`/portfolio/${project.id}`)}
                          className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col"
                        >
                          {/* Image Container */}
                          <div className={cn(
                            "relative overflow-hidden bg-muted overflow-hidden",
                            project.type === 'web' ? "aspect-[4/3]" : "aspect-[16/10]"
                          )}>
                            <img
                              src={publicUrl(project.cover)}
                              alt={project.title}
                              className={cn(
                                "w-full h-full object-cover transition-all duration-700",
                                project.imagePosition || 'object-center',
                                project.type === 'web' ? "group-hover:scale-100 group-hover:object-bottom transition-all duration-[3s] ease-in-out" : "group-hover:scale-105"
                              )}
                              loading="lazy"
                              decoding="async"
                            />
                            {/* Overlay Gradient - Lighter for web to see details */}
                            <div className={cn(
                              "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-500",
                              project.type === 'web' ? "opacity-0 group-hover:opacity-0" : "opacity-60 group-hover:opacity-40"
                            )} />

                            {/* External Link Icon Overlay */}
                            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                              <ArrowRight className="w-4 h-4 text-foreground -rotate-45" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 relative flex flex-col flex-grow bg-card/50 backdrop-blur-sm">
                            <div className="mb-4">
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-3">
                                {project.category}
                              </span>
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                {project.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-border/50 flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                              {t('portfolio.viewProject')}
                              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                </div>
              </ParallaxSection>
            </div>
          ))}
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
