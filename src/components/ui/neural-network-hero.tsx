'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from '@/components/ui/animated-background';

gsap.registerPlugin(useGSAP);

// ===================== HERO =====================
interface NeuralNetworkHeroProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
}

export default function NeuralNetworkHero({
  title = "Transforme sua marca em",
  titleHighlight = "referência de mercado",
  description = "Agência 360º especialista em Marketing Digital, Identidade Visual, Automação, CRM e Inteligência Artificial para escalar seu negócio.",
  ctaButtons = [
    { text: "Fazer orçamento", href: "#contato", primary: true },
    { text: "Ver portfólio", href: "#portfolio" }
  ]
}: NeuralNetworkHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;
      const fontsReady =
        typeof document !== 'undefined' && (document as any).fonts?.ready
          ? (document as any).fonts.ready
          : Promise.resolve();

      fontsReady.then(() => {
        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        tl.fromTo(
          headerRef.current,
          {
            filter: 'blur(16px)',
            y: 30,
            autoAlpha: 0,
            scale: 1.02,
          },
          {
            filter: 'blur(0px)',
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
          },
          0.1,
        );

        if (paraRef.current) {
          tl.to(paraRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.55');
        }
        if (ctaRef.current) {
          tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.35');
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-32 md:pt-32 pb-24 md:pb-0"
    >
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <h1
          ref={headerRef}
          className="font-heading text-[1.75rem] md:text-hero font-extrabold leading-[1.1] tracking-tight mb-6 md:mb-6 max-w-5xl mx-auto opacity-0"
        >
          <span className="block">{title}</span>
          <span className="block text-gradient">{titleHighlight}</span>
        </h1>

        <p
          ref={paraRef}
          className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed opacity-0"
        >
          {description}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 opacity-0"
        >
          {ctaButtons.map((button, index) => (
            <Button
              key={index}
              variant={button.primary ? 'default' : 'outline'}
              size="lg"
              className={button.primary ? 'group' : ''}
              asChild
            >
              <a href={button.href}>
                {button.text}
                {button.primary && (
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </a>
            </Button>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative mt-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2 mx-auto"
          >
            <motion.div className="w-1 h-2 rounded-full bg-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
