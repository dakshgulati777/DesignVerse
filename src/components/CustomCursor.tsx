import { useState, useEffect, useCallback, memo } from 'react';

const CustomCursor = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleHoverStart = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [data-hoverable]')) {
      setIsHovering(true);
    }
  }, []);

  const handleHoverEnd = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleHoverStart, handleHoverEnd]);

  const cursorScale = isClicking ? 0.7 : isHovering ? 1.5 : 1;

  return (
    <>
      {/* Main cursor - geometric shape */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px) scale(${cursorScale}) rotate(${isHovering ? 45 : 0}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div 
          className="w-6 h-6 bg-foreground"
          style={{ 
            clipPath: isHovering 
              ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' 
              : 'polygon(50% 0%, 100% 100%, 0% 100%)'
          }}
        />
      </div>

      {/* Outer ring - geometric */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px) scale(${isHovering ? 1.5 : 1}) rotate(${isHovering ? -45 : 0}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div 
          className="w-12 h-12 border border-foreground/50"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />
      </div>
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;