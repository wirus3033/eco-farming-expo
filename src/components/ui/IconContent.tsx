import {View, Image} from 'react-native';
import React from 'react';
import {Images} from '../../constants/Images';
import { Fonts } from '@/src/constants/Font';
import Text from './Text';
import { wp } from '@/src/utils/responsive';

const IconContent = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: wp(8),
          marginLeft: 10,
          fontFamily: Fonts.thin,
        }}>
        ec
      </Text>
      <Image
        source={Images.logo_black}
        resizeMode="contain"
        style={{
          width: wp(8),
          height: 30,
          marginHorizontal: 2,
        }}
      />
      <Text
        style={{
          color: '#000',
          fontSize: wp(8),
          fontFamily: Fonts.thin,
        }}>
        farming
      </Text>
    </View>
  );
};

export default IconContent;
