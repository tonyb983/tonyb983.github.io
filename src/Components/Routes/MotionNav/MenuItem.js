import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import './MotionNav.css';

const IconDiv = styled.div(
  {
    margin: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    flex: '40px 0',
    textAlign: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
  },
  (props) => ({ color: `2px solid ${props.color}` }),
);

const TextDiv = styled.div(
  {
    margin: '10px',
    borderRadius: '5px',
    width: '180px',
    height: '20px',
    flex: '1',
    textAlign: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
  },
  (props) => ({ color: `2px solid ${props.color}` }),
);

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
  //console.log(`(MenuItem) color: '${color}' route: ${JSON.stringify(route, null, 2)}`);

  const { name, url, icon = '' } = route;
  const style = { border: `2px solid ${color}` };

  return (
    <motion.li variants={menuItemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link to={url}>
        <IconDiv color={color}>{icon ? icon : name[0]}</IconDiv>
        <TextDiv color={color}>{name}</TextDiv>
      </Link>
    </motion.li>
  );
};

export default MenuItem;
