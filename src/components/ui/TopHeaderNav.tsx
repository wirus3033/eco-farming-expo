import {View,  Image, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import { hp, wp } from '@/src/utils/responsive';
import { Images } from '@/src/constants/Images';
import Text from './Text';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';


interface Props {
  title: string;
  subtitle: string;
}

const TopHeaderNav: FC<Props> = ({title, subtitle}) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
const navigation = useNavigation();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingVertical: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: wp(4),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.logo_3}
            style={{
              width: wp(10),
              height: wp(10),
              marginRight: wp(3),
            }}
          />
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: wp(4),
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: '#9a9a9a',
                fontSize: wp(3),
              }}>
              {subtitle}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleDrawer}>
          <Image
            source={Images.menuIcon}
            style={{
              width: wp(7),
              height: wp(7),
            }}
          />
        </TouchableOpacity>
      </View>
      {/* <DrawerNavigation
        isVisible={isDrawerVisible}
        closeModale={() => setIsDrawerVisible(false)}
      /> */}
    </View>
  );
};

export default TopHeaderNav;
