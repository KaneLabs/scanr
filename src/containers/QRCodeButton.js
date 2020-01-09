import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {BarcodesContext} from 'state';
import {withNavigation} from 'react-navigation';
import {primaryColor} from 'constants';

const QRCodeButton = ({navigation}) => {
  const [barcodes] = useContext(BarcodesContext);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Links')}>
      <Badge amount={barcodes.length} />
      <AntIcon
        name="qrcode"
        size={32}
        color={'rgba(255,255,255,0.7)'}
        backgroundColor={'rgba(0,0,0,0)'}
      />
    </TouchableOpacity>
  );
};

const Badge = ({amount}) => {
  if (amount === 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <Text style={[styles.caption, {color: '#999'}]}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
  },
  badge: {
    height: 18,
    width: 18,
    borderRadius: 18,
    backgroundColor: '#FFF',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontSize: 12,
    color: '#FFF',
  },
});

export default withNavigation(QRCodeButton);
