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
  GREENN,
  ROSE,
} from "@/src/constants/Colors";
import { useRouter } from "expo-router";

const Egrainage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TopHeaderNav title={t('MENU_EGRAINAGE:TITLE_UP')} subtitle={t('MENU_EGRAINAGE:SUBTITLE')} />
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
            title={t('MENU_EGRAINAGE:PICKING_EGRAINAGE')}
            icon={Icons.picking}
            texColor="black"
            backgroundColor={GREENN}
            onPressItem={() =>
              // console.log("eeeeeeeeeeeeee")

              router.push("/appDrawer/Egrainage")
            }
          />
          <Card
            title={t('MENU_EGRAINAGE:FIN_EGRAINAGE')}
            icon={Icons.sortieEgrainage}
            texColor="white"
            backgroundColor={ROSE}
          />
        </View>
        <View style={{ flex: 1, gap: 12 }}>
          <Card
            title={t('MENU_EGRAINAGE:SORTIE_EGRAINAGE')}
            icon={Icons.sortie}
            texColor="white"
            backgroundColor={Colors_Menu.menuSorties}
          />
        </View>
        <View style={{ flex: 1, gap: 12 }}>
          <Card
            title={t('MENU_EGRAINAGE:PICKING_PACKAGING')}
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
