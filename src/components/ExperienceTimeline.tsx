import { motion } from 'framer-motion';
import { Building, Calendar } from 'lucide-react';
import { fadeInLeft, viewportOnce } from '../lib/motionVariants';

interface Experience {
  position: string;
  company: string;
  duration: string;
  isCurrent?: boolean;
}

interface ExperienceTimelineProps {
  experience: Experience[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Vertical connector line */}
      <div className="timeline-line" />

      {experience.map((exp, index) => (
        <motion.div
          key={index}
          className="relative pl-16 pb-10 last:pb-0"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={index * 0.15}
        >
          {/* Timeline dot */}
          <div
            className={`timeline-dot ${exp.isCurrent ? 'timeline-dot-electric' : 'timeline-dot-violet'}`}
          />

          {/* Card */}
          <motion.div
            className="bg-base-700/60 backdrop-blur border border-white/8 rounded-2xl p-6 border-l-2 border-l-electric-500/30 hover:border-l-electric-500/70 transition-colors duration-300"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{exp.position}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Building className="w-3.5 h-3.5 text-electric-500 flex-shrink-0" />
                  <span className="text-electric-500 font-medium text-sm">{exp.company}</span>
                </div>
              </div>
              {exp.isCurrent && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/15 text-green-400 rounded-full text-xs font-medium border border-green-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{exp.duration}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
