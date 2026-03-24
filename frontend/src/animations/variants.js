/**
 * Shared Framer Motion variants for the DocShift premium theme.
 * Defined outside components to prevent re-creation on render.
 */

export const springPhysics = {
    type: "spring",
    stiffness: 300,
    damping: 20
};

export const hoverScale = {
    initial: { scale: 1 },
    hover: { 
        scale: 1.04,
        transition: springPhysics
    },
    tap: { scale: 0.98 }
};

export const hoverGlow = {
    initial: { boxShadow: "0 0 0 rgba(37, 99, 235, 0)" },
    hover: { 
        boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)",
        transition: { duration: 0.3 }
    }
};

export const cardHover = {
    initial: { y: 0, boxShadow: "0 8px 30px rgba(0,0,0,0.04)" },
    hover: { 
        y: -4,
        boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(37, 99, 235, 0.1)",
        transition: springPhysics
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const revealUp = {
    hidden: { y: 30, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export const characterReveal = {
    hidden: { y: 20, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: springPhysics
    }
};

export const imageParallax = (yTransform) => ({
    style: { y: yTransform }
});
