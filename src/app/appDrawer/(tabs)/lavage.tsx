import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopHeaderNav from '@/src/components/ui/TopHeaderNav'
import { t } from 'i18next'
import Card from '@/src/components/ui/Card'
import { Icons } from '@/src/constants/Images'
import { Colors_Menu, FOND_BIN, GREEN_1, ROSE } from '@/src/constants/Colors'
import { useRouter } from 'expo-router'

const Lavage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TopHeaderNav title={t('MENU_LAVAGE:TITLE')} subtitle={t('MENU_LAVAGE:SUBTITLE')} />
      <View style={styles.body}>
        <View style={{ flex: 1, gap: 12 }}>
          <Card
            title={t('MENU_LAVAGE:PICKING_PRE_TRAITEMENT')}
            icon={Icons.lavage32}
            texColor="black"
            backgroundColor={GREEN_1}
            onPressItem={() =>
              // console.log("eeeeeeeeeeeeee")

              router.push("/appDrawer/Lavage")
            }
          />
          <Card
            title={t('MENU_LAVAGE:ENREGISTRER_GRADE')}
            icon={Icons.mesure}
            texColor="white"
            backgroundColor={Colors_Menu.menuSorties}
          />
          <Card
            title={t('MENU_LAVAGE:TERMINER_OF_PRE_TRAITEMENT')}
            icon={Icons.bac_grade}
            texColor="white"
            backgroundColor={ROSE}
            iconColor='white'
          />
        </View>

      </View>
    </View>
  )
}

export default Lavage

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 12,
    flex: 1
    // backgroundColor:"red"
  }
})