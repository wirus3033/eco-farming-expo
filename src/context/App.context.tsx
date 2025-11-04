import React, { createContext, useContext, useRef, ReactNode } from 'react';

import { Bin, Crate, Grade, Parcel, Worker } from '../Interface/global/interface_V3';
import { DataEditPoidsInterface } from '../Interface/global/database.interface';

// Type du contexte
export interface AppContextType {
  crateListe: React.MutableRefObject<Crate[]>;
  binListe: React.MutableRefObject<Bin[]>;
  workerListe: React.MutableRefObject<Worker[]>;
  parcelListe: React.MutableRefObject<Parcel[]>;
  gradeListe: React.MutableRefObject<Grade[]>;
  synchronizePeseeBacListe: React.MutableRefObject<DataEditPoidsInterface[]>;

  setCrateListe: (newState: Crate[]) => void;
  setBinListe: (newState: Bin[]) => void;
  setGradeListe: (newState: Grade[]) => void;
  setWorkerListe: (newState: Worker[]) => void;
  setParcelListe: (newState: Parcel[]) => void;
  setSynchronizePeseeBacListe: (newState: DataEditPoidsInterface[]) => void;
}


export const MyAppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

  const crateListe = useRef<Crate[]>([]);
  const binListe = useRef<Bin[]>([]);
  const gradeListe = useRef<Grade[]>([]);
  const workerListe = useRef<Worker[]>([]);
  const parcelListe = useRef<Parcel[]>([]);
  const synchronizePeseeBacListe = useRef<DataEditPoidsInterface[]>([]);


  const setCrateListe = (newState: Crate[]) => {
    crateListe.current = newState;
  };

  const setBinListe = (newState: Bin[]) => {
    binListe.current = newState;
  };

  const setGradeListe = (newState: Grade[]) => {
    gradeListe.current = newState;
  };

  const setWorkerListe = (newState: Worker[]) => {
    workerListe.current = newState;
  };

  const setParcelListe = (newState: Parcel[]) => {
    parcelListe.current = newState;
  };

  const setSynchronizePeseeBacListe = (newState: DataEditPoidsInterface[]) => {
    synchronizePeseeBacListe.current = newState;
  };

  return (
    <MyAppContext.Provider
      value={{
        crateListe,
        binListe,
        gradeListe,
        workerListe,
        parcelListe,
        synchronizePeseeBacListe,

        setCrateListe,
        setBinListe,
        setGradeListe,
        setWorkerListe,
        setParcelListe,
        setSynchronizePeseeBacListe,
      }}
    >
      {children}
    </MyAppContext.Provider>
  );
};

// Hook
export const useAppContext = (): AppContextType => {
  const context = useContext(MyAppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
