import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import { wp } from '@/src/utils/responsive';
import { GREEN, TEXT_COLOR } from '@/src/constants/Colors';


interface Props {
  visible: boolean;
  title?: string;
  subTitle?: string;
}

const Loading: FC<Props> = ({visible, title, subTitle}) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size={wp(12)} color={GREEN} style={styles.spinner} />
        <View style={styles.textContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subTitle && <Text style={styles.text}>{subTitle}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(6),
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  spinner: {
    marginRight: wp(3),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  text: {
    fontSize: wp(4),
    color: '#000',
    marginTop: wp(2),
  },
});

export default Loading;
