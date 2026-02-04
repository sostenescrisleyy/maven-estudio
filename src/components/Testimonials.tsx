import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal, ParallaxSection } from '@/components/ui/scroll-reveal';
import { Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    text: 'A implementação do CRM e automação de vendas da Maven transformou nosso comercial. Economizamos horas diárias e dobrou nossa taxa de conversão.',
    name: 'Ana Paula Silva',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    text: 'Excelente trabalho de branding combinado com estratégias de tráfego pago. A Maven entende como conectar marca e performance.',
    name: 'Roberto Mendes',
    role: 'Diretor de Marketing, Innovate',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    text: 'Os chatbots com IA que desenvolveram atendem nossos clientes 24/7 com uma naturalidade incrível. A satisfação do cliente subiu drasticamente.',
    name: 'Juliana Costa',
    role: 'Fundadora, GreenLife',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    text: 'Profissionais completos. Criaram nossa loja virtual e hoje gerenciam todo nosso ecossistema de marketing com dados precisos.',
    name: 'Carlos Eduardo',
    role: 'CEO, Nexus Digital',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    text: 'A consultoria de CRM foi um divisor de águas. Finalmente temos visibilidade total do nosso pipeline de vendas e relatórios confiáveis.',
    name: 'Marina Santos',
    role: 'Diretora Comercial, Artisan',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
  {
    text: 'Do redesign da marca à estratégia de conteúdo nas redes sociais, tudo funciona em sintonia. Uma agência que realmente entrega 360º.',
    name: 'Fernando Lima',
    role: 'Sócio, Legal Partners',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border card-hover group mb-6">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground/90 mb-6 leading-relaxed">"{testimonial.text}"</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="font-medium text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Split testimonials into columns
  const column1 = testimonials.slice(0, 2);
  const column2 = testimonials.slice(2, 4);
  const column3 = testimonials.slice(4, 6);

  return (
    <section id="depoimentos" className="py-12 md:py-24 lg:py-32 overflow-hidden relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="fade" className="text-center mb-8 md:mb-12 lg:mb-16">
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            {t('testimonials.label')}
          </span>
          <h2 className="text-section max-w-2xl mx-auto">
            {t('testimonials.title')}{' '}
            <span className="text-gradient">{t('testimonials.titleHighlight')}</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-hidden">
            {/* Column 1 */}
            <div className="space-y-0">
              <div className="animate-scroll" style={{ animationDuration: '25s' }}>
                {[...column1, ...column1].map((testimonial, i) => (
                  <TestimonialCard key={`col1-${i}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-0 hidden md:block">
              <div className="animate-scroll" style={{ animationDuration: '30s', animationDelay: '-5s' }}>
                {[...column2, ...column2].map((testimonial, i) => (
                  <TestimonialCard key={`col2-${i}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-0 hidden lg:block">
              <div className="animate-scroll" style={{ animationDuration: '28s', animationDelay: '-10s' }}>
                {[...column3, ...column3].map((testimonial, i) => (
                  <TestimonialCard key={`col3-${i}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center w-full relative z-20">
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
