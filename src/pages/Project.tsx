import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { publicUrl } from '@/lib/utils';

function rangeImages(options: { dir: string; prefix: string; count: number }) {
  const { dir, prefix, count } = options;
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `/${dir}/${prefix}-${n}.png`;
  });
}

const projectsData: Record<string, {
  title: string;
  cover: string;
  description: string;
  images: string[];
}> = {
  lealdino: {
    title: 'Lealdino Jorge',
    cover: '/lealdino-jorge.png',
    description: 'Identidade visual completa para consultor e responsável por consórcios',
    images: rangeImages({ dir: 'lealdino-jorge', prefix: 'lealdino', count: 20 }),
  },
  'maven-estudio': {
    title: 'Maven Estúdio',
    cover: '/maven-estudio.png',
    description: 'Rebranding estratégico para estúdio de design',
    images: rangeImages({ dir: 'maven-estudio', prefix: 'maven', count: 19 }),
  },
  natulife: {
    title: 'Natu Life',
    cover: '/natu-life.png',
    description: 'Identidade visual para marca de cosméticos 100% veganos e naturais',
    images: rangeImages({ dir: 'natuli-life', prefix: 'natulife', count: 16 }),
  },
};

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const project = id ? projectsData[id] : null;

  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0);
    
    if (!project) {
      navigate('/');
    }
  }, [project, navigate, id]);

  const handleNext = useCallback(() => {
    if (project && selectedImageIndex !== null) {
      const nextIndex = (selectedImageIndex + 1) % project.images.length;
      setSelectedImageIndex(nextIndex);
    }
  }, [project, selectedImageIndex]);

  const handlePrevious = useCallback(() => {
    if (project && selectedImageIndex !== null) {
      const prevIndex = selectedImageIndex === 0 ? project.images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(prevIndex);
    }
  }, [project, selectedImageIndex]);

  // Navegação com teclado
  useEffect(() => {
    if (selectedImageIndex === null || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, project, handleNext, handlePrevious]);

  if (!project) {
    return null;
  }

  // Grid hierárquico - primeira imagem maior, outras menores
  const getGridClass = (index: number) => {
    if (index === 0) {
      return 'md:col-span-2 md:row-span-2';
    }
    if (index === 1 || index === 2) {
      return 'md:col-span-1';
    }
    return 'md:col-span-1';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 md:pt-32 relative overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10">
          {/* Header do Projeto */}
          <ScrollReveal className="mb-12 text-center" direction="fade">
            <button
              onClick={() => navigate('/#portfolio')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-flex items-center"
            >
              ← {t('portfolio.backToPortfolio')}
            </button>
            <h1 className="text-4xl md:text-5xl mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {project.description}
            </p>
          </ScrollReveal>

          {/* Grid Hierárquico de Imagens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {project.images.map((image, index) => (
              <ScrollReveal
                key={index}
                direction="scale"
                delay={index * 0.05}
                className={getGridClass(index)}
              >
                <div
                  onClick={() => setSelectedImageIndex(index)}
                  className="relative group cursor-pointer overflow-hidden rounded-xl bg-card border border-border card-hover"
                >
                  <div className="aspect-square md:aspect-auto md:h-full">
                    <img
                      src={publicUrl(image)}
                      alt={`${project.title} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index < 3 ? 'high' : 'low'}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <X className="w-6 h-6 rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal para visualizar imagem */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-7xl w-full p-0 bg-transparent border-none [&>button]:hidden">
          {selectedImageIndex !== null && project && (
            <div className="relative">
              {/* Botão Fechar */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors z-20"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Botão Anterior */}
              {project.images.length > 1 && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors z-20"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Botão Próximo */}
              {project.images.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors z-20"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Contador de imagens */}
              {project.images.length > 1 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border text-sm z-20">
                  {selectedImageIndex + 1} / {project.images.length}
                </div>
              )}

              {/* Imagem */}
              <div className="max-h-[90vh] overflow-auto">
                <img
                  src={publicUrl(project.images[selectedImageIndex])}
                  alt={`${project.title} - Imagem ${selectedImageIndex + 1}`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

