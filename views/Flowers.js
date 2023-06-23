import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../constants/colors';

const Flowers = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: 300 }}>
      <Text
        style={{
          fontFamily: 'Overlock',
          fontWeight: 700,
          fontSize: 30,
          lineHeight: 49,

          color: colors.slateBlue,
        }}
      >
        Coming soon...
      </Text>
    </View>
  );
};

export default Flowers;
