import React from 'react';
import {
  createFreshStore,
  createPreloadedStore,
  createRandomStore,
  createStoreFromSnapshot,
} from '../../Models/Blog/StoreModel';
import { useLocalStore } from 'mobx-react-lite';

const preloadedInitializer = () => createPreloadedStore();
const randomInitializer = () => createRandomStore();
const randomInitializerLogged = () => createRandomStore(true);
const freshInitializer = () => createFreshStore();
const snapshotInitializer = (snapshot) => createStoreFromSnapshot(snapshot);
const snapshotCacher = (snapshot) => () => createStoreFromSnapshot(snapshot);

const getStoreFunction = () => {
  if (process.env.NODE_ENV === 'test') {
    console.log('Creating preloaded store for test env...');
    return preloadedInitializer;
  }

  const logCreation =
    process.env.REACT_APP_LOG_STORE_CREATION && process.env.REACT_APP_LOG_STORE_CREATION === 'true'
      ? true
      : false;

  const preload =
    process.env.REACT_APP_PRELOAD_STORE && process.env.REACT_APP_PRELOAD_STORE === 'true'
      ? true
      : false;

  const randomize =
    process.env.REACT_APP_RANDOMIZE_STORE && process.env.REACT_APP_RANDOMIZE_STORE === 'true'
      ? true
      : false;

  if (preload) {
    if (randomize) {
      console.log('Creating random store...');
      return logCreation ? randomInitializerLogged : randomInitializer;
    }

    console.log('Creating preloaded store...');
    return preloadedInitializer;
  }

  console.log('Creating blank store...');
  return freshInitializer;
};

const storeContext = React.createContext(createFreshStore());

export const StoreProvider = ({ startingSnapshot, children }) => {
  const storeInitializer = startingSnapshot ? snapshotCacher(startingSnapshot) : getStoreFunction();
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
