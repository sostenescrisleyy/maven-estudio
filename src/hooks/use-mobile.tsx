import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // iOS Safari (especialmente versões mais antigas) não suporta
    // MediaQueryList.addEventListener/removeEventListener.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Prefer the modern API when available, fallback otherwise.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
    } else if (typeof (mql as unknown as { addListener?: (cb: () => void) => void }).addListener === "function") {
      (mql as unknown as { addListener: (cb: () => void) => void }).addListener(onChange);
    }

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", onChange);
      } else if (typeof (mql as unknown as { removeListener?: (cb: () => void) => void }).removeListener === "function") {
        (mql as unknown as { removeListener: (cb: () => void) => void }).removeListener(onChange);
      }
    };
  }, []);

  return !!isMobile;
}
