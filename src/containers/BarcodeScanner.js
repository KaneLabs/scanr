import React, { useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import { BreathingScannerIcon, SafeAreaContainer } from 'components';
import { BarcodesContext, useDetectedBarcodes } from 'state';
import { scanDataToNextBarcodes } from 'fns';
import { primaryColorOpaqueLight } from 'constants';

import IonIcon from 'react-native-vector-icons/Ionicons';

const BarcodeScanner = () => {
  const [barcodes, setBarcodes] = useContext(BarcodesContext);

  const onBarCodeRead = async ({ data, type }) => {
    const nextBarcodes = scanDataToNextBarcodes(data)(barcodes);
    const savedBarcodes = { barcodes: nextBarcodes };
    await AsyncStorage.setItem('barcodes', JSON.stringify(savedBarcodes));
    return setBarcodes(nextBarcodes);
  };

  return (
    <Camera
      captureAudio={false}
      onBarCodeRead={onBarCodeRead}
      barCodeTypes={[Camera.Constants.BarCodeType.qr]} // only QR codes will be scanned
      style={cameraStyles}>
      <SafeAreaContainer center>
        <BreathingScannerIcon />
      </SafeAreaContainer>
    </Camera>
  );
};

const cameraStyles = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

export default BarcodeScanner;
