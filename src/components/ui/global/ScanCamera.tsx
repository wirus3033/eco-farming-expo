import { StyleSheet, Text, View } from "react-native";
import React, { FC, useRef } from "react";
// import { BarCodeReadEvent, RNCamera } from "react-native-camera";
import { wp } from "@/src/utils/responsive";
import { GREEN } from "@/src/constants/Colors";

interface Props {
  title: string;
  error: string;
  titleBolde: string;
  subTitle: string;
  handleBarCodeRead: (scannedCode: string, type?: string) => void;
}
const ScanCamera: FC<Props> = (props) => {
  const scannedValue = useRef("");
  // const codeReaded = (data: BarCodeReadEvent) => {
  //   if (props.error === "") {
  //     props.handleBarCodeRead(data.data);
  //     scannedValue.current = data.data;
  //   }
  // };
  return (
    <View style={[{ flex: 1 }, wp(1) < 3.5 && { marginTop: 40 }]}>
      {/* <RNCamera
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.on}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={codeReaded}
        captureAudio={false}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              color: GREEN,
              textAlign: "center",
            }}
          >
            {props.title}{" "}
            <Text style={{ fontWeight: "bold" }}>{props.titleBolde}</Text>
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "red",
              textAlign: "center",
            }}
          >
            {props.subTitle}
          </Text>
        </View>
      </RNCamera> */}
    </View>
  );
};

export default ScanCamera;

const styles = StyleSheet.create({});
