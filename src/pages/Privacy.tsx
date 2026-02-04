import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 md:pt-32 relative overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <ScrollReveal direction="fade" className="mb-12">
            <button
              onClick={() => window.history.back()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-flex items-center"
            >
              ← Voltar
            </button>
            <h1 className="text-4xl md:text-5xl mb-4">Política de Privacidade</h1>
            <p className="text-muted-foreground text-lg">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </ScrollReveal>

          <div className="prose prose-invert max-w-none space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Maven Estúdio ("nós", "nosso" ou "empresa") respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você visita nosso site.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <section>
                <h2 className="text-2xl font-bold mb-4">2. Informações que Coletamos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Podemos coletar as seguintes informações pessoais quando você interage com nosso site:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Número de telefone/WhatsApp</li>
                  <li>Nome da empresa</li>
                  <li>Informações sobre seu projeto (quando você preenche nosso formulário de contato)</li>
                  <li>Dados de navegação e cookies</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Como Usamos suas Informações</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Utilizamos suas informações pessoais para os seguintes fins:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Responder às suas solicitações e entrar em contato sobre nossos serviços</li>
                  <li>Enviar propostas e orçamentos personalizados</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Enviar comunicações de marketing (apenas com seu consentimento)</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Compartilhamento de Informações</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
                  <li>Quando necessário para fornecer nossos serviços</li>
                  <li>Quando exigido por lei ou processo legal</li>
                  <li>Para proteger nossos direitos e propriedade</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Segurança dos Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Seus Direitos (LGPD)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Acesso aos seus dados pessoais</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                  <li>Portabilidade dos dados</li>
                  <li>Eliminação dos dados pessoais</li>
                  <li>Revogação do consentimento</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.7}>
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nosso site pode usar cookies para melhorar sua experiência. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.8}>
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Alterações nesta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página e atualizando a data de "Última atualização".
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.9}>
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos sob a LGPD, entre em contato conosco através do e-mail{' '}
                  <a href="mailto:contato@mavenestudio.com.br" className="text-foreground hover:underline">
                    contato@mavenestudio.com.br
                  </a>
                  .
                </p>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

