import React, { useState, useEffect } from 'react'
import { withNavigationFocus } from 'react-navigation'
import { Button, Text, View } from 'react-native'
import { SafeAreaContainer } from 'components'
import BarcodeScanner from 'containers/BarcodeScanner'
import BarcodeAlert from 'containers/BarcodeAlert'
import {check, PERMISSIONS} from 'react-native-permissions';
import { openSettings } from 'react-native-permissions';
import { primaryColor } from 'constants';

const useCameraPermission = () => {
  const [cameraPermission, setCameraPermission] = useState('unavailable');

  useEffect(() => {
    const checkCameraPermissions = async () => {
      const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
      setCameraPermission(cameraStatus)
    }

    checkCameraPermissions();
  }, []);

  return cameraPermission;
};

const HomeScreen = ({ isFocused }) => {
  const cameraPermission = useCameraPermission();

  if (cameraPermission === 'blocked') {
    return (
      <SafeAreaContainer center>
        <Text>
          {'You blocked access to the camera.'}
        </Text>
        <Button
          color={primaryColor}
          title={'Open Settings'}
          onPress={() => openSettings()}
        />
      </SafeAreaContainer>
    );
  }

  return (
    <>
      <BarcodeScanner />
      <BarcodeAlert />
    </>
  );
}

export default withNavigationFocus(HomeScreen)
