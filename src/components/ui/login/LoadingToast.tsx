import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import CustomToaster from "./CustomToaster";
import { useTranslation } from "react-i18next";
import { Lottie } from "@/src/constants/Lottie";
import { hp, wp } from "@/src/utils/responsive";
import { Images } from "@/src/constants/Images";
import { TEXT_COLOR } from "@/src/constants/Colors";
import Text from "../Text";

interface PropsLoading {
  toastVisible: boolean;
  isConnectedInternet: boolean;
  title: string;
}

const LoadingToast: React.FC<PropsLoading> = ({
  toastVisible,
  isConnectedInternet,
  title,
}) => {
  const { t } = useTranslation("LOGING");
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(10),
          }}
        >
          <LottieView
            source={Lottie.loader_scan}
            style={styles.lottieBackground}
            autoPlay
            loop
            speed={2}
          />
          <Image
            source={Images.logo_2}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textSubtitle}>{t("LOGING:PLEASE_WAIT")}</Text>
        </View>
        {!isConnectedInternet && (
          <CustomToaster
            visible={toastVisible}
            isConnexion={isConnectedInternet}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"red"
  },
  lottieBackground: {
    position: "absolute",
    width: wp(45),
    height: wp(45),
    zIndex: -1,
  },
  logo: {
    width: wp(30),
    height: wp(30),
    zIndex: 1,
  },
  textContainer: {
    alignItems: "center",
    paddingTop: hp(8),
    // marginTop: hp(10),
    zIndex: 1,
  },
  textTitle: {
    fontSize: wp(5),
    color: TEXT_COLOR,
    fontWeight: "bold",
  },
  textSubtitle: {
    fontSize: wp(4),
    color: TEXT_COLOR,
    textAlign: "center",
  },
});

export default LoadingToast;
