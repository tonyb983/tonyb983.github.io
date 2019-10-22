import React from 'react';
import JSONPretty from 'react-json-pretty';
import { forOwn, forIn, transform } from 'lodash';

const Debug = ({ inherited, ...rest }) => {
  const props = [];
  if (inherited) {
    forIn(rest, (v, k) => props.push([k, v]));
  } else {
    forOwn(rest, (v, k) => props.push([k, v]));
  }

  return (
    <div style={{ alignItems: '' }}>
      {props.map(([k, v]) => (
        <JSONPretty id={k} data={v} />
      ))}
    </div>
  );
};

export default Debug;
