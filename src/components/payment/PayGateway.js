import React, {useState, useEffect} from 'react';
import {View, Alert, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {Header} from '../commomheader/CommonHeader';

const PayGateway = ({navigation, route}) => {
  const {payURL} = route.params;
  const devWidth = Dimensions.get('screen').width;
  const devHeight = Dimensions.get('screen').height;
  const webView = React.useRef(null);

  useEffect(() => {
    console.log(payURL, 'gateway');
    // fetchData();
  }, []);

  // webView ={
  //     canGoBack: false,
  //     injectedJavaScript: false,
  //     ref: null
  // }

  const onBack = () => {
    console.log(webView, 'gateway');
    navigation.goBack();
  };

  return (
    <>
      <Header isBack={true} close={() => onBack()} />
      <WebView
        source={{uri: payURL}}
        ref={webView}
        onLoadProgress={event => {
          console.log('Event ', event.nativeEvent.url);
          let actualEvent = event.nativeEvent;
          if (
            actualEvent &&
            actualEvent.title &&
            actualEvent.title.indexOf('sharewheelz.in/api/auth/paysuccess') == 0
          ) {
            console.log('success event');
            navigation.navigate('PaymentHistory');
          }
        }}
        onMessage={event => console.log('On Message', event)}
        style={{width: devWidth, height: devHeight}}
      />
    </>
  );
};

export default PayGateway;
