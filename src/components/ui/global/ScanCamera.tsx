import {
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
  CameraView,
} from "expo-camera";
import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Props {
  children?: React.ReactNode;
  onBarCodeReaded: (code: string) => void;
  setValue: (code: string) => void;
  showCamera: boolean;
}
interface CameraSetting {
  flash: boolean;
  zoom: number;
  sound: boolean;
}

const ScannerCamera: FC<Props> = (props) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraSetting, setCameraSetting] = useState<CameraSetting>({
    flash: false,
    zoom: 0,
    sound: false,
  });

  if (!permission) {
    requestPermission();
  }

  if (!permission || !permission.granted) {
    // Camera permissions are not granted yet.
    return <View style={styles.container}></View>;
  }

  const onBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    props.onBarCodeReaded(scanningResult.data);
  };

  const setZom = (zoom: number) => {
    if (zoom >= 0 && zoom <= 1)
      setCameraSetting({ ...cameraSetting, zoom: zoom });
  };

  const setSound = () => {
    setCameraSetting({ ...cameraSetting, sound: !cameraSetting.sound });
  };

  const setFlashOn = () => {
    setCameraSetting({ ...cameraSetting, flash: !cameraSetting.flash });
  };

  return (
    <View style={styles.container}>
      {props.showCamera && (
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          autofocus="on"
          zoom={cameraSetting.zoom}
          onBarcodeScanned={onBarcodeScanned}
          enableTorch={cameraSetting.flash}
        ></CameraView>
      )}
    </View>
  );
};
export default ScannerCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // overflow: 'hidden',
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    minHeight: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
    // overflow: 'hidden',
    // paddingVertical: '5%'
  },

  cameraHeader: {
    // flexDirection: 'row',
    height: "15%",
    width: "100%",
    backgroundColor: "red",
    alignItems: "center",
    // paddingHorizontal:'10%',
    // columnGap:'10%',
    justifyContent: "center",
  },
  logo: {
    // width: '10%',  // ou une valeur fixe, par exemple 100
    // height: '50%', // ou une hauteur fixe
    flex: 1,
    maxWidth: "100%",
    maxHeight: "50%",
  },
});
