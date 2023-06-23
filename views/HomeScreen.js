import React from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { colors } from '../constants/colors';
import GridItem from '../components/GridItem';
import Image1 from '../assets/placeholder.webp';
import Image2 from '../assets/Image2.webp';
import Image3 from '../assets/image3.jpg';
import Image4 from '../assets/image5.jpg';
import GridView from '../components/GridView';
import { auth } from '../firebase';

const HomeScreen = () => {
  return (
    <View>
      <HeaderBar />

      <ScrollView>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'Overlock',
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 49,

              color: colors.slateBlue,
            }}
          >
            Hello, {auth.currentUser?.displayName}!
          </Text>
          <Text
            style={{
              fontFamily: 'Overlock',
              fontWeight: 700,
              fontSize: 20,
              lineHeight: 24,
              marginTop: 10,
              color: colors.dustyRose,
            }}
          >
            Today smells like...
          </Text>

          <GridView>
            <GridItem
              image={Image1}
              title="Flowers"
              description="Biggest meadow with fresh flowers to choose from."
              handlePress={() =>
                Linking.openURL(
                  'https://library.floretflowers.com/collections/seeds'
                )
              }
            />
            <GridItem
              image={Image2}
              title="Create your own"
              description="Pre-made bouquets for your special occasions."
            />
            <GridItem
              image={Image3}
              title="Inspiration"
              description="I’m not quite sure what I want. Take me to inspiration pages!"
            />
            <GridItem
              image={Image4}
              title="Confidence"
              description="Feeling lucky! I’d like to create a bouquet with you."
            />
          </GridView>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
