import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Keep a breadcrumb in console for debugging on mobile.
    // eslint-disable-next-line no-console
    console.error("App crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "black",
            color: "white",
            fontFamily:
              "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          <div style={{ maxWidth: 520, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Algo deu errado ao carregar o site
            </div>
            <div style={{ opacity: 0.8, marginBottom: 16, lineHeight: 1.4 }}>
              Se isso aconteceu no mobile, pode ser incompatibilidade do navegador ou
              algum recurso (ex.: WebGL). Tente atualizar a página.
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                appearance: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                padding: "10px 14px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


