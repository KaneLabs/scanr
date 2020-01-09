import React, { Component, useContext, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { BarcodesContext } from 'state';
import { formatDistanceToNow } from 'date-fns';
import { now, filterBarcode } from 'fns';
import { withNavigation } from 'react-navigation';
import { EmptyListPlaceholder, SwipeableRow } from 'components';

const LinkRow = ({ uri, domain, scannedAt, onPress }) => {
  return (
    <RectButton style={styles.rectButton} onPress={onPress}>
      <Text style={styles.fromText}>{domain}</Text>
      <Text numberOfLines={2} style={styles.messageText}>
        {uri}
      </Text>
      <Text style={styles.dateText}>
        {formatDistanceToNow(scannedAt)} {'❭'}
      </Text>
    </RectButton>
  );
};

const SwipeableLinkRow = ({ barcode, index, removeBarcode, onPress }) => {
  return (
    <SwipeableRow removeBarcode={removeBarcode}>
      <LinkRow {...barcode} onPress={onPress} />
    </SwipeableRow>
  );
};

const SwipeableList = ({ navigation }) => {
  const onPress = barcode => {
    navigation.navigate('Web', barcode);
  };

  const [barcodes, setBarcodes] = useContext(BarcodesContext);

  const removeBarcode = async barcode => {
    const nextBarcodes = filterBarcode(barcode)(barcodes);
    await AsyncStorage.setItem('barcodes', JSON.stringify({ barcodes: nextBarcodes }));
    return setBarcodes(nextBarcodes);
  };

  return (
    <FlatList
      data={barcodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => (
        <EmptyListPlaceholder message={'You do not have any links.'} />
      )}
      renderItem={({ item: barcode, index }) => (
        <SwipeableLinkRow
          onPress={() => onPress(barcode)}
          removeBarcode={() => removeBarcode(barcode)}
          barcode={barcode}
          index={index}
        />
      )}
      keyExtractor={(item, index) => `link ${index}`}
    />
  );
};

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default withNavigation(SwipeableList);
