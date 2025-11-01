import { View, StyleSheet, Image, Pressable } from "react-native";
import React, { FC } from "react";
import Modal from "react-native-modal";

import CustomButton from "../CustomButton";

import { useTranslation } from "react-i18next";
import { DARK, GREEN, TEXT_COLOR, tintColorDark } from "@/src/constants/Colors";
import { Fonts } from "@/src/constants/Font";
import { Images } from "@/src/constants/Images";
import { hp, wp } from "@/src/utils/responsive";
import Text from "../Text";

interface Props {
  isModalVisible: boolean;
  isTextButton?: boolean;
  textButton?: string;
  title?: string;
  closeModal: () => void;
  errorMessage: string;
  errorMessage2?: string;
  handleReturn?: () => void;
  handleConfirm?: () => void;
  cancelText?: string;
}

const MessageErrorMain: FC<Props> = ({
  isModalVisible,
  isTextButton = false,
  textButton,
  title,
  closeModal,
  errorMessage,
  errorMessage2,
  handleReturn,
  handleConfirm,
  cancelText,
}) => {
  const { t, i18n } = useTranslation("PESEE_RECOLTE");
  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={400}
      animationOutTiming={400}
      avoidKeyboard={true}
      coverScreen={true}
      isVisible={isModalVisible}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              justifyContent: "center",
              alignItems: "center",
              //   alignContent:"center"
            }}
          >
            <Text
              style={{
                color: GREEN,
                fontSize: wp(8),
                // marginLeft: 10,
                fontFamily: Fonts.thin,
              }}
            >
              ec
            </Text>
            <Image
              source={Images.logo_black}
              resizeMode="contain"
              style={{
                width: wp(8),
                height: wp(8),
                marginHorizontal: 2,
              }}
            />
            <Text
              style={{
                color: tintColorDark,
                fontSize: wp(8),
                fontFamily: Fonts.thin,
              }}
            >
              farming
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: hp(1) }}>
          <View style={styles.modalContent}>
            {errorMessage2 && (
              <Text style={styles.title}>
                {title ? title : t("PESEE_RECOLTE:TITLE_MODALE")}
              </Text>
            )}
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Text style={styles.modalText}>{errorMessage2}</Text>
          </View>
          <View style={styles.modalFooter}>
            {errorMessage2 && (
              <Pressable
                style={{
                  borderTopColor: GREEN,
                  borderTopWidth: 3,
                  marginBottom: hp(2),
                }}
                onPress={closeModal}
              >
                <Text
                  style={{
                    color: GREEN,
                    fontSize: wp(4),
                    paddingVertical: hp(2),
                    textAlign: "center",
                  }}
                >
                  {cancelText
                    ? cancelText
                    : t("PESEE_RECOLTE:TEXT_BTN_ANNULER")}
                </Text>
              </Pressable>
            )}
            {handleConfirm && (
              <Pressable
                style={{
                  borderColor: DARK,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginVertical: hp(1),
                  paddingVertical: hp(1.5),
                }}
                onPress={handleConfirm}
              >
                <Text
                  style={{
                    color: DARK,
                    fontSize: wp(4),
                    textAlign: "center",
                  }}
                >
                  {t("PESEE_RECOLTE:TEXT_BTN_CONFIRM")}
                </Text>
              </Pressable>
            )}
            <CustomButton
              text={
                errorMessage2 && !isTextButton
                  ? t("PESEE_RECOLTE:TITLE_MODALE")
                  : isTextButton
                  ? textButton
                  : "OK"
              }
              onPress={errorMessage2 ? handleReturn : closeModal}
              isBtnMain={true}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 21,
  },
  modalHeader: {
    flexDirection: "row",
    backgroundColor: DARK,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    alignContent: "center",
    paddingVertical:wp(5),
    marginBottom:wp(2)
  },
  modalFooter: {},
  modalText: {
    fontSize: wp(4),
    color: TEXT_COLOR,
    textAlign: "center",
  },
  title: {
    paddingBottom: 25,
    color: "#000",
    fontSize: wp(6),
    textAlign: "center",
    fontWeight: "600",
  },
});

export default MessageErrorMain;
