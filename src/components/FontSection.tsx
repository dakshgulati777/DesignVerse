import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCallback } from 'react';

interface HeroFont {
  name: string;
  styles: string;
  foundry: string;
  googleName?: string;
}

const heroFonts: HeroFont[] = [
  { name: 'Helvetica', styles: '14 styles', foundry: 'Max Miedinger', googleName: 'Inter' },
  { name: 'Roboto', styles: '12 styles', foundry: 'Google', googleName: 'Roboto' },
  { name: 'Satoshi', styles: '16 styles', foundry: 'Indian Type Foundry', googleName: 'DM Sans' },
  { name: 'Manrope', styles: '7 styles', foundry: 'Mikhail Sharanda', googleName: 'Manrope' },
];

const FontSection = memo(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const families = heroFonts
      .filter(f => f.googleName)
      .map(f => f.googleName!.replace(/ /g, '+'))
      .join('&family=');
    if (families) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${families}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const downloadFont = useCallback(async (font: HeroFont) => {
    const fontName = font.googleName || font.name;
    try {
      const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
      const response = await fetch(fontUrl);
      const cssText = await response.text();
      const urlMatches = cssText.match(/url\((https:\/\/[^)]+)\)/g);
      if (urlMatches && urlMatches.length > 0) {
        const fontFileUrl = urlMatches[0].match(/https:\/\/[^)]+/)?.[0];
        if (fontFileUrl) {
          const fontResponse = await fetch(fontFileUrl);
          const fontBlob = await fontResponse.blob();
          const url = window.URL.createObjectURL(fontBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fontName.replace(/ /g, '-')}.woff2`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          toast.success(`${font.name} downloaded!`);
        }
      }
    } catch {
      toast.error(`Failed to download ${font.name}`);
    }
  }, []);

  return (
    <section id="fonts" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Hero font list - Fontshare style */}
        <div className="divide-y divide-border">
          {heroFonts.map((font, index) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group py-8 md:py-12"
            >
              {/* Top row: name, styles, actions */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground">{font.name}</span>
                  <span className="text-xs text-muted-foreground/50">★</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span className="hidden sm:inline">{font.styles}</span>
                  <span className="hidden sm:inline">Free</span>
                  <button
                    onClick={() => downloadFont(font)}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>

              {/* Large font preview */}
              <div className="overflow-hidden">
                <h2
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[140px] font-normal leading-[0.95] tracking-tight text-primary/90 group-hover:text-foreground transition-colors duration-500 cursor-default select-none"
                  style={{ fontFamily: `'${font.googleName || font.name}', sans-serif` }}
                >
                  {font.name}
                </h2>
              </div>

              {/* Bottom row: foundry */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60">
                  Designed by {font.foundry}
                </span>
                <div className="w-12 h-[1px] bg-muted-foreground/20 group-hover:w-24 group-hover:bg-primary/40 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore More */}
        <motion.div
          className="text-center mt-16 pt-12 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-6 tracking-widest uppercase">
            250+ fonts available
          </p>
          <Button
            onClick={() => navigate('/font-lab')}
            variant="outline"
            size="lg"
            className="group border-foreground/20 hover:border-foreground/40 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Explore All Fonts
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

FontSection.displayName = 'FontSection';

export default FontSection;
