import { useState } from 'react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FAQItemType {
  question: string;
  answer: string;
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItemType;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group transition-all hover:translate-x-1"
      >
        <span className="text-lg pr-8">{faq.question}</span>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center transition-colors group-hover:bg-muted">
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const { t, translations } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const faqs = translations?.faq?.questions || [];

  return (
    <section id="faq" className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left content - Sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ScrollReveal direction="fade" delay={0} threshold={0.3}>
              <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                {t('faq.label')}
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.05} threshold={0.3}>
              <h2 className="text-section mb-6">
                {t('faq.title')}{' '}
                <span className="text-gradient">{t('faq.titleHighlight')}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} threshold={0.3}>
              <p className="text-muted-foreground text-lg mb-8">
                {t('faq.description')}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15} threshold={0.3}>
              <Button
                onClick={() => navigate('/contato')}
                className="mt-4 rounded-full px-6 py-5 text-base shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
              >
                {t('hero.cta')} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </ScrollReveal>
          </div>

          {/* Right content - FAQ list */}
          <ScrollReveal direction="right" delay={0.1} threshold={0.2}>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} direction="fade" delay={index * 0.05} threshold={0.2}>
                  <FAQItem
                    faq={faq}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
