import { motion } from 'framer-motion';
import { cardHover } from '../lib/motionVariants';
import type { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
  gradient: string;
  link?: string;
}

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { title, description, technologies, icon: Icon, gradient } = project;

  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-7 flex flex-col h-full cursor-pointer overflow-hidden"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      onClick={() => onOpen(project)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover inner glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(0,217,255,0.05)' }}
      />

      <div className={`w-14 h-14 ${gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-electric-500 transition-colors leading-tight">
        {title}
      </h3>

      <p className="text-gray-400 leading-relaxed mb-5 text-sm flex-grow line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 bg-electric-500/10 text-electric-400 rounded-full text-xs font-medium border border-electric-500/20"
          >
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="px-2.5 py-1 bg-white/5 text-gray-400 rounded-full text-xs border border-white/10">
            +{technologies.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-electric-500 text-sm font-medium">
        View Details
        <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 } }} transition={{ duration: 0.2 }}>
          →
        </motion.span>
      </div>
    </motion.div>
  );
}
