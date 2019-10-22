import React from 'react';
import {
  createFreshStore,
  createPreloadedStore,
  createRandomStore,
  createStoreFromSnapshot,
} from '../../Models/Blog/StoreModel';
import { useLocalStore } from 'mobx-react-lite';

const getStoreFunction = () => {
  if (process.env.NODE_ENV === 'test') {
    console.log('Creating preloaded store for test env...');
    return () => createPreloadedStore();
  }

  if (process.env.REACT_APP_PRELOAD_STORE) {
    if (process.env.REACT_APP_RANDOMIZE_STORE) {
      console.log('Creating random store...');
      return () => createRandomStore();
    }

    console.log('Creating preloaded store...');
    return () => createPreloadedStore();
  }

  console.log('Creating blank store...');
  return () => createFreshStore();
};

const storeContext = React.createContext(createFreshStore());

export const StoreProvider = ({ startingSnapshot, children }) => {
  const storeInitializer = startingSnapshot
    ? () => createStoreFromSnapshot(startingSnapshot)
    : getStoreFunction();
  const store = useLocalStore(storeInitializer);
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
