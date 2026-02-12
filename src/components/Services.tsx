
import { useMemo } from 'react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal, ParallaxSection } from '@/components/ui/scroll-reveal';
import {
    Palette,
    Globe,
    TrendingUp,
    Database,
    Bot,
    FileText,
    ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Services() {
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    const services = useMemo(() => [
        {
            icon: Palette,
            title: "Identidade Visual",
            description: "Criação de marcas memoráveis e identidades visuais completas que transmitem a essência do seu negócio.",
            features: ["Logotipos", "Manual da Marca", "Papelaria", "Social Media Kits"]
        },
        {
            icon: Globe,
            title: "Web Development",
            description: "Sites de alta performance, Landing Pages de alta conversão, Blogs e Lojas Virtuais completas.",
            features: ["Landing Pages", "Sites Institucionais", "E-commerce", "Blogs Otimizados"]
        },
        {
            icon: TrendingUp,
            title: "Tráfego Pago",
            description: "Gestão estratégica de campanhas no Google Ads, Meta Ads e outras plataformas para maximizar seu ROI.",
            features: ["Google Ads", "Facebook & Instagram Ads", "LinkedIn Ads", "Remarketing"]
        },
        {
            icon: Database,
            title: "CRM & Vendas",
            description: "Implementação e gestão de CRM próprio com automação de vendas, pipelines otimizados e relatórios detalhados.",
            features: ["Configuração de CRM", "Automação de Vendas", "Pipelines Customizados", "Relatórios de Performance"]
        },
        {
            icon: Bot,
            title: "Automação & IA",
            description: "Soluções avançadas com Chatbots, automação de WhatsApp e Inteligência Artificial conversacional.",
            features: ["Chatbots", "Automação WhatsApp", "Workflows Inteligentes", "IA Conversacional"]
        },
        {
            icon: FileText,
            title: "Produção de Conteúdo",
            description: "Estratégia completa de conteúdo: posts para redes sociais, copy persuasiva para anúncios e artigos para blog.",
            features: ["Social Media", "Copywriting", "E-mail Marketing", "Blog Posts"]
        }
    ], []);

    return (
        <section id="servicos" className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-background/50 w-full max-w-full">
            <AnimatedBackground />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <ScrollReveal direction="fade" threshold={0.3}>
                        <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            O que fazemos
                        </span>
                        <h2 className="text-section mb-6">
                            Nossas <span className="text-gradient">Soluções</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Uma suíte completa de serviços para impulsionar seu negócio em todas as frentes digitais.
                        </p>
                    </ScrollReveal>
                </div>

                <ParallaxSection speed={0.05}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <ScrollReveal
                                key={index}
                                direction="up"
                                delay={index * 0.1}
                                threshold={0.1}
                                className="h-full"
                            >
                                <div className="group h-full p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <service.icon className="w-6 h-6 text-primary" />
                                        </div>

                                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                        <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>

                                        <ul className="space-y-2 mt-auto">
                                            {service.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center text-sm text-foreground/70">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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
