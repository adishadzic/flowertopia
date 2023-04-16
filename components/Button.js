import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

const Button = ({
  bgColor,
  onPress,
  buttonLabel,
  textColor,
  borderRadius,
  fontSize,
  buttonHeight,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Overlock: require('../assets/fonts/Overlock-Black.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>not loaded</Text>;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        borderRadius: borderRadius || null,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
        height: buttonHeight,
        paddingVertical: 5,
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontFamily: 'Overlock',
          fontWeight: 700,
          fontSize: fontSize,
          lineHeight: 24,
          textAlign: 'center',
        }}
      >
        {buttonLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
