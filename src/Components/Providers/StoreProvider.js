import React from 'react';
import {
  createFreshStore,
  createPreloadedStore,
  createStoreFromSnapshot,
} from '../../Models/Blog/StoreModel';
import { useLocalStore } from 'mobx-react-lite';

const storeContext = React.createContext(createFreshStore());

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createFreshStore);
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
