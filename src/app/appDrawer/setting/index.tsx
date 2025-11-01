import { FlatList, StyleSheet, Switch, View } from "react-native";
import React from "react";
import TopHeader from "@/src/components/global/TopHeader";
import { hp, wp } from "@/src/utils/responsive";
import { t } from "i18next";
import { ImageBackground } from "react-native";
import { GREEN, GREEN_1, TEXT_COLOR } from "@/src/constants/Colors";
import { TouchableOpacity } from "react-native";
import Text from "@/src/components/ui/Text";

type Item = {
  id: number;
  title: string;
  sub_title: string;
  icon: any;
  value?: boolean;
  actions?: () => void;
};

interface ItemsSettings {
  id: number;
  title: string;
  text_1?: string;
  text_2?: string;
  value?: string;
  value_1?: string;
  value_2?: string;
  actions_1?: () => void;
  actions_2?: () => void;
}
const ItemsSettings = () => {
  const predefinedItems: Item[] = [
    {
      id: 1,
      title: t("SETTING:SOUND_TITLE"),
      sub_title: t("SETTING:SOUND_SUBTITLE"),
      icon: require("../../../assets/images/icons8-sound-50.png"),
      // value: soundState,
      // actions: toggleSound,
    },
    {
      id: 2,
      title: t("SETTING:VIBRATION_TITLE"),
      sub_title: t("SETTING:VIBRATION_SUBTITLE"),
      icon: require("../../../assets/images/icons8-vibration-64.png"),
      // value: vibrateState,
      // actions: toggleVibration,
    },
  ];

  const itemsSettings: ItemsSettings[] = [
    {
      id: 1,
      title: t("SETTING:SCAN_MODE_TITLE"),
      text_1: t("SETTING:SCAN_MODE_CAMERA"),
      text_2: t("SETTING:SCAN_MODE_SCANNER"),
      // value: scanningMode,
      value_1: "camera",
      value_2: "scanner",
      // actions_1: toggleScanningMode,
      // actions_2: toggleScanningMode,
    },
    {
      id: 2,
      title: t("SETTING:LANGUAGE_TITLE"),
      text_1: t("SETTING:LANGUAGE_FRENCH"),
      text_2: t("SETTING:LANGUAGE_ENGLISH"),
      // value: i18n.language,
      value_1: "fr",
      value_2: "en",
      // actions_1: () => toggleLanguage('fr'),
      // actions_2: () => toggleLanguage('en'),
    },
    // {
    //   id: 3,
    //   title: t('SETTING:USE_MODE_TITLE'),
    //   text_1: t('SETTING:USE_MODE_ONLINE'),
    //   text_2: t('SETTING:USE_MODE_OFFLINE'),
    //   value: usingAppMode,
    //   value_1: 'online',
    //   value_2: 'offline',
    //   actions_1: toggleUsingMode,
    //   actions_2: toggleUsingMode,
    // },
  ];
  return (
    <View style={{ flex: 1, margin: 0, backgroundColor: "white" }}>
      <TopHeader
        iconReturn="chevron-left"
        iconHome={false}
        ViewCnt={false}
        iconParm={false}
        handleReturn={() => {}}
      />
      <View style={{ margin: wp(5) }}>
        <FlatList
          data={predefinedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.menuItem,
                { borderBottomWidth: 1, alignItems: "flex-start" },
              ]}
            >
              <ImageBackground
                source={item.icon}
                style={styles.iconStyle}
              ></ImageBackground>
              <View style={[styles.rightElem, { maxWidth: wp(50) }]}>
                <View>
                  <Text style={styles.specialsTItle}>{item.title}</Text>
                  <Text style={styles.specialsSubtitle}>{item.sub_title}</Text>
                </View>
              </View>
              <Switch
                onChange={item.actions}
                value={item.value}
                hitSlop={8}
                thumbColor={item.value ? GREEN : "#f4f3f4"}
                trackColor={{ true: GREEN_1, false: "#ccc" }}
              />
            </View>
          )}
        />
        <FlatList
          data={itemsSettings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: wp(5) }}>
              <View style={{ marginHorizontal: 2, marginBottom: wp(3) }}>
                <Text style={styles.subTytle}>{item.title}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderColor: "#ccc",
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingVertical: hp(0.5),
                  paddingHorizontal: hp(1.5),
                  width: "100%",
                }}
              >
                <TouchableOpacity onPress={item.actions_1}>
                  <View
                    style={[
                      {
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: wp(4),
                        width: wp(40),
                      },
                      item.value === item.value_1 && {
                        backgroundColor: GREEN,
                        borderRadius: 10,
                        paddingVertical: 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        { textAlign: "center", fontSize: wp(4) },
                        item.value === item.value_1 && { color: "white" },
                      ]}
                    >
                      {item.text_1}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={item.actions_2}>
                  <View
                    style={[
                      {
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: wp(4),
                        width: wp(40),
                      },
                      item.value === item.value_2 && {
                        backgroundColor: GREEN,
                        borderRadius: 10,
                        paddingVertical: 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        { textAlign: "center", fontSize: wp(4) },
                        item.value === item.value_2 && { color: "white" },
                      ]}
                    >
                      {item.text_2}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ItemsSettings;

const styles = StyleSheet.create({
  iconStyle: {
    width: wp(8),
    height: wp(8),
    margin: wp(2),
    justifyContent: "center",
    alignItems: "center",
  },

  menuItem: {
    paddingVertical: hp(2),
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightElem: {
    width: wp(70),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: wp(5),
  },
  optionLabel: {
    fontSize: hp(1.8),
  },
  optionSelected: {
    fontSize: hp(1.7),

    fontWeight: "300",
  },
  specialsTItle: {
    fontWeight: "500",
    color: "#000",
    fontSize: hp(2),
  },
  specialsSubtitle: {
    fontSize: hp(1.8),
    fontWeight: "300",
  },
  subTytle: {
    fontSize: wp(4),
    color: TEXT_COLOR,
  },
});
