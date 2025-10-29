import NetInfo from '@react-native-community/netinfo';

export const testConnexion = async () => {
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    try {
      const res = await fetch('https://google.com');
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};
