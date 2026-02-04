import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const languages = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

interface LanguageSelectorProps {
  showFullLabel?: boolean;
  variant?: 'desktop' | 'mobile' | 'mobile-compact';
}

export function LanguageSelector({ showFullLabel = false, variant = 'desktop' }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((lang) => lang.code === language) || languages[0];

  if (variant === 'mobile-compact') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-1.5 px-2 py-2 rounded-full hover:bg-foreground/10 transition-colors"
            aria-label="Select language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-base">{currentLang.flag}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'pt' | 'en' | 'es');
                setIsOpen(false);
              }}
              className="flex items-center justify-between cursor-pointer py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang.flag}</span>
                <span className="text-base">{lang.label}</span>
              </div>
              {language === lang.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'mobile') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-foreground/10 transition-colors text-base font-medium w-full justify-center"
            aria-label="Select language"
          >
            <Globe className="w-5 h-5" />
            <span className="text-xl">{currentLang.flag}</span>
            <span>{currentLang.label}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'pt' | 'en' | 'es');
                setIsOpen(false);
              }}
              className="flex items-center justify-between cursor-pointer py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang.flag}</span>
                <span className="text-base">{lang.label}</span>
              </div>
              {language === lang.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-foreground/10 transition-colors text-sm font-medium"
          aria-label="Select language"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.flag}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code as 'pt' | 'en' | 'es');
              setIsOpen(false);
            }}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </div>
            {language === lang.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

