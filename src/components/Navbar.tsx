import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 border-b border-white/5"
        animate={{
          backgroundColor: scrolled ? 'rgba(8, 12, 20, 0.97)' : 'rgba(8, 12, 20, 0.75)',
          paddingTop: scrolled ? '10px' : '16px',
          paddingBottom: scrolled ? '10px' : '16px',
        }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.button
            onClick={() => onNavigate('home')}
            className="font-display font-bold text-2xl gradient-text-electric"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            MJ
          </motion.button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className="relative px-3 py-2 capitalize text-sm font-medium group"
              >
                <span
                  className={`transition-colors duration-200 ${
                    activeSection === section
                      ? 'text-electric-500'
                      : 'text-gray-400 group-hover:text-white'
                  }`}
                >
                  {section}
                </span>
                {activeSection === section && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-px left-3 right-3 h-px bg-electric-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        activeSection={activeSection}
      />
    </>
  );
}
