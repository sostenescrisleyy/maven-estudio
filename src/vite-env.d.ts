/// <reference types="vite/client" />

interface Window {
  fbq: any;
}


// Alguns setups/linters podem não enxergar as typings do Vite corretamente.
// Garantimos aqui o mínimo necessário para `import.meta.env.BASE_URL`.
interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_LEAD_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
