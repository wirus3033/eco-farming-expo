import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { FC, useRef, useState } from "react";
import { hp, wp } from "@/src/utils/responsive";
import {
  GREEN,
  GREEN_DARK,
  LIGHT_GRAY_COLOR,
  TEXT_COLOR,
} from "@/src/constants/Colors";
import { TouchableOpacity } from "react-native";
import { Icons } from "@/src/constants/Images";
import { TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Loading from "../ui/login/Loading";
import Text from "../ui/Text";

interface Props {
  iconReturn?: string;
  title?: string;
  titleBold?: string;
  subTitle?: string;
  subTitleBold?: string;
  searchText?: any;
  setSearchText?: any;
  placeholder?: string;
  isSearch?: boolean;
  handleSearch?: () => void;
  handleReturn?: () => void;
  isPressed?: boolean;
  search?: boolean;
  isKeyboardVisible?: boolean;
  //   data?: DataInterface[];
  countResult?: string;
  isScanner?: boolean;
  clearText?: () => void;
  handleReturnMain?: () => void;
  openData?: () => void;
  //   process: LoadingType;
  setIsSync?: React.Dispatch<React.SetStateAction<string>>;
  isSynch?: boolean;
  syncState?: number;
  setSyncState?: React.Dispatch<React.SetStateAction<number>>;
}

const TopHeaderRecolte: FC<Props> = ({
  iconReturn,
  title,
  subTitle,
  titleBold,
  subTitleBold,
  searchText,
  setSearchText,
  placeholder,
  isSearch,
  handleSearch,
  handleReturn,
  isPressed,
  search = false,
  isKeyboardVisible,
  isScanner,
  //   data,
  countResult,
  clearText,
  handleReturnMain,
  //   process,
  setIsSync,
  isSynch = false,
  syncState,
  setSyncState,
}) => {
  const inputRef = useRef<TextInput>(null);
  const { t, i18n } = useTranslation("AFFECTATION_BIN_PARCELLE");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View>
      <View
        style={[
          !isKeyboardVisible && styles.borderBottomShadow,
          { minWidth: wp(100), maxWidth: wp(100) },
        ]}
      >
        <View style={styles.borderBottomShadow}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleReturn} style={styles.backButton}>
              <Image
                source={Icons.back}
                style={{ height: hp(4), width: hp(4) }}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              {!isScanner && (
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? "#FF9999" : "#ffffff",
                    padding: wp(3),
                    borderRadius: 3,
                  })}
                >
                  <Image
                    source={Icons.scan}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </Pressable>
              )}
              {process && (
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? "#FF9999" : "#ffffff",
                    padding: wp(3),
                    borderRadius: 3,
                  })}
                >
                  <Image
                    source={Icons.icon_sync}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </Pressable>
              )}

              {search ? (
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? "#FF9999" : "#ffffff",
                    padding: wp(3),
                    borderRadius: 3,
                  })}
                  onPress={handleSearch}
                >
                  <Image
                    source={Icons.search_2x}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleReturnMain}
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? "#FF9999" : "#ffffff",
                    padding: wp(3),
                    borderRadius: 3,
                  })}
                >
                  <Image
                    source={Icons.home}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        {!isKeyboardVisible && (
          <View
            style={{
              paddingHorizontal: wp(5),
              marginTop: hp(3),
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.title, !subTitle && { marginBottom: hp(3) }]}>
              {title}ccccccccccc <Text style={styles.bold}>
                {titleBold}
                ccccccccccc
                </Text>
            </Text>
            {!subTitle && (
              <View>
                <Text style={styles.instruction}>
                  {subTitle}{" "}
                  dddddddddddddddddd
                  {subTitleBold && (
                    <Text
                      style={[
                        styles.bold,
                        styles.instruction,
                        { marginTop: -hp(2) },
                      ]}
                    >
                      {subTitleBold}
                      cccccccccccccccccccc
                    </Text>
                  )}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      {isSearch && (
        <View style={{ marginVertical: hp(3), marginHorizontal: wp(7) }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: LIGHT_GRAY_COLOR,
              paddingHorizontal: wp(3),
              borderRadius: 30,
              borderColor: "#ccc",
              alignItems: "center",
              borderWidth: 1,
              position: "relative",
              height: wp(13),
            }}
          >
            <Image
              source={Icons.search_2x}
              style={{ height: hp(3), width: hp(3) }}
            />
            <TextInput
              ref={inputRef}
              placeholder=""
              value={searchText}
              onChangeText={setSearchText}
              style={{ padding: 5, fontFamily: "Roboto-Regular", flex: 1 }}
              returnKeyType="search"
            />
            {searchText && (
              <Pressable
                onPress={() => {}}
                style={{
                  position: "absolute",
                  left: wp(1) > 3.5 ? wp(10.5) : wp(9.5),
                  zIndex: -1,
                }}
              >
                <Text style={{ color: "#888" }}>
                  {placeholder}
                  cccccccccccccccccccc
                </Text>
              </Pressable>
            )}
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: pressed ? "#FF9999" : LIGHT_GRAY_COLOR,
                padding: wp(1.5),
                borderRadius: 50,
              })}
              onPress={searchText ? clearText : handleSearch}
            >
              <MaterialCommunityIcons name="close" size={24} />
            </Pressable>
          </View>
          {searchText && (
            <View style={{ marginTop: 5 }}>
              <Text
                style={[styles.subTytle, { fontWeight: "bold", marginLeft: 3 }]}
              >
                {t("AFFECTATION_BIN_PARCELLE:TEXT_RESULT")}:{" "}
                dddddddddddddddd
                <Text style={styles.subTytle}>{countResult}</Text>
              </Text>
            </View>
          )}
        </View>
      )}

      <Loading
        title={t("MODAL:LOADING_TITLE")}
        subTitle={t("MODAL:LOADING_SUBTITLE")}
        visible={isLoading}
      />
    </View>
  );
};

export default TopHeaderRecolte;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: wp(1),
    backgroundColor: "white",
  },
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
  title: {
    fontSize: wp(5.3),
    color: GREEN,
  },
  bold: {
    fontWeight: "bold",
  },
  instruction: {
    fontSize: wp(5),
    color: TEXT_COLOR,
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  subTytle: {
    fontSize: wp(4.5),
    color: TEXT_COLOR,
  },
});
