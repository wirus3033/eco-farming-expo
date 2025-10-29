import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {TEXT_COLOR} from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomToasterProps {
  visible: boolean;
  isConnexion: boolean;
}

const CustomToaster: React.FC<CustomToasterProps> = ({
  visible,
  isConnexion,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.toastContainer}>
        <View style={styles.toast}>
          <MaterialCommunityIcons
            name={isConnexion ? 'wifi-strength-4' : 'wifi-strength-off'}
            size={22}
            color="#000"
          />
          {isConnexion ? (
            <Text style={styles.toastText}>Vous êtes en mode en ligne.</Text>
          ) : (
            <Text style={styles.toastText}>Vous êtes hors ligne.</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#85c53494',
    padding: 10,
    borderRadius: 10,
  },
  toastText: {
    color: TEXT_COLOR,
    fontWeight: '600',
    marginLeft: 10
  },
});

export default CustomToaster;
