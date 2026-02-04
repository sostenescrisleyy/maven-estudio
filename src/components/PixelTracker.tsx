import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function PixelTracker() {
    const location = useLocation();

    useEffect(() => {
        // Verifica se o fbq existe (Pixel carregado)
        if (window.fbq) {
            // Dispara o PageView para a nova URL
            window.fbq('track', 'PageView');
        }
    }, [location]); // Roda toda vez que a rota mudar

    return null;
}
