import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, Pressable, View } from 'react-native';

const CustomTabButton = ({ onPress, children, style, tabBarPressColor = '#FF9999' }: any) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: tabBarPressColor }}
    style={({ pressed }) => [
      { flex: 1, alignItems: 'center', justifyContent: 'center' },
      Platform.OS === 'ios' && pressed ? { backgroundColor: tabBarPressColor + '33' } : null,
      style,
    ]}
  >
    {children}
  </Pressable>
);

export default function TabLayout() {
  const recolteIcon = require('@/src/assets/images/icons/Recolte32_Noir@dpi1_5x.png');
  const lavageIcon = require('@/src/assets/images/icons/Lavage32_Noir@dpi1_5x.png');
  const egrainageIcon = require('@/src/assets/images/icons/filtre32_Noir@dpi1_5x.png');

  const iconProps = { fadeDuration: 0 as const, resizeMode: 'contain' as const }; 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7DDA58',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: { fontSize: 15 },
        tabBarButton: (props) => <CustomTabButton {...props} tabBarPressColor="#FF9999" />,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#FFF',
          paddingTop: 6,
          paddingBottom: 10,
          ...(Platform.OS === 'android'
            ? { elevation: 6 }
            : {
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: -2 },
                shadowRadius: 8,
              }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Récolte',
          tabBarIcon: ({ color }) => (
            <Image {...iconProps} source={recolteIcon} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="lavage"
        options={{
          title: 'Lavage',
          tabBarIcon: ({ color }) => (
            <Image {...iconProps} source={lavageIcon} style={{ width: 28, height: 28, tintColor: color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="egrainage"
        options={{
          title: 'Égrainage',
          tabBarIcon: ({ color }) => (
            <Image {...iconProps} source={egrainageIcon} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
      />
    </Tabs>
  );
}
