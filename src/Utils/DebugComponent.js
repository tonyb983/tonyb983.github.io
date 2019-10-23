import React from 'react';
import { forOwn, forIn } from 'lodash';

const Debug = ({ inherited, ...rest }) => {
  const props = [];
  if (inherited) {
    forIn(rest, (v, k) => props.push([k, v]));
  } else {
    forOwn(rest, (v, k) => props.push([k, v]));
  }

  return (
    <div style={{ alignSelf: 'flex-start' }}>
      {props.map(([k, v]) => (
        <pre key={k}>
          {k}: {JSON.stringify(v, null, '\t')}
        </pre>
      ))}
    </div>
  );
};

export default Debug;
