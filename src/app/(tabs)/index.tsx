import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import TopHeaderNav from '@/src/components/ui/TopHeaderNav'
import { t } from 'i18next';
import Card from '@/src/components/ui/Card';
import { Icons } from '@/src/constants/Images';
import { Colors_Menu, FOND_BIN, GREEN, GREEN_1, ROSE } from '@/src/constants/Colors';
import { useRouter } from 'expo-router';


interface RecoltProps {
  navigation: any;
}
const Index: FC<RecoltProps> = ({ navigation }) => {
  const router = useRouter();
  return (
    <View style={[styles.container]}>
      {/* <TopHeaderNav title={t('MENU_EGRAINAGE:TITLE_UP')} subtitle={t('MENU_EGRAINAGE:SUBTITLE')} /> */}
      <TopHeaderNav title={"dddddd"} subtitle={"eeee"} />
      <View style={styles.body}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, height: "32.5%", marginBottom: 12 }}>
          <Card
            title={`Affectation\nBIN / Parcelle`}
            icon={Icons.attribution}
            texColor="black"
            backgroundColor={Colors_Menu.menuAffectations}
            onPressItem={() =>
              // console.log("eeeeeeeeeeeeee")
              
              router.push("/(screens)/recolte/affection/afectionBin")
            }
          />
          <Card
            title={`Envoyer\nBIN à l'usine`}
            icon={Icons.sortie}
            texColor="white"
            backgroundColor={ROSE}
          />
        </View>
        <View style={{ flex: 1, gap: 12 }}>
          <Card
            title={`Pesées récolte`}
            icon={Icons.enregistrement}
            texColor="white"
            backgroundColor={Colors_Menu.menuPackaging}
            iconColor='white'
          />
          <Card
            title={`Réception usine`}
            icon={Icons.stock}
            texColor="black"
            backgroundColor={Colors_Menu.menuPicking}
          />
        </View>
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red"
  },
  body: {
    padding: 12,
    flex: 1
    // backgroundColor:"red"
  }
})