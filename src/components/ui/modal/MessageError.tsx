import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';

import CustomButton from '../CustomButton';
import { DARK, GREEN, TEXT_COLOR, tintColorDark } from '@/src/constants/Colors';
import { Images } from '@/src/constants/Images';
import { Fonts } from '@/src/constants/Font';



interface Props {
  isModalVisible: boolean;
  closeModal: () => void;
  errorMessage: string;
}

const MessageError: FC<Props> = ({
  isModalVisible,
  closeModal,
  errorMessage,
}) => {
  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={200}
      animationOutTiming={200} 
      avoidKeyboard={true} 
      coverScreen={true}
      isVisible={isModalVisible}
      onBackdropPress={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: GREEN,
                fontSize: 30,
                marginLeft: 10,
                fontFamily: Fonts.thin,
              }}>
              ec
            </Text>
            <Image
              source={Images.logo_black}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                marginHorizontal: 2,
              }}
            />
            <Text
              style={{
                color: tintColorDark,
                fontSize: 30,
                fontFamily: Fonts.thin,
              }}>
              farming
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{errorMessage}</Text>
          </View>
          <View style={styles.modalFooter}>
            <CustomButton text="OK" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 21,
  },
  modalHeader: {
    flexDirection: 'row',
    backgroundColor: DARK,
    padding: 7.5,
    alignItems: 'center',
    justifyContent:"center"
  },
  modalContent: {
    alignContent: 'center',
  },
  modalFooter: {},
  modalText: {
    fontSize: 15,
    paddingVertical: 48,
    color: TEXT_COLOR,
    textAlign: 'center',
  },
  boutonMadal: {
    paddingBottom: 10,
    paddingTop: 42,
    borderRadius: 10,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    width: '100%',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  modalCloseText: {
    color: '#000',
    fontSize: 16,
    marginTop: 10,
  },
  textClose: {
    textAlign: 'right',
    marginLeft: 5,
    fontSize: 16,
    color: '#000',
    backgroundColor: GREEN,
  },
});

export default MessageError;
