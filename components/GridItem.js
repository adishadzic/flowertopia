import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../constants/colors';

const GridItem = ({ image, title, description, handlePress }) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.gridItem}>
        <View style={styles.gridItemImageWrapper}>
          <Image style={styles.gridItemImage} source={image} />
        </View>
        <View style={styles.gridItemTextWrapper}>
          <Text style={styles.gridItemTitle}>{title}</Text>
          <Text style={styles.gridItemDescription}>{description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    width: '45%',
    height: 156,
    marginTop: 25,
    marginBottom: 35,
  },
  gridItemImageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridItemTitle: {
    fontFamily: 'Overlock',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
    color: colors.slateBlue,
  },
  gridItemDescription: {
    fontFamily: 'Overlock',
    fontWeight: 700,
    fontSize: 11,
    lineHeight: 13,
    marginTop: 5,
    color: 'rgba(103, 140, 150, 0.6)',
  },
  gridItemTextWrapper: {
    paddingVertical: 10,
    paddingLeft: 4,
  },
});

export default GridItem;
