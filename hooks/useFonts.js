import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    'Overlock-Black': require('../app/Overlock-Black.ttf'),
  });
