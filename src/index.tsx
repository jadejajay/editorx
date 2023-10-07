import 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { usePreventScreenCapture } from 'expo-screen-capture';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import functions from '@react-native-firebase/functions';
import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/core';
import { RootNavigator } from '@/navigation';

hydrateAuth();
loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const auth = firebase.auth();
  auth.useEmulator('http://192.168.0.8:9099');
  firestore().useEmulator('192.168.0.8', 8080);
  storage().useEmulator('192.168.0.8', 9199);
  // firebase.functions().useEmulator('192.168.0.8', 5001);
  /**
   * Renders the main application component.
   *
   * @return {JSX.Element} The rendered application component.
   */
  usePreventScreenCapture();

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <APIProvider>
          <RootNavigator />
          <FlashMessage position="top" />
        </APIProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
