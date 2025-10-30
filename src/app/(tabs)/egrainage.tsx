import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TopHeaderNav from "@/src/components/ui/TopHeaderNav";
import { t } from "i18next";
import Card from "@/src/components/ui/Card";
import { Icons } from "@/src/constants/Images";
import {
  Colors_Menu,
  FOND_BIN,
  GREEN_DARK,
  ROSE,
} from "@/src/constants/Colors";
import { useRouter } from "expo-router";

const Egrainage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TopHeaderNav
        title={t("MENU_RECOLTE:TITLE")}
        subtitle={t("MENU_RECOLTE:SUBTITLE")}
      />
      <View style={styles.body}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
            flex:1
          }}
        >
          <Card
            title={`Picking\nEgrainage`}
            icon={Icons.picking}
            texColor="black"
            backgroundColor={FOND_BIN}
            onPressItem={() =>
              // console.log("eeeeeeeeeeeeee")

              router.push("/Egrainage")
            }
          />
          <Card
            title={`Fin\nd'égreinage`}
            icon={Icons.sortieEgrainage}
            texColor="white"
            backgroundColor={ROSE}
          />
        </View>
        <View style={{ flex: 1, gap: 12 }}>
          <Card
            title={`Sotie égrainage`}
            icon={Icons.sortie}
            texColor="white"
            backgroundColor={GREEN_DARK}
          />
        </View>
        <View style={{ flex: 1, gap: 12 }}>
          <Card
            title={`Picking packaging`}
            icon={Icons.liberation}
            texColor="white"
            backgroundColor={Colors_Menu.menuPackaging}
          />
        </View>
      </View>
    </View>
  );
};

export default Egrainage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 12,
    flex: 1,
    gap:12
    // backgroundColor:"red"
  },
});
