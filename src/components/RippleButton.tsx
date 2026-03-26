import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useRipple } from '@/hooks/useRipple';
import { cn } from '@/lib/utils';

interface RippleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart'> {
  variant?: 'primary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', onClick, disabled, type = 'button', ...props }, ref) => {
    const { createRipple, RippleContainer } = useRipple();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onClick?.(e);
    };

    const baseStyles = "relative overflow-hidden font-medium transition-all duration-300 flex items-center justify-center gap-2";
    
    const variants = {
      primary: "btn-primary hover:shadow-[var(--shadow-glow)]",
      glass: "btn-glass hover:bg-white/15",
      ghost: "bg-transparent hover:bg-white/10 rounded-xl",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-xl",
      lg: "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-2xl",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={handleClick}
        {...props}
      >
        <motion.span
          className="absolute inset-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
        <RippleContainer />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

export default RippleButton;
