
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false, // cacher les headers par défaut
      }}
    >
      {/* Si tu veux définir des options spécifiques pour une page */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
