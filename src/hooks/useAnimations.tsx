export const useAnimations = () => {
  const stellarFadeIn = {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const orbitRise = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease: "easeOut" }
  };

  const floatingPanel = {
    initial: { opacity: 0, y: 60, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const blurToClear = {
    initial: { opacity: 0, scale: 1.1 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  const nebulaSlide = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {},
    viewport: { once: true, amount: 0.2 },
    transition: { staggerChildren: 0.1 }
  };

  const staggerChild = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return {
    stellarFadeIn,
    orbitRise,
    floatingPanel,
    blurToClear,
    nebulaSlide,
    staggerContainer,
    staggerChild
  };
};

export const hoverAnimations = {
  magnetLift: {
    whileHover: { y: -8, scale: 1.02 },
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  },
  softBounce: {
    whileHover: { y: -5 },
    whileTap: { y: 0 },
    transition: { type: 'spring', stiffness: 500, damping: 10 }
  }
};
