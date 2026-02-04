import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, ArrowRight, ArrowLeft, Loader2, X, Palette, Globe, TrendingUp, Database, Bot, FileText, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { publicUrl } from '@/lib/utils';

// Essas opções serão traduzidas dinamicamente no componente

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

// Steps serão criados dentro do componente para ter acesso às traduções

// Funções de validação
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  // Aceita telefones brasileiros: (11) 91234-5678, (11) 1234-5678, 11912345678, etc.
  // Mínimo 10 dígitos (telefone fixo) e máximo 11 dígitos (celular com DDD)
  return cleaned.length >= 10 && cleaned.length <= 11;
};

const formatPhone = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11);

  // Aplica a máscara
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  } else if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
};

export default function ContactForm() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0); // 0 = introdução, 1+ = perguntas
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const servicesList = [
    {
      id: 'visual-identity',
      icon: Palette,
      label: { pt: 'Identidade Visual', en: 'Visual Identity', es: 'Identidad Visual' },
      description: {
        pt: 'Criação de marcas memoráveis e identidades visuais completas.',
        en: 'Creation of memorable brands and complete visual identities.',
        es: 'Creación de marcas memorables e identidades visuales completas.'
      }
    },
    {
      id: 'web-development',
      icon: Globe,
      label: { pt: 'Web Development', en: 'Web Development', es: 'Desarrollo Web' },
      description: {
        pt: 'Sites de alta performance, Landing Pages e E-commerces.',
        en: 'High performance websites, Landing Pages and E-commerces.',
        es: 'Sitios web de alto rendimiento, Landing Pages y E-commerces.'
      }
    },
    {
      id: 'traffic',
      icon: TrendingUp,
      label: { pt: 'Tráfego Pago', en: 'Paid Traffic', es: 'Tráfico Pago' },
      description: {
        pt: 'Gestão estratégica de campanhas no Google Ads, Meta Ads e outros.',
        en: 'Strategic management of campaigns on Google Ads, Meta Ads and others.',
        es: 'Gestión estratégica de campañas en Google Ads, Meta Ads y otros.'
      }
    },
    {
      id: 'crm',
      icon: Database,
      label: { pt: 'CRM & Vendas', en: 'CRM & Sales', es: 'CRM y Ventas' },
      description: {
        pt: 'Implementação de CRM e automação de vendas e pipelines.',
        en: 'CRM implementation and sales automation and pipelines.',
        es: 'Implementación de CRM y automatización de ventas y pipelines.'
      }
    },
    {
      id: 'automation',
      icon: Bot,
      label: { pt: 'Automação & IA', en: 'Automation & AI', es: 'Automatización e IA' },
      description: {
        pt: 'Soluções avançadas com Chatbots, WhatsApp e Inteligência Artificial.',
        en: 'Advanced solutions with Chatbots, WhatsApp and Artificial Intelligence.',
        es: 'Soluciones avanzadas con Chatbots, WhatsApp e Inteligencia Artificial.'
      }
    },
    {
      id: 'content',
      icon: FileText,
      label: { pt: 'Produção de Conteúdo', en: 'Content Production', es: 'Producción de Contenido' },
      description: {
        pt: 'Estratégia completa de conteúdo e copy persuasiva.',
        en: 'Complete content strategy and persuasive copy.',
        es: 'Estrategia completa de contenido y copy persuasivo.'
      }
    }
  ];

  const budgetOptions = {
    pt: ['Até R$ 5.000', 'R$ 5.000 - R$ 10.000', 'R$ 10.000 - R$ 20.000', 'Acima de R$ 20.000', 'A definir'],
    en: ['Up to $1,000', '$1,000 - $2,000', '$2,000 - $4,000', 'Above $4,000', 'To be defined'],
    es: ['Hasta $1,000', '$1,000 - $2,000', '$2,000 - $4,000', 'Más de $4,000', 'A definir']
  };

  const timelineOptions = {
    pt: ['Urgente (até 30 dias)', 'Normal (30-60 dias)', 'Flexível (mais de 60 dias)'],
    en: ['Urgent (up to 30 days)', 'Normal (30-60 days)', 'Flexible (more than 60 days)'],
    es: ['Urgente (hasta 30 días)', 'Normal (30-60 días)', 'Flexible (más de 60 días)']
  };

  const steps = [
    {
      id: 1,
      questionKey: 'form.steps.name',
      field: 'name' as keyof FormData,
      required: true,
      type: 'text' as const,
      placeholderKey: 'form.placeholders.name'
    },
    {
      id: 2,
      questionKey: 'form.steps.email',
      field: 'email' as keyof FormData,
      required: true,
      type: 'email' as const,
      placeholderKey: 'form.placeholders.email'
    },
    {
      id: 3,
      questionKey: 'form.steps.phone',
      field: 'phone' as keyof FormData,
      required: true,
      type: 'tel' as const,
      placeholderKey: 'form.placeholders.phone'
    },
    {
      id: 4,
      questionKey: 'form.steps.company',
      field: 'company' as keyof FormData,
      required: false,
      type: 'text' as const,
      placeholderKey: 'form.placeholders.company'
    },
    {
      id: 5,
      questionKey: 'form.steps.service',
      field: 'service' as keyof FormData,
      required: true,
      type: 'service-selection' as const,
      optionsKey: 'service' as const
    },
    {
      id: 6,
      questionKey: 'form.steps.budget',
      field: 'budget' as keyof FormData,
      required: false,
      type: 'select' as const,
      optionsKey: 'budget' as const
    },
    {
      id: 7,
      questionKey: 'form.steps.timeline',
      field: 'timeline' as keyof FormData,
      required: false,
      type: 'select' as const,
      optionsKey: 'timeline' as const
    },
    {
      id: 8,
      questionKey: 'form.steps.message',
      field: 'message' as keyof FormData,
      required: true,
      type: 'textarea' as const,
      placeholderKey: 'form.placeholders.message'
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const totalSteps = steps.length;
  const currentStepData = currentStep > 0 ? steps[currentStep - 1] : null;
  const progress = currentStep > 0 ? (currentStep / totalSteps) * 100 : 0;

  const handleNext = () => {
    // Se está na tela de introdução, avança para a primeira pergunta
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    if (!currentStepData) return;

    const field = currentStepData.field;
    const value = formData[field];

    // Limpa erros anteriores
    setErrors({});

    // Validação de campo obrigatório
    if (currentStepData.required && !value) {
      const errorMessage = t('form.errors.required');
      setErrors({ [field]: errorMessage });
      toast({
        title: t('form.errors.required'),
        description: t('form.errors.required'),
        variant: 'destructive',
      });
      return;
    }

    // Validação de email
    if (field === 'email' && value) {
      if (!validateEmail(value as string)) {
        const errorMessage = t('form.errors.invalidEmail');
        setErrors({ [field]: errorMessage });
        toast({
          title: t('form.errors.invalidEmail'),
          description: t('form.errors.invalidEmail'),
          variant: 'destructive',
        });
        return;
      }
    }

    // Validação de telefone
    if (field === 'phone' && value) {
      if (!validatePhone(value as string)) {
        const errorMessage = t('form.errors.invalidPhone');
        setErrors({ [field]: errorMessage });
        toast({
          title: t('form.errors.invalidPhone'),
          description: t('form.errors.invalidPhone'),
          variant: 'destructive',
        });
        return;
      }
    }

    // Se passou em todas as validações, limpa erros e avança
    setErrors({});

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      setCurrentStep(0); // Volta para a introdução
    }
  };

  const handleInputChange = (value: string, field?: keyof FormData) => {
    const targetField = field || currentStepData?.field;
    if (!targetField) return;

    let processedValue = value;

    // Aplica máscara de telefone
    if (targetField === 'phone') {
      processedValue = formatPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [targetField]: processedValue,
    }));

    // Limpa erro quando o usuário começa a digitar
    if (errors[targetField]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[targetField];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const webhookUrl =
      import.meta.env.VITE_LEAD_WEBHOOK_URL ??
      'https://mosxchrbiscixlqozfdx.supabase.co/functions/v1/webhook-lead/formulario-da-maven-estudio';

    const webhookUrlN8N = 'https://n8n.mavenestudio.com.br/webhook/maven-estudio-formulario';

    setIsSubmitting(true);

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15000);

      const payload = {
        source: 'mavenestudio',
        form: 'formulario-identidade-visual',
        ...formData,
        language,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
      };

      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      };

      // Envia para ambos os webhooks em paralelo
      const [res, resN8N] = await Promise.all([
        fetch(webhookUrl, fetchOptions),
        fetch(webhookUrlN8N, fetchOptions).catch(err => {
          console.warn('Erro ao enviar para N8N:', err);
          return null;
        })
      ]);

      window.clearTimeout(timeoutId);

      // Verificamos principalmente o webhook original para sucesso/erro
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Webhook error (${res.status}): ${text || res.statusText}`);
      }

      // Log opcional para o resultado do N8N
      if (resN8N && !resN8N.ok) {
        console.warn('Webhook N8N retornou erro:', resN8N.status);
      }

      setIsSubmitted(true);

      // Meta Pixel Event
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Formulário de Contato',
          status: 'submitted'
        });
      }

      toast({
        title: t('form.success.title'),
        description: t('form.success.description'),
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : language === 'pt'
            ? 'Falha ao enviar o formulário.'
            : language === 'en'
              ? 'Failed to submit the form.'
              : 'No se pudo enviar el formulario.';

      toast({
        title: language === 'pt' ? 'Não foi possível enviar' : language === 'en' ? 'Could not submit' : 'No se pudo enviar',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const renderInput = () => {
    if (!currentStepData) return null;

    const value = formData[currentStepData.field];
    const hasValue = !!value;

    const getOptions = () => {
      // service options are handled differently now
      if (currentStepData.optionsKey === 'budget') return budgetOptions[language];
      if (currentStepData.optionsKey === 'timeline') return timelineOptions[language];
      return [];
    };

    switch (currentStepData.type) {
      case 'text':
      case 'email':
      case 'tel':
        const fieldError = errors[currentStepData.field];
        const isInvalid = !!fieldError;

        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-12"
          >
            <Input
              value={value as string}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              type={currentStepData.type === 'tel' ? 'tel' : currentStepData.type}
              placeholder={t(currentStepData.placeholderKey)}
              className={`w-full text-lg sm:text-xl md:text-2xl lg:text-3xl h-12 sm:h-14 md:h-16 lg:h-20 bg-transparent border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${isInvalid
                ? 'border-destructive focus:border-destructive'
                : 'border-foreground/20 focus:border-foreground/60'
                }`}
              autoFocus
            />
            {isInvalid && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {fieldError}
              </motion.p>
            )}
          </motion.div>
        );

      case 'select':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-12"
          >
            <Select value={value as string} onValueChange={handleInputChange}>
              <SelectTrigger className="w-full text-lg sm:text-xl md:text-2xl lg:text-3xl h-12 sm:h-14 md:h-16 lg:h-20 bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 focus:border-foreground/60 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder={language === 'pt' ? 'Selecione uma opção' : language === 'en' ? 'Select an option' : 'Selecciona una opción'} />
              </SelectTrigger>
              <SelectContent className="text-base sm:text-lg max-h-[60vh]">
                {getOptions().map((option) => (
                  <SelectItem key={option} value={option} className="text-base sm:text-lg py-3 sm:py-4">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        );

      case 'textarea':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-12"
          >
            <Textarea
              value={value as string}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              placeholder={t(currentStepData.placeholderKey)}
              className="w-full text-base sm:text-lg md:text-xl lg:text-2xl bg-transparent border-2 border-foreground/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 focus:border-foreground/60 focus:border-opacity-100 focus-visible:ring-2 focus-visible:ring-foreground/20 resize-none transition-colors"
              autoFocus
            />
          </motion.div>
        );

      case 'service-selection':
        const selectedServices = value ? (value as string).split(', ') : [];

        const toggleService = (serviceLabel: string) => {
          let newSelected;
          if (selectedServices.includes(serviceLabel)) {
            newSelected = selectedServices.filter(s => s !== serviceLabel);
          } else {
            newSelected = [...selectedServices, serviceLabel];
          }
          handleInputChange(newSelected.join(', '));
        };

        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
          >
            {servicesList.map((service) => {
              const Icon = service.icon;
              const label = service.label[language as 'pt' | 'en' | 'es'] || service.label.pt;
              const description = service.description[language as 'pt' | 'en' | 'es'] || service.description.pt;
              const isSelected = selectedServices.includes(label);

              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(label)}
                  className={`
                    cursor-pointer rounded-xl p-4 sm:p-6 border-2 transition-all duration-300 relative group
                    ${isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-foreground/10 hover:border-foreground/30 bg-background/50 hover:bg-background/80'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`
                      p-2 rounded-lg transition-colors
                      ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}
                    `}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    {isSelected && (
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">
                    {label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden px-4">
        {/* Logo */}
        <Link
          to="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center"
        >
          <img
            src={publicUrl('/logotipo.png')}
            alt="Maven Estúdio"
            className="h-6 sm:h-8 w-auto"
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto px-6 z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-6 sm:mb-8"
          >
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-foreground" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            {t('form.success.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12"
          >
            {t('form.success.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => window.location.href = '/'}
              size="lg"
              className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
            >
              {t('form.buttons.backToHome')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Logo */}
      <Link
        to="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center"
      >
        <img
          src={publicUrl('/logotipo.png')}
          alt="Maven Estúdio"
          className="h-6 sm:h-8 w-auto"
        />
      </Link>

      {/* Close Button */}
      <Link
        to="/"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-foreground/10 active:bg-foreground/20 transition-colors touch-manipulation"
        aria-label="Fechar"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </Link>

      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-foreground/10 z-40">
          <motion.div
            className="h-full bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full px-4 sm:px-6 scroll-smooth">
        <div className="min-h-full flex flex-col items-center justify-center py-12 pb-32 sm:pb-40">
          <div className="max-w-4xl w-full">
            <AnimatePresence mode="wait">
              {currentStep === 0 ? (
                // Tela de Introdução
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full text-center"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8"
                  >
                    {t('form.intro.title')}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-6"
                  >
                    {t('form.intro.subtitle1')}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-xl mx-auto"
                  >
                    {t('form.intro.subtitle2')} ⏱️
                  </motion.p>
                </motion.div>
              ) : (
                // Perguntas do Formulário
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full"
                >
                  {/* Question */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-3 sm:mb-4 break-words"
                  >
                    {currentStepData ? t(currentStepData.questionKey) : ''}
                    {currentStepData?.required && (
                      <span className="text-muted-foreground ml-1 sm:ml-2">*</span>
                    )}
                  </motion.h1>

                  {/* Input */}
                  {renderInput()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 border-t border-foreground/10 bg-background/95 backdrop-blur-md" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {currentStep > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground flex-shrink-0">
              <span>{currentStep}</span>
              <span>/</span>
              <span>{totalSteps}</span>
            </div>
          )}
          {currentStep === 0 && <div className="flex-shrink-0" />}

          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            {currentStep > 1 && (
              <Button
                onClick={handlePrevious}
                variant="ghost"
                size="lg"
                className="rounded-full px-4 sm:px-6 text-sm sm:text-base touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{t('form.buttons.previous')}</span>
              </Button>
            )}
            <Button
              onClick={handleNext}
              size="lg"
              disabled={isSubmitting || (currentStep > 0 && currentStepData && !formData[currentStepData.field] && currentStepData.required)}
              className="rounded-full px-4 sm:px-6 md:px-8 text-sm sm:text-base touch-manipulation flex-1 sm:flex-initial min-w-[100px] sm:min-w-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 animate-spin" />
                  <span className="hidden sm:inline">{t('form.buttons.sending')}</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : currentStep === 0 ? (
                <>
                  <span>{t('form.buttons.start')}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </>
              ) : currentStep === totalSteps ? (
                <>
                  <span>{t('form.buttons.send')}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </>
              ) : (
                <>
                  <span>{t('form.buttons.continue')}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
