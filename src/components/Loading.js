import React from 'react'
import { ActivityIndicator, View } from 'react-native';

export const Loading = () => (
  <View style={absoluteFill}>
    <ActivityIndicator />
  </View>
)
const absoluteFill = {
  position: 'absolute',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};
