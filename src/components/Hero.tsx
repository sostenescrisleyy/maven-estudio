import NeuralNetworkHero from '@/components/ui/neural-network-hero';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <NeuralNetworkHero
      title={t('hero.title')}
      titleHighlight={t('hero.titleHighlight')}
      description={t('hero.subtitle')}
      ctaButtons={[
        { text: t('hero.cta'), href: "#contato", primary: true },
        { text: t('hero.ctaSecondary'), href: "/servicos" }
      ]}
    />
  );
}
