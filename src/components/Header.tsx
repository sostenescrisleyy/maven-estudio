import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { publicUrl } from '@/lib/utils';

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('nav.sobre'), href: '/sobre', key: 'sobre' },
    { label: t('nav.servicos'), href: '/servicos', key: 'servicos' },
    { label: t('nav.processo'), href: '/#processo', key: 'processo' }, /* Process is only on home? Or maybe Services page? Kept as anchor or pointing to Services page could be better. Let's redirect specific sections to pages or keep logical flow. User asked for specific pages. */
    { label: t('nav.portfolio'), href: '/portfolio', key: 'portfolio' },
    { label: t('nav.faq'), href: '/#faq', key: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-3 md:pt-6">
        <div className="container mx-auto px-4 md:px-6 flex justify-center">
          {/* Navigation Bar with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              flex items-center justify-between
              rounded-full
              px-3 md:px-5
              h-14 md:h-16
              backdrop-blur-xl
              border border-white/10
              transition-all duration-300
              max-w-4xl w-full
              ${isScrolled
                ? 'bg-background/60 shadow-lg shadow-black/20'
                : 'bg-background/40'
              }
            `}
          >
            {/* Logo */}
            <Link to="/" className="relative z-10 flex items-center flex-shrink-0">
              <img
                src={publicUrl('/logotipo.png')}
                alt="Maven Estúdio"
                className="h-6 md:h-8 w-auto"
                loading="eager"
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <LanguageSelector />
              <Button
                size="sm"
                className="rounded-full bg-white text-black hover:bg-white/90 transition-colors"
                asChild
              >
                <Link to="/contato">{t('nav.fazerOrcamento')}</Link>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2 flex-shrink-0">
              <LanguageSelector variant="mobile-compact" />
              <button
                className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xl md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-start h-full gap-6 pt-32 overflow-y-auto pb-10"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl text-foreground hover:text-foreground/80 transition-colors font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex flex-col items-center gap-4 w-full max-w-xs"
              >
                <LanguageSelector variant="mobile" />
                <Button
                  size="lg"
                  className="rounded-full bg-white text-black hover:bg-white/90 transition-colors w-full"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/contato">{t('nav.fazerOrcamento')}</Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
