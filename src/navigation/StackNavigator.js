import React from 'react';
import { Dimensions } from 'react-native';
import HomeScreen from 'screens/Home';
import LinksScreen from 'screens/Links';
import WebScreen from 'screens/Web';
import QRCodeButton from 'containers/QRCodeButton';
import { primaryColor } from 'constants';

import { createStackNavigator } from 'react-navigation-stack';

const { width } = Dimensions.get('window');

const routeConfig = {
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Scanr',
      headerRight: () => <QRCodeButton />,
    }),
  },
  Links: {
    screen: LinksScreen,
    navigationOptions: () => ({
      title: 'Links',
    }),
  },
  Web: {
    screen: WebScreen,
    navigationOptions: () => ({
      title: 'Link',
    }),
  },
};

const navigatorOptions = {
  initialRouteName: 'Home',
  drawerType: 'front',
  drawerWidth: '100%',
  edgeWidth: '100%',
  drawerPosition: 'right',
  defaultNavigationOptions: {
    headerTintColor: 'rgba(255,255,255,0.7)',
    headerTitleStyle: {
      color: 'rgba(255,255,255,0.85)',
    },
    headerStyle: {
      backgroundColor: primaryColor, // Specify the height of your custom header
    },
  },
};

const StackNavigator = createStackNavigator(routeConfig, navigatorOptions);

export default StackNavigator
