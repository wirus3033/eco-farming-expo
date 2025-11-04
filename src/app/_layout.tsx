import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { AppState, useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import i18n from "../i18n";
import ScanManager from "@/modules/ScanManager";
import { useContinuousScanData } from "@/modules/ScanManager/src/ScanermanagerModule";

// ✅ Ajout de l’import du provider clavier
// import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();
export type UseMode = 'dev' | 'prod'
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const scanningState = useRef(false);
  const intervalRef = useRef(null);
  const [useMode, setUseMode] = useState<UseMode>('prod');
  const [initializedScanner, setInitializedScanner] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    thin: require("../assets/fonts/Roboto-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);



  useEffect(() => {
    ScanManager.initialization()
  }, []);
  useContinuousScanData((data) => {
    console.log('scanned data in layout: ', data);
  });

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
       ScanManager.startContinuousScan();
      }, 5000);
      return () => {
        ScanManager.stopContinuousScan();
      };
    }, []),
  );

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'active') {
        const isScanning = scanningState.current;
        ScanManager.initialization()
        // console.log('scanning statezzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz : ',isScanning)
        if (isScanning) {
          // const isScannerOpen = await ScanManager.isScannerOpen();

          // await ScanManager.openScanner();
          // await ScanManager.startDecode();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        ScanManager.closeScanner()
      }
      setAppState(nextAppState);
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);


  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const barStyle = colorScheme === "dark" ? "light" : "dark";



    if (!loaded) return null;


  return (
    <SafeAreaProvider
      style={{ flex: 1, paddingHorizontal: 0, marginHorizontal: 0 }}
    >
      <SafeAreaView
        edges={["top", "bottom", "left", "right"]}
        style={{ flex: 1, paddingHorizontal: 0, marginHorizontal: 0 }}
      >
        {/* <KeyboardProvider> */}
        <ThemeProvider value={theme}>
          <I18nextProvider i18n={i18n}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="Recolte" options={{ headerShown: false }} />
              <Stack.Screen name="Lavage" options={{ headerShown: false }} />
              <Stack.Screen name="Egrainage" options={{ headerShown: false }} />
              <Stack.Screen name="appDrawer" options={{ headerShown: false }} />
            </Stack>
          </I18nextProvider>
          <StatusBar style={barStyle} />
        </ThemeProvider>
        {/* </KeyboardProvider> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
