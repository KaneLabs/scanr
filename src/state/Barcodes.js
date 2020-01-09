import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { usePrevious } from './';

export const BarcodesContext = createContext([]);

export const BarcodesProvider = props => {
  const [detectedBarcodes, setDetectedBarcodes] = useDetectedBarcodes([]);

  return (
    <BarcodesContext.Provider value={[detectedBarcodes, setDetectedBarcodes]}>
      {props.children}
    </BarcodesContext.Provider>
  );
};

export const useDetectedBarcodes = (initialBarcodes = []) => {
  const [barcodes, setBarcodes] = useState(initialBarcodes);

  return [barcodes, setBarcodes];
};
