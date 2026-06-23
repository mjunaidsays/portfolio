import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from './ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            key="modal"
            className="fixed inset-4 md:inset-12 lg:inset-20 z-50 bg-base-800 border border-white/10 rounded-2xl overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between mb-8">
                <div className={`w-16 h-16 ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <project.icon className="w-8 h-8 text-white" />
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                {project.title}
              </h2>

              <p className="text-gray-300 text-base leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider text-gray-500">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-electric-500/10 text-electric-400 rounded-full text-sm border border-electric-500/20 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && project.link !== '#' && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-electric-500 text-base-900 font-display font-semibold rounded-xl glow-electric hover:bg-electric-400 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
