import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TopHeaderRecolte from "@/src/components/Recolte/TopHeaderRecolte";
import { useRouter } from "expo-router";
import DetailData from "@/src/components/ui/modal/DetailData";
import { DataInterface } from "@/src/Interface/global/database.interface";
import MessageErrorMain from "@/src/components/ui/modal/MessageErrorMain";
import ContentCamera from "@/src/components/ui/global/ContentCamera";
import { t } from "i18next";

const Weigh = () => {
  const router = useRouter();
  const [isVisibleData, setIsVisibleData] = useState(false);
  const [binInParcel, setBinInParcel] = useState<DataInterface[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  const handleRetourn = async () => {
    router.back();
  };

  return (
    <View style={[styles.container]}>
      <TopHeaderRecolte handleReturn={handleRetourn} />
      <ContentCamera isLoading={isLoading} error={error}  scan_text={(t('PESEE_RECOLTE:TEXT_EN_ATTENTE'))}/>
      <MessageErrorMain
        errorMessage2={error3}
        handleReturn={() => {}}
        isModalVisible={visibleModal}
        errorMessage={error2}
        closeModal={() => {}}
      />
      <DetailData
        isModalVisible={isVisibleData}
        closeModal={() => {
          setIsVisibleData(false);
        }}
        data={binInParcel}
        title={"BAC affectées aux paysans"}
      />
    </View>
  );
};

export default Weigh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
});
