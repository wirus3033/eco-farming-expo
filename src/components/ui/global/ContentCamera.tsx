import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import LottieView from "lottie-react-native";
import { hp, wp } from "@/src/utils/responsive";
import { RED, TEXT_COLOR } from "@/src/constants/Colors";
import { useTranslation } from "react-i18next";
import { Lottie } from "@/src/constants/Lottie";
import ScanCamera from "./ScanCamera";

interface Props {
  isLoading?: boolean;
  error?: string;
  scan_text?: string;
  stepNavigation?: number;
  handleBarCodeRead?: (code: string, type?: string) => void;
}

const ContentCamera: FC<Props> = ({
  isLoading,
  error,
  scan_text,
  stepNavigation,
  handleBarCodeRead,
}) => {
  const { t, i18n } = useTranslation("AFFECTATION_BIN_PARCELLE");
  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            source={Lottie.loader_scan}
            style={{ width: wp(60), height: wp(60), marginBottom: 20 }}
            autoPlay
            speed={1}
          />
          <Text style={[styles.subTytle, { marginTop: 20 }]}>
            {t("AFFECTATION_BIN_PARCELLE:TEXT_PATIENTER")}
          </Text>
        </View>
      ) : (
        <View
          style={[
            { flex: 1, justifyContent: "center", width: "100%", zIndex: -1 },
          ]}
        >
          <ScanCamera
            error={error}
            handleBarCodeRead={handleBarCodeRead}
            title={""}
            titleBolde={""}
            subTitle={""}
          />
          <LottieView
            source={Lottie.scanCamera}
            style={{
              width: wp(90),
              height: wp(90),
              position: "absolute",
              alignSelf: "center",
            }}
            autoPlay={true}
            speed={0.5}
          />
           <View
            style={{
              flex: 1,
              width: '100%',
              position: 'absolute',
              bottom: hp(0),
              backgroundColor:  '#00000038',
              minHeight: stepNavigation === 0 ? wp(15) : wp(30),
            }}>
            <Text style={[styles.titleRed]}>{scan_text}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default ContentCamera;

const styles = StyleSheet.create({
  subTytle: {
    fontSize: wp(4.5),
    color: TEXT_COLOR,
  },
   titleRed: {
    fontSize: 16,
    color: RED,
    textAlign: 'center',
    marginTop: hp(2),
  },
});
