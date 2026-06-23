import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Brain, Code, Bot, Languages, Zap, ChevronDown, Award } from 'lucide-react';
import { fadeInUp } from '../lib/motionVariants';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const SKILLS = [
  { label: 'Python',   Icon: Languages, color: '#3B82F6' },
  { label: 'AI / ML',  Icon: Brain,     color: '#00D9FF' },
  { label: "LLM's",   Icon: Bot,       color: '#A78BFA' },
  { label: 'FastAPI',  Icon: Code,      color: '#10B981' },
  { label: 'RAG',      Icon: Award,     color: '#F59E0B' },
  { label: 'Agents',   Icon: Zap,       color: '#EC4899' },
];

function SkillCycler() {
  const [index, setIndex] = useState(0);
  const current = SKILLS[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SKILLS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular frame */}
      <div className="relative w-52 h-52">
        {/* Dynamic glow behind — color shifts with current skill */}
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-colors duration-700"
          style={{ backgroundColor: current.color, opacity: 0.18 }}
        />

        {/* Static gradient border ring */}
        <div
          className="relative w-full h-full rounded-full p-[2px]"
          style={{ background: 'linear-gradient(135deg, rgba(0,217,255,0.5) 0%, rgba(124,58,237,0.5) 100%)' }}
        >
          {/* Inner dark circle */}
          <div className="w-full h-full rounded-full bg-base-900 flex flex-col items-center justify-center gap-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.4, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2"
              >
                <current.Icon
                  className="w-16 h-16"
                  style={{ color: current.color }}
                />
                <span
                  className="text-sm font-display font-semibold tracking-wide"
                  style={{ color: current.color }}
                >
                  {current.label}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}

const badges = [
  { label: 'AI/ML',     Icon: Brain,     delay: 0 },
  { label: 'FastAPI',   Icon: Code,      delay: 0.4 },
  { label: "LLM's",    Icon: Bot,       delay: 0.8 },
  { label: 'Python',    Icon: Languages, delay: 1.2 },
  { label: 'Databases', Icon: Zap,       delay: 1.6 },
];

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const heroContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,217,255,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(124,58,237,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: text content */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-electric-500/10 border border-electric-500/20 rounded-full text-electric-500 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-electric-500 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} custom={0.1} className="space-y-3">
            <p className="text-lg text-gray-400 font-medium">Hi, I'm</p>
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight gradient-text-electric">
              Muhammad Junaid Sarfraz
            </h1>
            <div className="text-2xl lg:text-3xl font-display font-semibold text-gray-300">
              Full Stack{' '}
              <span className="text-electric-500">AI Engineer</span>
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} custom={0.2} className="text-lg text-gray-400 leading-relaxed max-w-xl">
            Passionate software engineer specializing in AI/ML solutions, full-stack development,
            and cutting-edge technologies. Building intelligent applications that solve real-world problems.
          </motion.p>

          <motion.div variants={fadeInUp} custom={0.3} className="flex flex-col sm:flex-row gap-4 pt-2">
            <MagneticButton
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 bg-electric-500 text-base-900 rounded-2xl font-display font-semibold glow-electric hover:bg-electric-400 transition-colors text-center"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 border border-electric-500/30 text-electric-500 rounded-2xl font-display font-semibold hover:bg-electric-500/10 hover:border-electric-500/60 transition-all text-center"
            >
              Get In Touch
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right: skill cycler + orbital badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] lg:h-[500px] flex items-center justify-center"
        >
          {/* Ambient glow backdrop */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-electric-500/10 to-violet-600/10 blur-3xl" />

          {/* Skill cycler centered */}
          <div className="relative z-10">
            <SkillCycler />
          </div>

          {/* Orbital floating badges */}
          {badges.map(({ label, Icon, delay }, i) => {
            const angle = (i / badges.length) * 360 - 90;
            const radius = 170;
            const rad = (angle * Math.PI) / 180;
            const cx = Math.cos(rad) * radius;
            const cy = Math.sin(rad) * radius;

            return (
              <motion.div
                key={label}
                className="absolute bg-base-700/90 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
                style={{ left: '50%', top: '50%' }}
                initial={{ opacity: 0, x: cx, y: cy, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: cx,
                  y: cy,
                  scale: 1,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                transition={{ duration: 0.6, delay: 0.6 + delay, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 text-electric-500" />
                  <span className="text-xs font-medium text-white whitespace-nowrap">{label}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
