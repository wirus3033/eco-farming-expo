import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// ✅ Ajout de l’import du provider clavier
// import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    thin: require('../assets/fonts/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const barStyle = colorScheme === 'dark' ? 'light' : 'dark';

  return (
    <SafeAreaProvider style={{ flex: 1, paddingHorizontal: 0, marginHorizontal: 0 }}>
      <SafeAreaView
        edges={['top', 'bottom', 'left', 'right']}
        style={{ flex: 1, paddingHorizontal: 0, marginHorizontal: 0 }}
      >
        {/* <KeyboardProvider> */}
          <ThemeProvider value={theme}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="Recolte" options={{ headerShown: false }} />
              <Stack.Screen name="Lavage" options={{ headerShown: false }} />
              <Stack.Screen name="Egrainage" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style={barStyle} />
          </ThemeProvider>
        {/* </KeyboardProvider> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
