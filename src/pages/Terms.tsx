import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function Terms() {
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
            <h1 className="text-4xl md:text-5xl mb-4">Termos de Uso</h1>
            <p className="text-muted-foreground text-lg">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </ScrollReveal>

          <div className="prose prose-invert max-w-none space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao acessar e usar o site da Maven Estúdio, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concorda com alguma parte destes termos, não deve usar nosso site.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <section>
                <h2 className="text-2xl font-bold mb-4">2. Uso do Site</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O conteúdo deste site é fornecido apenas para fins informativos. Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros ou restrinja ou iniba o uso e aproveitamento do site por terceiros.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Você não deve usar o site de forma a danificar, desabilitar, sobrecarregar ou comprometer nossos servidores ou redes, ou interferir no uso e aproveitamento do site por qualquer outra parte.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Propriedade Intelectual</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da Maven Estúdio ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais brasileiras e internacionais.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  O uso não autorizado de qualquer material deste site pode violar leis de direitos autorais, marcas registradas e outras leis. Você não pode reproduzir, distribuir, modificar, criar trabalhos derivados, exibir publicamente, executar publicamente, republicar, baixar, armazenar ou transmitir qualquer material deste site sem nossa permissão prévia por escrito.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Limitação de Responsabilidade</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Maven Estúdio não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar este site, incluindo, mas não limitado a, perda de dados ou lucros, mesmo que tenhamos sido avisados da possibilidade de tais danos.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Modificações dos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site. É sua responsabilidade revisar periodicamente estes termos para estar ciente de quaisquer alterações.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail{' '}
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

