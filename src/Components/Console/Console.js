import React, { useState, useEffect } from 'react';
import ReactTerminal, { ReactThemes } from 'react-terminal-component';
import { OrbitSpinner } from 'react-epic-spinners';

const Console = (props) => {
  const [isInit, setInit] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setInit(true);
    }, 1000 * 10);
    return () => {
      if (!isInit) {
        clearTimeout(timeout);
      }
    };
  }, [isInit]);

  return <div>{isInit ? <ReactTerminal /> : <OrbitSpinner />}</div>;
};

export default Console;
