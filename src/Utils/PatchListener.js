import React, { useEffect } from 'react';
import { onPatch } from 'mobx-state-tree';
import { useStore } from '../Components/Providers/StoreProvider';

const PatchListener = () => {
  const store = useStore();
  useEffect(() => {
    return onPatch(store, (patch, reversePatch) => {
      console.log(
        `Patch Listener:\npatch: ${JSON.stringify(patch, null, 2)}\nreversePatch: ${JSON.stringify(
          reversePatch,
          null,
          2,
        )}`,
      );
    });
  }, [store]);
  return <div />;
};

export default PatchListener;
