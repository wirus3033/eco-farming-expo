import { FlatList, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Text from "../ui/Text";
import { tintColorDark } from "@/src/constants/Colors";
import { TouchableOpacity } from "react-native";
import { t } from "i18next";
import { hp, wp } from "@/src/utils/responsive";
import MessageErrorMain from "../ui/modal/MessageErrorMain";
import { Icons } from "@/src/constants/Images";
import IconContent from "../ui/IconContent";
import { CurrentUserInfo } from "@/src/Interface/global/database.interface";
import { useRouter } from "expo-router";

const DrawerNavigation = () => {
  const router = useRouter();
  const [isLogouts, setIsLogout] = useState(false);
  const [cureentUser, setCurrentUser] = useState<CurrentUserInfo | null>(null);
  const recolteIcon = require("@/src/assets/images/icons/Recolte32_Noir@dpi1_5x.png");
  const lavageIcon = require("@/src/assets/images/icons/Lavage32_Noir@dpi1_5x.png");
  const egrainageIcon = require("@/src/assets/images/icons/filtre32_Noir@dpi1_5x.png");
  const packagingIcon = require("@/src/assets/images/icons/icons8-package-50.png");
  const otherIcon = require("@/src/assets/images/icons/other.png");
  const openModal = () => {
    setIsLogout(true);
  };

  const drawerItems = [
    {
      id: 1,
      text: t("DRAWER_NAVIGATION:RECOLTE_ITEM"),
    },
    {
      id: 2,
      text: t("DRAWER_NAVIGATION:LAVAGE_ITEM"),
    },
    {
      id: 3,
      text: t("DRAWER_NAVIGATION:EGRAINAGE_ITEM"),
    },
    {
      id: 5,
      text: t("DRAWER_NAVIGATION:OTHERS_ITEM"),
    },

    {
      id: 6,
      text: "Sync",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#85C534",
          height: "16%",
          // alignItems:"center"
        }}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <IconContent />
          {cureentUser && (
          <Text
            style={{
              paddingLeft: 15,
              marginLeft: 10,
              color: "white",
              fontSize: 14,
              marginTop: 3,
            }}
          >
           {cureentUser.username}
           {/* ccccccccccccccccc */}
          </Text>
           )} 
        </View>
        {/* {typeMode === "offline" && ( */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          {/* <Ionicons name="cloud-offline" size={30} color={"white"} /> */}
        </View>
        {/* )} */}
      </View>
      <View style={{ flex: 1 }}>
        <View style={{  flex: 1,padding: 15, }}>
          <FlatList
            data={drawerItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const getIcon = () => {
                if (item.id === 1) return recolteIcon;
                if (item.id === 2) return lavageIcon;
                if (item.id === 3) return egrainageIcon;
                // if (item.id === 4) return packagingIcon;
                if (item.id === 5) return otherIcon;
                if (item.id === 6) return Icons.icon_sync;
                return null;
              };
              return (
                <TouchableOpacity
                  style={{
                    margin: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems:"center"
                      }}
                    >
                      <Image
                        source={getIcon()}
                        style={{
                          width: wp(7),
                          height: hp(5),
                          // tintColor: activeTabName === item.text ? GREEN : DARK,
                        }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          marginLeft: 15,
                          fontSize: wp(4),
                          // color: activeTabName === item.text ? GREEN : DARK,
                        }}
                      >
                        {item.text}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View style={{ padding: 15, marginTop: 5 }}>
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            // navigation.replace("itemsSettings");
            router.push("/appDrawer/setting")
          }}
          style={{
            paddingVertical: wp(3),
            borderRadius: wp(8),
            backgroundColor: "#85C534",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <Ionicons
              name="settings-outline"
              size={wp(7)}
              color={tintColorDark}
            />
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: "600",
                marginLeft: 8,
                color: tintColorDark,
              }}
            >
              {t("DRAWER_NAVIGATION:SETTINGS_ITEM")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openModal}
          style={{
            paddingVertical: wp(3),
            borderRadius: wp(8),
            backgroundColor: "#85C534",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <AntDesign name="logout" size={wp(7)} color={tintColorDark} />
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: "600",
                marginLeft: 8,
                color: tintColorDark,
              }}
            >
              {t("DRAWER_NAVIGATION:LOGOUT_ITEM")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <MessageErrorMain
        isModalVisible={isLogouts}
        isTextButton={true}
        textButton={t("DRAWER_NAVIGATION:LOGOUT")}
        closeModal={() => setIsLogout(false)}
        errorMessage2={t("DRAWER_NAVIGATION:LOGOUT_CONFIRM_MESSAGE")}
        handleReturn={() => {}}
        title={t("DRAWER_NAVIGATION:LOGOUT_CONFIRM_TITLE")}
        errorMessage={""}
      />
    </View>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
