import React, { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../../../Hooks/useDimensions';
import { defaultRoutes } from '../defaultRoutes';
import MenuToggle from './MenuToggle';
import Navigation from './Navigation';

import './MotionNav.css';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const MotionNav = ({ routes }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  if (!routes) {
    routes = defaultRoutes;
  }

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="background" variants={sidebar} />
      <Navigation routes={routes} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default MotionNav;
