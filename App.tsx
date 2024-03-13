
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview'
import messaging from '@react-native-firebase/messaging';
import { Text, View } from 'react-native';
const App = () => {



  const [deviceToken, setDeviceToken] = useState<string>('');

  useEffect(() => {
    messaging().getToken().then(token => {
      setDeviceToken(token);
    });
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    })
  })


  if (deviceToken) {
    return <WebView javaScriptEnabled source={{
      uri: 'https://apluskiratakip.com',
    }} style={{ flex: 1 }} injectedJavaScript={`
  localStorage.setItem("deviceToken","${deviceToken}");
  console.log("deviceToken", localStorage.getItem("deviceToken"));

`}
      onMessage={(event) => {
        // Web sayfasından gelen mesajı işleyebilirsiniz
        const deviceId = event.nativeEvent.data;
        console.log('Device ID:', deviceId);
      }}

    />
  }

  return (
    <View>
      <Text> Yükleniyor</Text>
    </View>
  )
}

export default App
