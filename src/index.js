import React, { useState, useEffect, useContext } from 'react';
import StackNavigator from 'navigation/StackNavigator';
import { createAppContainer } from 'react-navigation';
import { AsyncStorage, StatusBar } from 'react-native';
import { BarcodesProvider, BarcodesContext } from 'state';
import RNBootSplash from 'react-native-bootsplash';

const StackApp = createAppContainer(StackNavigator);

const App = () => {
  const [barcodes, setBarcodes] = useContext(BarcodesContext);

  const init = async () => {
    const readSavedBarcodes = async () => {
      const savedBarcodes = await AsyncStorage.getItem('barcodes');

      if (savedBarcodes) {
        const { barcodes } = JSON.parse(savedBarcodes);
        setBarcodes(barcodes);
      }
    };

    await readSavedBarcodes();
  };

  useEffect(() => {
    init().finally(() => {
      // without fadeout: RNBootSplash.hide()
      RNBootSplash.hide({ duration: 250 });
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <StackApp theme="light" />
    </>
  );
};

const AppContainer = () => {
  return (
    <BarcodesProvider>
      <App />
    </BarcodesProvider>
  );
};

export default AppContainer;
