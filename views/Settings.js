import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../constants/colors';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';

const Settings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderBar />

      <View style={styles.formContainerWrapper}>
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.myProfileTitle}>Settings</Text>
          </View>

          <Text style={styles.info}>
            For any questions, dilemmas, uncertainties feel free to contact us!
          </Text>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Flowertopia address</Text>
            <TextInput
              value=""
              onChangeText={(value) => setShippingAddress(value)}
              placeholder="Rovinjska 18, Pula (52 100), Croatia"
              placeholderTextColor={colors.slateBlue}
              style={styles.input}
              editable={false}
            />

            <Text style={styles.label}>Contact information</Text>
            <TextInput
              value=""
              onChangeText={(value) => setShippingAddress(value)}
              placeholder="+385 97 1223 5498"
              placeholderTextColor={colors.slateBlue}
              style={styles.input}
              editable={false}
            />

            <TouchableOpacity
              style={styles.profileInfo}
              onPress={() => {
                navigation.navigate('Profile');
              }}
            >
              <Image
                style={styles.profileImage}
                source={require('../assets/person.jpg')}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.name}>Name Surname</Text>
                <Text style={styles.link}>Change your profile information</Text>
              </View>
            </TouchableOpacity>

            <Button
              buttonLabel={'Report a bug'}
              textColor={colors.buttonText}
              bgColor={colors.slateBlue}
              additionalStyles={{
                marginTop: 30,
                width: 160,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                fontFamily: 'Overlock',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 14,
                lineHeight: 15,
                color: 'rgba(103, 140, 150, 0.7);',
                alignSelf: 'center',
              }}
            >
              (not the one in the flowers)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: 350,
    minHeight: '70%',
    maxHeight: '90%',
    backgroundColor: colors.babyPink,
    borderRadius: 20,
    shadowColor: '#678C96',
    elevation: 4,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.dustyRose,
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  myProfileTitle: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 40,
    color: colors.slateBlue,
  },
  info: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
    color: colors.slateBlue,
    marginTop: 15,
    padding: 20,
  },
  label: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
    color: colors.slateBlue,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.slateBlue,
    padding: 5,
    marginBottom: 10,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  profileInfo: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.slateBlue,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
    color: colors.slateBlue,
  },
  link: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(103, 140, 150, 0.7);',
  },
});

export default Settings;
