import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { hp, wp } from "@/src/utils/responsive";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Icons } from "@/src/constants/Images";
import { GREEN, GREEN_DARK, TEXT_COLOR } from "@/src/constants/Colors";

interface Props {
  iconReturn?: string;
  title?: string;
  titleBold?: string;
  subTitle?: string;
  handleReturn?: () => void;
  handleReturnMain?: () => void;
  iconHome?: boolean;
  iconParm?: boolean;
  ViewCnt?: boolean;
}
const TopHeader: FC<Props> = ({
  iconReturn,
  title,
  titleBold,
  subTitle,
  iconHome = true,
  iconParm = false,
  ViewCnt = true,
  handleReturn,
  handleReturnMain,
}) => {
  return (
    <View>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: wp(1),
          },
          styles.borderBottomShadow,
          { minWidth: wp(100), maxWidth: wp(100) },
        ]}
      >
        <TouchableOpacity onPress={handleReturn} style={styles.backButton}>
          <Image source={Icons.back} style={{ height: hp(4), width: hp(4) }} />
        </TouchableOpacity>
        <Pressable
          onPress={iconHome && handleReturnMain}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#FF9999" : "#ffffff",
            padding: wp(3),
            borderRadius: 3,
          })}
        >
          {iconHome && (
            <Image
              source={Icons.home}
              style={{ height: hp(4), width: hp(4) }}
            />
          )}
        </Pressable>
        {iconParm && (
          <Pressable
            onPress={handleReturnMain}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#FF9999" : "#ffffff",
              padding: wp(3),
              borderRadius: 3,
            })}
          >
            <AntDesign name="setting" size={hp(4)} />
          </Pressable>
        )}
      </View>
      {ViewCnt && (
        <View style={{ marginTop: hp(1.6), justifyContent: "center" }}>
          <Text style={[styles.titleHeader, { textAlign: "center" }]}>
            {title}{" "}
            <Text style={[styles.bold, { textAlign: "center" }]}>
              {titleBold}
            </Text>
          </Text>
          <Text style={[styles.subTytle, { textAlign: "center" }]}>
            {subTitle}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  borderBottomShadow: {
    backgroundColor: "white",
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GREEN_DARK,
    padding: hp(1.2),
  },
  titleHeader: {
    fontSize: wp(5),
    color: GREEN,
  },
  title: {
    fontSize: wp(5.3),
    color: GREEN,
  },
  subTytle: {
    fontSize: wp(4.5),
    color: TEXT_COLOR,
  },
  bold: {
    fontWeight: "bold",
  },
});
