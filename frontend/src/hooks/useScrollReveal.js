import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';

/**
 * Reusable hook for scroll-triggered reveal animations.
 * @param {Object} options - Intersection observer options.
 * @returns {Array} [ref, controls]
 */
export function useScrollReveal(options = { threshold: 0.15, once: true }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        amount: options.threshold, 
        once: options.once 
    });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("show");
        } else if (!options.once) {
            controls.start("hidden");
        }
    }, [isInView, controls, options.once]);

    return [ref, controls];
}

export default useScrollReveal;
