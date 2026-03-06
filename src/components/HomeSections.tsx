import { motion } from 'framer-motion';
import { Heart, Eye, Bookmark, Swords, Clock, ArrowRight, Palette, Type, Contrast, Pipette, CheckCircle, Zap, Shield, Trophy, Upload, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pixuMain from '@/assets/pixu-main.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const SectionHeader = ({ title, subtitle, action, light = false }: { title: string; subtitle: string; action?: { label: string; href: string }; light?: boolean }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <h2 className={`font-satoshi font-bold text-3xl md:text-5xl ${light ? 'text-primary-foreground' : 'text-foreground'}`}>{title}</h2>
        <p className={`font-inter mt-2 text-lg ${light ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{subtitle}</p>
      </div>
      {action && (
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => navigate(action.href)}
          className={`hidden sm:flex items-center gap-2 font-inter font-medium text-sm hover:underline ${light ? 'text-accent' : 'text-primary'}`}
        >
          {action.label} <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
};

/* ─── How It Works ─── */
const steps = [
  { icon: Upload, number: '01', title: 'Upload Your Work', desc: 'Share your best designs with the community and build your portfolio.' },
  { icon: Swords, number: '02', title: 'Enter Battles', desc: 'Compete head-to-head with other designers in themed challenges.' },
  { icon: Trophy, number: '03', title: 'Get Discovered', desc: 'Top designers get featured and noticed by hiring companies.' },
];

const HowItWorks = () => (
  <section className="py-20 md:py-28 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-16"
      >
        <span className="inline-block bg-primary/10 text-primary font-inter font-medium text-sm px-4 py-1.5 rounded-full mb-4">HOW IT WORKS</span>
        <h2 className="font-satoshi font-bold text-3xl md:text-5xl text-foreground">
          Start Creating in 3 Easy Steps.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <step.icon className="w-7 h-7 text-primary" />
            </div>
            <span className="font-clash font-bold text-sm text-primary mb-2 block">{step.number}</span>
            <h3 className="font-satoshi font-bold text-xl text-foreground mb-2">{step.title}</h3>
            <p className="text-muted-foreground font-inter text-sm max-w-xs mx-auto">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Trending Designs ─── */
const trendingDesigns = [
  { id: 1, title: 'Dashboard Concept', designer: 'Sarah Chen', likes: 1247, views: 8432, color: 'from-primary/20 to-accent/20' },
  { id: 2, title: 'Mobile Banking App', designer: 'Marcus Rivera', likes: 982, views: 6218, color: 'from-accent/20 to-primary/20' },
  { id: 3, title: 'E-commerce Redesign', designer: 'Aiko Tanaka', likes: 1584, views: 12043, color: 'from-primary/30 to-primary/10' },
  { id: 4, title: 'Brand Identity System', designer: "Liam O'Brien", likes: 763, views: 4892, color: 'from-accent/30 to-accent/10' },
  { id: 5, title: 'Social Media Concept', designer: 'Priya Sharma', likes: 1105, views: 7654, color: 'from-primary/15 to-accent/15' },
  { id: 6, title: 'Travel App Screens', designer: 'Jonas Müller', likes: 892, views: 5431, color: 'from-accent/25 to-primary/15' },
];

const TrendingDesigns = () => (
  <section className="py-20 md:py-28 px-6 bg-secondary/40">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Trending Designs" subtitle="Most loved work this week" action={{ label: 'View all', href: '/' }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingDesigns.map((design, i) => (
          <motion.div
            key={design.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group bg-card rounded-3xl overflow-hidden border border-border card-hover cursor-pointer"
          >
            <div className={`aspect-[4/3] bg-gradient-to-br ${design.color} flex items-center justify-center`}>
              <div className="w-3/4 h-3/4 bg-card/50 rounded-2xl backdrop-blur-sm border border-border/50" />
            </div>
            <div className="p-5">
              <h3 className="font-satoshi font-bold text-foreground text-lg">{design.title}</h3>
              <p className="text-muted-foreground font-inter text-sm mt-1">{design.designer}</p>
              <div className="flex items-center gap-4 mt-3 text-muted-foreground text-sm font-inter">
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {design.likes.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {design.views.toLocaleString()}</span>
                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Bookmark className="w-4 h-4 hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── CTA Section with Pixu (dark bg, like Blastup "Stuck with growth") ─── */
const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-28 px-6 bg-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block bg-primary/20 text-primary font-inter font-medium text-sm px-4 py-1.5 rounded-full mb-4">
                WE'VE GOT YOUR BACK
              </span>
              <h2 className="font-satoshi font-bold text-3xl md:text-5xl text-background mb-6 leading-tight">
                Stuck with Your Design Career? Let's Fix That.
              </h2>
              <p className="text-background/60 font-inter text-lg max-w-lg mx-auto lg:mx-0 mb-8">
                We've helped thousands of designers showcase their best work, win battles, land interviews, and grow their following effortlessly.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/auth')}
                className="bg-accent text-accent-foreground rounded-2xl px-8 py-4 font-semibold text-base"
              >
                Join Now — It's Free
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex-shrink-0"
          >
            <img
              src={pixuMain}
              alt="Pixu mascot encouraging you"
              className="w-56 h-56 sm:w-72 sm:h-72 object-contain pixu-bounce drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── Why DesignVerse ─── */
const whyFeatures = [
  { icon: Zap, title: 'Fast Growth', desc: 'Gain visibility and followers through our featured system and battle wins.' },
  { icon: Shield, title: 'Quality Community', desc: 'Post with confidence knowing you're getting constructive feedback from real designers.' },
  { icon: CheckCircle, title: '100% Free', desc: 'Our tools and community features are completely free to use, forever.' },
];

const WhyDesignVerse = () => (
  <section className="py-20 md:py-28 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-6"
      >
        <span className="inline-block bg-primary/10 text-primary font-inter font-medium text-sm px-4 py-1.5 rounded-full mb-4">WHY DESIGNVERSE</span>
        <h2 className="font-satoshi font-bold text-3xl md:text-5xl text-foreground mb-4">
          Why is DesignVerse the Best
          <br />
          Creative Platform?
        </h2>
        <p className="text-muted-foreground font-inter text-lg max-w-2xl mx-auto">
          Join the community with the highest quality portfolios, battles, and tools. Guaranteed.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {whyFeatures.map((feat, i) => (
          <motion.div
            key={feat.title}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-card border border-border rounded-3xl p-8 text-center card-hover"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <feat.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-satoshi font-bold text-xl text-foreground mb-2">{feat.title}</h3>
            <p className="text-muted-foreground font-inter text-sm">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Top Designers ─── */
const topDesigners = [
  { name: 'Sarah Chen', role: 'UI/UX Designer', wins: 12, followers: '4.2K', color: 'bg-primary/20' },
  { name: 'Marcus Rivera', role: 'Brand Designer', wins: 8, followers: '3.1K', color: 'bg-accent/20' },
  { name: 'Aiko Tanaka', role: 'Product Designer', wins: 15, followers: '5.8K', color: 'bg-primary/15' },
  { name: "Liam O'Brien", role: 'Visual Designer', wins: 6, followers: '2.4K', color: 'bg-accent/15' },
];

const TopDesigners = () => (
  <section className="py-20 md:py-28 px-6 bg-secondary/40">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Top Designers" subtitle="Most influential creators this month" action={{ label: 'See all', href: '/hire' }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topDesigners.map((designer, i) => (
          <motion.div
            key={designer.name}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-card rounded-3xl p-6 border border-border card-hover cursor-pointer text-center"
          >
            <div className={`w-20 h-20 ${designer.color} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
              <span className="text-2xl font-satoshi font-bold text-foreground">{designer.name[0]}</span>
            </div>
            <h3 className="font-satoshi font-bold text-foreground">{designer.name}</h3>
            <p className="text-muted-foreground font-inter text-sm mt-1">{designer.role}</p>
            <div className="flex justify-center gap-6 mt-4 text-sm font-inter">
              <div>
                <span className="font-bold text-foreground">{designer.wins}</span>
                <span className="text-muted-foreground ml-1">wins</span>
              </div>
              <div>
                <span className="font-bold text-foreground">{designer.followers}</span>
                <span className="text-muted-foreground ml-1">followers</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Latest Battles ─── */
const latestBattles = [
  { id: 1, designerA: 'Sarah C.', designerB: 'Marcus R.', theme: 'Landing Page', votes: 342, timeLeft: '8h 23m' },
  { id: 2, designerA: 'Aiko T.', designerB: 'Liam O.', theme: 'App Icon', votes: 218, timeLeft: '12h 45m' },
  { id: 3, designerA: 'Priya S.', designerB: 'Jonas M.', theme: 'Logo Design', votes: 567, timeLeft: '3h 12m' },
];

const LatestBattles = () => (
  <section className="py-20 md:py-28 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Latest Battles" subtitle="Watch designers go head-to-head" action={{ label: 'Enter Arena', href: '/battles' }} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestBattles.map((battle, i) => (
          <motion.div
            key={battle.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-card rounded-3xl p-6 border border-border card-hover cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-inter font-medium bg-accent/15 text-accent-foreground px-3 py-1 rounded-full">
                <Swords className="w-3 h-3" /> {battle.theme}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-inter">
                <Clock className="w-3 h-3" /> {battle.timeLeft}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 my-6">
              <div className="flex-1 text-center">
                <div className="w-14 h-14 bg-primary/15 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                  <span className="font-satoshi font-bold text-foreground">{battle.designerA[0]}</span>
                </div>
                <p className="text-sm font-inter font-medium text-foreground">{battle.designerA}</p>
              </div>
              <span className="font-clash font-bold text-2xl text-muted-foreground">VS</span>
              <div className="flex-1 text-center">
                <div className="w-14 h-14 bg-accent/15 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                  <span className="font-satoshi font-bold text-foreground">{battle.designerB[0]}</span>
                </div>
                <p className="text-sm font-inter font-medium text-foreground">{battle.designerB}</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm text-muted-foreground font-inter">{battle.votes} votes</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Tools Preview ─── */
const tools = [
  { icon: Palette, name: 'Color Palette Generator', desc: 'Generate beautiful palettes instantly', color: 'bg-primary/10 text-primary' },
  { icon: Type, name: 'Font Library', desc: '100+ fonts to explore and download', color: 'bg-accent/10 text-accent-foreground' },
  { icon: Contrast, name: 'Contrast Checker', desc: 'Ensure WCAG accessibility', color: 'bg-primary/10 text-primary' },
  { icon: Pipette, name: 'Image Palette Extractor', desc: 'Extract colors from any image', color: 'bg-accent/10 text-accent-foreground' },
];

const ToolsPreview = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-28 px-6 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Design Tools" subtitle="Everything you need in one place" action={{ label: 'All tools', href: '/tools' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              onClick={() => navigate('/tools')}
              className="bg-card rounded-3xl p-6 border border-border card-hover cursor-pointer"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="font-satoshi font-bold text-foreground">{tool.name}</h3>
              <p className="text-muted-foreground font-inter text-sm mt-1">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Final CTA ─── */
const FinalCta = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-28 px-6 bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <img src={pixuMain} alt="Pixu" className="w-32 h-32 object-contain mx-auto mb-8 pixu-bounce" />
          <h2 className="font-satoshi font-bold text-3xl md:text-5xl text-primary-foreground mb-4">
            Become our next
            <br />
            success story!
          </h2>
          <p className="text-primary-foreground/60 font-inter text-lg max-w-lg mx-auto mb-8">
            Join thousands of designers who elevated their career with DesignVerse.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/auth')}
            className="bg-accent text-accent-foreground rounded-2xl px-8 py-4 font-semibold text-base shadow-lg"
          >
            Start now — It's free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Footer ─── */
const Footer = () => (
  <footer className="py-16 px-6 bg-foreground border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="font-satoshi font-bold text-background mb-4">The Good</h4>
          <ul className="space-y-2 text-sm font-inter text-background/50">
            <li className="hover:text-background/80 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-background/80 cursor-pointer transition-colors">Features</li>
            <li className="hover:text-background/80 cursor-pointer transition-colors">Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-satoshi font-bold text-background mb-4">The Boring</h4>
          <ul className="space-y-2 text-sm font-inter text-background/50">
            <li className="hover:text-background/80 cursor-pointer transition-colors">Privacy</li>
            <li className="hover:text-background/80 cursor-pointer transition-colors">Terms</li>
            <li className="hover:text-background/80 cursor-pointer transition-colors">Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-satoshi font-bold text-background mb-4">Play By The Rules</h4>
          <ul className="space-y-2 text-sm font-inter text-background/50">
            <li className="hover:text-background/80 cursor-pointer transition-colors">Community</li>
            <li className="hover:text-background/80 cursor-pointer transition-colors">Guidelines</li>
          </ul>
        </div>
        <div>
          <h4 className="font-satoshi font-bold text-background mb-4">The Cool</h4>
          <ul className="space-y-2 text-sm font-inter text-background/50">
            <li className="hover:text-background/80 cursor-pointer transition-colors">Twitter</li>
            <li className="hover:text-background/80 cursor-pointer transition-colors">Instagram</li>
            <li className="hover:text-background/80 cursor-pointer transition-colors">Discord</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 pt-8">
        <h2 className="font-clash font-bold text-6xl md:text-8xl lg:text-9xl text-background/10 tracking-tight">
          DesignVerse
        </h2>
      </div>
      <p className="text-background/40 font-inter text-sm mt-4">
        Crafted with ♥ by <span className="font-semibold text-background/60">Daksh Gulati</span>
      </p>
    </div>
  </footer>
);

export { HowItWorks, TrendingDesigns, CtaSection, WhyDesignVerse, TopDesigners, LatestBattles, ToolsPreview, FinalCta, Footer };
