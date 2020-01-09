import React, {useContext, useEffect, useState} from 'react';
import {
  Animated,
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {BarcodesContext, usePrevious} from 'state';
import {withNavigation} from 'react-navigation';
import {primaryColor} from 'constants';

const BarcodeAlert = ({navigation}) => {
  const [barcodes] = useContext(BarcodesContext);
  const previousLength = usePrevious(barcodes.length);
  const [displayAlert, setDisplayAlert] = useState(false);
  const animatedValue = new Animated.Value(0);
  const navigate = () => {
    setDisplayAlert(false);
    navigation.navigate('Links');
  };

  useEffect(() => {
    if (previousLength < barcodes.length) {
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 7000);
    }
  }, [barcodes.length]);

  const grow = () => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  const shrink = () => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
    }).start();
  }

  useEffect(() => {
    if (displayAlert) {
      grow()
    }
    if (!displayAlert) {
      shrink();
    }
  }, [displayAlert]);

  const marginTop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-48, 0],
  });

  const alertHeight = {marginTop};

  const alertText = `${barcodes.length} QR Code${barcodes.length > 1 ? 's' : ''} Saved`;

  return (
    <Animated.View style={[styles.alert, alertHeight]}>
      <Text style={styles.text}>{alertText}</Text>

      <Button title={'VIEW'} onPress={() => navigate()} color={primaryColor} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alert: {
    overflow: 'hidden',
    height: 48,
    width: '100%',
    backgroundColor: '#FFF',
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  text: {color: '#999'},
});

export default withNavigation(BarcodeAlert);
