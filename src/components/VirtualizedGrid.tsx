import { useState, useRef, useEffect, useCallback, memo, ReactNode } from 'react';

interface VirtualizedGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemHeight: number;
  columns: number;
  gap?: number;
  className?: string;
  overscan?: number;
}

function VirtualizedGridInner<T>({
  items,
  renderItem,
  itemHeight,
  columns,
  gap = 24,
  className = '',
  overscan = 3,
}: VirtualizedGridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });

  const rowCount = Math.ceil(items.length / columns);
  const totalHeight = rowCount * (itemHeight + gap) - gap;

  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = window.scrollY;
    const containerTop = containerRef.current.offsetTop;
    const viewportHeight = window.innerHeight;

    const relativeScroll = Math.max(0, scrollTop - containerTop);
    const startRow = Math.floor(relativeScroll / (itemHeight + gap));
    const visibleRows = Math.ceil(viewportHeight / (itemHeight + gap));

    const start = Math.max(0, (startRow - overscan) * columns);
    const end = Math.min(items.length, (startRow + visibleRows + overscan) * columns);

    setVisibleRange({ start, end });
  }, [columns, itemHeight, gap, items.length, overscan]);

  useEffect(() => {
    calculateVisibleRange();
    
    const handleScroll = () => {
      requestAnimationFrame(calculateVisibleRange);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [calculateVisibleRange]);

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  const startRow = Math.floor(visibleRange.start / columns);
  const offsetTop = startRow * (itemHeight + gap);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: totalHeight, position: 'relative' }}
    >
      <div
        style={{
          position: 'absolute',
          top: offsetTop,
          left: 0,
          right: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {visibleItems.map((item, index) => (
          <div key={visibleRange.start + index}>
            {renderItem(item, visibleRange.start + index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export const VirtualizedGrid = memo(VirtualizedGridInner) as typeof VirtualizedGridInner;
