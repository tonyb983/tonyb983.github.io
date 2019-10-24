import React from 'react';
import { motion } from 'framer-motion';
import { times, map } from 'lodash';
import { lerpColor } from '../../../Utils/lerpColor';
import Debug from '../../../Utils/DebugComponent';
import MenuItem from './MenuItem';

import './MotionNav.css';

const startColor = '#FF008C';
const endColor = '#4400FF';

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ routes }) => {
  const colors = times(routes.length, (i) =>
    lerpColor(startColor, endColor, i / (routes.length - 1)),
  );

  console.log(`(Navigation) routes: ${JSON.stringify(routes, null, 2)}`);

  return (
    <motion.ul variants={navVariants}>
      {routes.map((route, index) => (
        <MenuItem color={colors[index]} route={route} key={route.name} />
      ))}
    </motion.ul>
  );
};

export default Navigation;
