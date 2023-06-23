import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const GridView = ({ children }) => {
  return <View style={styles.gridView}>{children}</View>;
};

const styles = StyleSheet.create({
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    marginBottom: 150,
  },
});

export default GridView;
