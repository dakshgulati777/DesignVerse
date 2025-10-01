import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Principle {
  id: string;
  title: string;
  category: string;
  description: string;
  example: string;
  icon: any;
  detailedInfo?: string;
}

interface DesignPrinciplesDetailedProps {
  principle: Principle | null;
  onClose: () => void;
}

const DesignPrinciplesDetailed = ({ principle, onClose }: DesignPrinciplesDetailedProps) => {
  if (!principle) return null;

  const IconComponent = principle.icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-primary/20 text-primary">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{principle.title}</h2>
              <span className="inline-block px-3 py-1 rounded-full text-sm border border-primary/30 bg-primary/10 text-primary">
                {principle.category}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {principle.description}
            </p>
          </div>

          {principle.detailedInfo && (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Detailed Information</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {principle.detailedInfo}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Examples</h3>
            <p className="text-muted-foreground leading-relaxed">
              {principle.example}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10">
            <Button onClick={onClose} className="btn-primary w-full">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DesignPrinciplesDetailed;
