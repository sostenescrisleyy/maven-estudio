import { AnimatedBackground } from '@/components/ui/animated-background';
import { Instagram, Facebook, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { publicUrl } from '@/lib/utils';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/mavenestudio', label: 'Facebook', target: '_blank' },
  { icon: Instagram, href: 'https://www.instagram.com/mavenestudio?igsh=MXVhYWNlb2xjNjIzZw%3D%3D&utm_source=qr', label: 'Instagram', target: '_blank' },
  { icon: Globe, href: 'https://www.behance.net/mavenestdio', label: 'Behance', target: '_blank' },
  { icon: Mail, href: 'mailto:contato@mavenestudio.com.br', label: 'Email' },
];

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: t('footer.navigation'),
      links: [
        { label: t('nav.sobre'), href: '#sobre' },
        { label: t('nav.processo'), href: '#processo' },
        { label: t('nav.resultados'), href: '#resultados' },
        { label: t('testimonials.label'), href: '#depoimentos' },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { label: t('footer.identity'), href: '#contato' },
        { label: t('footer.redesign'), href: '#contato' },
        { label: t('footer.consulting'), href: '#contato' },
        { label: t('footer.naming'), href: '#contato' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.terms'), href: '/termos' },
        { label: t('footer.privacy'), href: '/privacidade' },
      ],
    },
  ];
  return (
    <footer className="pt-16 pb-8 border-t border-border relative overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="fade" delay={0}>
              <Link to="/" className="inline-block mb-6">
                <img
                  src={publicUrl('/logotipo.png')}
                  alt="Maven Estúdio"
                  className="h-10 w-auto"
                  loading="lazy"
                />
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6">
                {t('footer.description')}
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.target || '_self'}
                    rel={social.target === '_blank' ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all hover:bg-muted hover:scale-110"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Links */}
          {footerLinks.map((group, index) => (
            <ScrollReveal key={group.title} direction="fade" delay={index * 0.1}>
              <h4 className="font-medium mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom */}
        <ScrollReveal className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4" direction="fade" delay={0.2}>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Maven Estúdio. {t('footer.copyright')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('footer.madeBy')}
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
