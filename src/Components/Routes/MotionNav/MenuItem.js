import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './MotionNav.css';

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ route, color }) => {
  console.log(`(MenuItem) color: '${color}' route: ${JSON.stringify(route, null, 2)}`);

  const { name, url, icon = '' } = route;
  const style = { border: `2px solid ${color}` };

  return (
    <motion.li variants={menuItemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link to={url}>
        <div className="icon-placeholder" style={style}>
          {icon ? icon : name[0]}
        </div>
        <div className="text-placeholder" style={style}>
          {name}
        </div>
      </Link>
    </motion.li>
  );
};

export default MenuItem;
