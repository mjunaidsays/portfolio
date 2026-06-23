import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 300 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    const attachListeners = () => {
      document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot will-change-transform"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={`cursor-ring will-change-transform${isHovering ? ' hovering' : ''}`}
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: isVisible ? (isHovering ? 0.3 : 0.5) : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
