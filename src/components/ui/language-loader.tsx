import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const loadingTexts = {
  pt: 'Carregando idioma...',
  en: 'Loading language...',
  es: 'Cargando idioma...',
};

export function LanguageLoader() {
  const { isLoading, language } = useLanguage();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-md flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <Loader2 className="w-6 h-6 animate-spin text-foreground" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground font-medium"
            >
              {loadingTexts[language]}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

