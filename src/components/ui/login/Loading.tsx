import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import { useTranslation } from 'react-i18next';
import { hp, wp } from '../../../utils/responsive';
import { TEXT_COLOR } from '../../../constants/Colors';
import CustomToaster from './CustomToaster';

interface PropsLoading {
  toastVisible: boolean;
  isConnectedInternet: boolean;
  title: string;
}

const Loading: React.FC<PropsLoading> = ({toastVisible, isConnectedInternet, title}) => {
  const {t}=useTranslation('LOGING')
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(10),
          }}>
          {/* <LottieView source={Lottie.loader_scan} style={styles.lottieBackground} autoPlay loop speed={2} /> */}
          {/* <Image source={Images.logo_2} resizeMode="contain" style={styles.logo} /> */}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textSubtitle}>{t("LOGING:PLEASE_WAIT")}</Text>
        </View>
        {!isConnectedInternet && <CustomToaster visible={toastVisible} isConnexion={isConnectedInternet} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red', 
  },
  lottieBackground: {
    position: 'absolute',
    width: wp(50),
    height: wp(50),
    zIndex: -1,
  },
  logo: {
    width: wp(35),
    height: wp(35),
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    paddingTop: hp(5),
    zIndex: 1,
  },
  textTitle: {
    fontSize: 24,
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  textSubtitle: {
    fontSize: 20,
    color: TEXT_COLOR,
    textAlign: 'center',
  },
});

export default Loading;
