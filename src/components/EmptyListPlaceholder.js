import React from 'react';
import { View, Text } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { SafeAreaContainer } from 'components';

export const EmptyListPlaceholder = ({ message = null }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AntIcon name="frowno" size={64} color={'#e84b0f'} />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  subContainer: { padding: 12 },
  messageText: { color: 'rgba(0,0,0,0.5)', fontSize: 16 },
};
