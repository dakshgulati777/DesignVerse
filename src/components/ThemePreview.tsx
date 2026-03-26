import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Type, Palette, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slideUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const ThemePreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const elements = [
    { label: 'Primary Button', type: 'button' },
    { label: 'Card', type: 'card' },
    { label: 'Typography', type: 'typography' },
    { label: 'Colors', type: 'colors' },
  ];

  const renderPreviewContent = (mode: 'dark' | 'light') => {
    const isDark = mode === 'dark';
    const bg = isDark ? 'bg-[hsl(0,0%,4%)]' : 'bg-[hsl(0,0%,98%)]';
    const fg = isDark ? 'text-[hsl(0,0%,96%)]' : 'text-[hsl(0,0%,8%)]';
    const mutedFg = isDark ? 'text-[hsl(0,0%,60%)]' : 'text-[hsl(0,0%,45%)]';
    const cardBg = isDark ? 'bg-[hsl(0,0%,6%)]' : 'bg-[hsl(0,0%,100%)]';
    const borderColor = isDark ? 'border-[hsl(0,0%,18%)]' : 'border-[hsl(0,0%,88%)]';
    const btnBg = isDark ? 'bg-[hsl(0,0%,90%)] text-[hsl(0,0%,4%)]' : 'bg-[hsl(0,0%,10%)] text-[hsl(0,0%,98%)]';
    const inputBg = isDark ? 'bg-[hsl(0,0%,12%)]' : 'bg-[hsl(0,0%,94%)]';

    return (
      <div className={`${bg} rounded-xl p-5 space-y-4 border ${borderColor} h-full`}>
        {/* Mode label */}
        <div className={`flex items-center gap-2 ${fg}`}>
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase">
            {mode} mode
          </span>
        </div>

        {/* Typography */}
        <div className="space-y-1">
          <h4 className={`text-lg font-bold ${fg}`}>Heading Text</h4>
          <p className={`text-sm ${mutedFg}`}>
            Body text with muted foreground for readability.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className={`${btnBg} px-3 py-1.5 rounded-md text-xs font-medium`}>
            Primary
          </button>
          <button className={`border ${borderColor} ${fg} px-3 py-1.5 rounded-md text-xs font-medium`}>
            Outline
          </button>
          <button className={`${fg} px-3 py-1.5 rounded-md text-xs font-medium opacity-60`}>
            Ghost
          </button>
        </div>

        {/* Card */}
        <div className={`${cardBg} border ${borderColor} rounded-lg p-3 space-y-2`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-md ${isDark ? 'bg-[hsl(0,0%,15%)]' : 'bg-[hsl(0,0%,94%)]'} flex items-center justify-center`}>
              <Palette className={`w-4 h-4 ${fg}`} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${fg}`}>Card Title</p>
              <p className={`text-[10px] ${mutedFg}`}>Card description</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className={`${inputBg} border ${borderColor} rounded-md px-3 py-2`}>
          <span className={`text-xs ${mutedFg}`}>Input placeholder...</span>
        </div>

        {/* Color swatches */}
        <div className="flex gap-1.5">
          {['bg-[hsl(0,0%,96%)]', 'bg-[hsl(0,0%,60%)]', 'bg-[hsl(0,0%,30%)]', 'bg-[hsl(0,0%,12%)]', 'bg-[hsl(0,0%,4%)]'].map((c, i) => (
            <div key={i} className={`w-6 h-6 rounded-full ${c} border ${borderColor}`} />
          ))}
        </div>

        {/* Badge row */}
        <div className="flex gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${borderColor} ${fg}`}>Badge</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${btnBg}`}>Active</span>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 glass-nav mb-6">
            <Eye className="w-5 h-5 text-primary" />
            <span className="font-medium">Theme Preview</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Dark vs Light
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare how design elements render across both themes
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          custom={2}
        >
          <motion.div variants={slideUpVariants} custom={2}>
            {renderPreviewContent('dark')}
          </motion.div>
          <motion.div variants={slideUpVariants} custom={3}>
            {renderPreviewContent('light')}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThemePreview;
