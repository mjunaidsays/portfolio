import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { fadeInRight, staggerContainer } from '../lib/motionVariants';

const NAV_ITEMS = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, onNavigate, activeSection }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 h-full w-72 z-50 border-l border-white/10 flex flex-col"
            style={{ backgroundColor: '#0D1117' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="font-display font-bold text-xl gradient-text-electric">MJ</span>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.nav
              className="flex flex-col gap-1 p-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {NAV_ITEMS.map((section, i) => (
                <motion.button
                  key={section}
                  variants={fadeInRight}
                  custom={i * 0.04}
                  onClick={() => {
                    onNavigate(section);
                    onClose();
                  }}
                  className={`text-left px-4 py-3 rounded-xl font-display font-medium capitalize transition-colors ${
                    activeSection === section
                      ? 'text-electric-500 bg-electric-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {section}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
