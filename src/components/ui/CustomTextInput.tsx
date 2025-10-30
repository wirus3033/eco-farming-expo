import { GRAY, TEXT_COLOR } from '@/src/constants/Colors';
import { wp } from '@/src/utils/responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, {forwardRef} from 'react';
import {View, TextInput, StyleSheet, Pressable, Image, TextInputProps} from 'react-native';


interface CustomTextInputProps extends TextInputProps {
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  clearText?: () => void;
  onPressOne?: () => void;
  onPressOff?: () => void;
  showEyeIcon?: boolean;
  keyboardType?: any;
  eye?: boolean;
  icon?: any;
  secureTextEntry?: boolean;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      value,
      placeholder,
      setValue,
      clearText,
      onPressOne,
      onPressOff,
      showEyeIcon,
      keyboardType,
      eye,
      icon,
      secureTextEntry = false,
      onSubmitEditing,
      returnKeyType = 'done',
      ...props
    },
    ref,
  ) => {
    return (
      <View style={styles.inputContainer}>
        <Image source={icon} style={{height: 18, width: 18 , marginLeft: wp(1)}} />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={value => setValue(value.trim())}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={{
            marginLeft:wp(3),
            width: '82%',
            fontSize: wp(4),
            color: TEXT_COLOR,
          }}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          {...props}
        />
        {showEyeIcon && value && (
          <Pressable style={{position: 'absolute', right: 10}} onPress={eye ? onPressOne : onPressOff} hitSlop={8}>
            <MaterialCommunityIcons name={eye ? 'eye' : 'eye-off'} size={22} color="#000" />
          </Pressable>
        )}
        {value && !showEyeIcon && (
          <Pressable style={{position: 'absolute', right: 10}} onPress={clearText}>
            <MaterialCommunityIcons name="close" size={24} color={'#000'} />
          </Pressable>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: GRAY,
    height: wp(15),
    borderRadius: 23,
    color: GRAY,
    paddingHorizontal: 10,
    
  },
});

export default CustomTextInput;
