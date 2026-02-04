import type React from "react"
import { useState } from "react"
import { ArrowUpRight, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AnimatedBackground } from "./animated-background"
import { useLanguage } from '@/contexts/LanguageContext'

export function LetsWorkTogether() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsClicked(true)

    // Navega para o formulário após a animação
    setTimeout(() => {
      navigate('/contato')
    }, 800)
  }

  return (
    <section id="contato" className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="relative flex flex-col items-center gap-12">
            <div
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked ? "translateY(-20px)" : "translateY(0)",
                pointerEvents: isClicked ? "none" : "auto",
              }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                {t('contact.available')}
              </span>
            </div>

            <div className="flex flex-col items-center gap-6">
              <h2
                className="relative text-center text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <span className="block overflow-hidden">
                  <span
                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                    }}
                  >
                    {t('contact.letsWork')}
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                    style={{
                      transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                    }}
                  >
                    <span className="text-muted-foreground/60 font-bold">{t('contact.together')}</span>
                  </span>
                </span>
              </h2>

              {/* Botão "Fazer orçamento" */}
              <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center gap-4 transition-all duration-500 cursor-pointer"
                style={{
                  pointerEvents: isClicked ? "none" : "auto",
                  opacity: isClicked ? 0 : 1,
                  transform: isClicked ? "translateY(-20px) scale(0.95)" : "translateY(0) scale(1)",
                }}
              >
                {/* Left line */}
                <div
                  className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                  style={{
                    transform: isHovered && !isClicked ? "scaleX(0)" : "scaleX(1)",
                    opacity: isHovered && !isClicked ? 0 : 0.5,
                  }}
                />

                {/* Button content */}
                <div
                  className="relative flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 transition-all duration-500 sm:px-8 sm:py-4"
                  style={{
                    borderColor: isHovered && !isClicked ? "var(--foreground)" : "var(--border)",
                    backgroundColor: isHovered && !isClicked ? "var(--foreground)" : "transparent",
                    boxShadow: isHovered && !isClicked ? "0 0 30px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  <FileText
                    className="size-4 transition-all duration-500 sm:size-5"
                    strokeWidth={1.5}
                    style={{
                      color: isHovered && !isClicked ? "var(--background)" : "var(--foreground)",
                    }}
                  />
                  <span
                    className="text-sm font-medium tracking-wide transition-all duration-500 sm:text-base"
                    style={{
                      color: isHovered && !isClicked ? "var(--background)" : "var(--foreground)",
                    }}
                  >
                    {t('nav.fazerOrcamento')}
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-all duration-500 sm:size-5"
                    strokeWidth={1.5}
                    style={{
                      color: isHovered && !isClicked ? "var(--background)" : "var(--foreground)",
                      transform: isHovered && !isClicked ? "translate(3px, -3px) scale(1.1)" : "translate(0, 0) scale(1)",
                    }}
                  />
                </div>

                {/* Right line */}
                <div
                  className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                  style={{
                    transform: isHovered && !isClicked ? "scaleX(0)" : "scaleX(1)",
                    opacity: isHovered && !isClicked ? 0 : 0.5,
                  }}
                />
              </button>
            </div>

            <div
              className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked ? "translateY(20px)" : "translateY(0)",
                pointerEvents: isClicked ? "none" : "auto",
              }}
            >
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {t('contact.description2')}
              </p>
              <span className="text-xs tracking-widest uppercase text-muted-foreground/60">{t('contact.email')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

