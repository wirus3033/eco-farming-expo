import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopHeaderNav from '@/src/components/ui/TopHeaderNav'
import { t } from 'i18next'
import Card from '@/src/components/ui/Card'
import { Icons } from '@/src/constants/Images'
import { FOND_BIN, GREEN_1, ROSE } from '@/src/constants/Colors'
import { useRouter } from 'expo-router'

const Lavage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TopHeaderNav title={t('MENU_LAVAGE:TITLE')} subtitle={t('MENU_LAVAGE:SUBTITLE')} />
      <View style={styles.body}>
        <View style={{ flex: 1, gap: 12 }}>
          <Card
            title={`Picking prétraitement`}
            icon={Icons.lavage32}
            texColor="black"
            backgroundColor={GREEN_1}
            onPressItem={() =>
              // console.log("eeeeeeeeeeeeee")

              router.push("/Lavage")
            }
          />
          <Card
            title={`Enregistrer un grade`}
            icon={Icons.mesure}
            texColor="white"
            backgroundColor={FOND_BIN}
          />
          <Card
            title={`Terminer l'OF prétraitement`}
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