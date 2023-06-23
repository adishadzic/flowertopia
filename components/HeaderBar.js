import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/header-logo.png')}
        style={styles.logo}
      />
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Ionicons name="cart" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: colors.babyPink,
  },
  logo: {
    width: 85,
    height: 43,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
  },
});

export default HeaderBar;
