import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import CustomButton from '../CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {count} from 'console';
import { DataInterface } from '@/src/Interface/global/database.interface';

interface Props {
  isModalVisible?: boolean;
  title?: string;
  closeModal?: () => void;
  data: DataInterface[];
}

const DetailData: FC<Props> = ({isModalVisible, title, closeModal, data}) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.modal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text>
            {title} ({data.length})
          </Text>
          <TouchableOpacity onPress={closeModal}>
            <MaterialCommunityIcons name="close" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => `${item.code}-${index}`}
            renderItem={({item, index}) => {
              return (
                <View style={{marginVertical: 8}}>
                  <Text>
                    code: {item.code} - libelle: {item.libelle}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 8,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    margin: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default DetailData;
