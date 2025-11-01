
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function Layout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen
        name="index"
        options={{
        //   headerShown: false,
        }}
      />
      <Stack.Screen
        name="weigh"
        options={{
        //   headerShown: false,
        }}
      />
      <Stack.Screen
        name="sendUsine"
        options={{
        //   headerShown: false,
        }}
      />
    </Stack>
  );
}
