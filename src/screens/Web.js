import React from 'react';
import { Loading } from 'components';
import { WebView } from 'react-native-webview';

const Web = ({ navigation }) => {
const { uri } = navigation.state.params;
  return (
    <WebView
      style={webviewStyle}
      source={{ uri }}
      javaScriptEnabled
      //For the Cache
      domStorageEnabled
      //View to show while loading the webpage
      renderLoading={() => <Loading />}
      //Want to show the view or not
      startInLoadingState
    />
  );
};

const webviewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

export default Web;
