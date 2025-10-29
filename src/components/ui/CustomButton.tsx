import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

import LottieView from 'lottie-react-native';
import { GREEN, LIGHT_GRAY_COLOR, TEXT_COLOR } from '@/src/constants/Colors';


interface CustomButtonProps {
  onPress: () => void;
  text: string;
  type?: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
  disabled?: boolean;
  isBtnMain?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  type = 'PRIMARY',
  disabled = false,
  isBtnMain = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        stylesBoutton.container,
        stylesBoutton[`container_${type}` as keyof typeof stylesBoutton],
        disabled && stylesBoutton.disabled,
        isBtnMain && {borderRadius: 5},
      ]}>
      <Text
        style={[
          stylesBoutton.text,
          stylesBoutton[`text_${type}` as keyof typeof stylesBoutton],
          disabled && stylesBoutton.disabledText,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const stylesBoutton = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  container_PRIMARY: {
    flexDirection: 'row',
    backgroundColor: GREEN,
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    alignItems: 'center',
    maxHeight: 54,
    minHeight: 54,
  },
  container_SECONDARY: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY_COLOR,
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    alignItems: 'center',
    maxHeight: 54,
    minHeight: 54,
  },
  container_TERTIARY: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    maxHeight: 64,
    paddingBottom: 5,
    minHeight: 64,
    justifyContent: 'center',
    marginBottom: 10,
  },
  text_PRIMARY: {
    marginTop: 5,
  },
  text_SECONDARY: {
    color: TEXT_COLOR,
  },
  text_TERTIARY: {
    // marginTop: 5,
    color: '#000',
  },
  container_WHITE: {
    backgroundColor: 'white',
    borderBottomColor: 'black',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  text_WHITE: {
    color: 'black',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#000',
  },
});

export default CustomButton;
