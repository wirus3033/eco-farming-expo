import {View, Text} from 'react-native';
import React from 'react';
import { GREEN, TEXT_COLOR } from '@/src/constants/Colors';
import { hp, wp } from '@/src/utils/responsive';
import { Fonts } from '@/src/constants/Font';


const CustomLogo = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: -hp(5),
        // marginBottom: -hp(6),
      }}>
      <Text
        style={{
          color: GREEN,
          fontSize: wp(6.5),
          fontFamily: Fonts.thin,
        }}>
        eco
      </Text>
      <Text
        style={{
          color: TEXT_COLOR,
          fontSize: wp(6.5),
          fontFamily: Fonts.thin,
        }}>
        farming
      </Text>
    </View>
  );
};

export default CustomLogo;
