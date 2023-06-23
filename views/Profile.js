import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { colors } from '../constants/colors';
import HeaderBar from '../components/HeaderBar';
import { NewContext } from '../app/AuthContext';
import { auth } from '../firebase';
import Button from '../components/Button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Profile = ({ navigation }) => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingInfo, setBillingInfo] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderBar />

      <View style={styles.formContainerWrapper}>
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.myProfileTitle}>My Profile</Text>
          </View>

          <Image
            style={styles.profileImage}
            source={require('../assets/person.jpg')}
          />
          <Text style={styles.name}>{auth.currentUser?.displayName}</Text>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Shipping address</Text>
            <TextInput
              value={shippingAddress}
              onChangeText={(value) => setShippingAddress(value)}
              placeholder="Rovinjska 18, Pula (52 100), Croatia"
              placeholderTextColor={colors.slateBlue}
              style={styles.input}
            />

            <Text style={styles.label}>Billing information</Text>
            <TextInput
              value={billingInfo}
              onChangeText={(value) => setBillingInfo(value)}
              placeholder="Card ending in 0000"
              placeholderTextColor={colors.slateBlue}
              style={styles.input}
            />
          </View>
          <Button
            buttonLabel={'Logout'}
            textColor={colors.buttonText}
            bgColor={colors.slateBlue}
            additionalStyles={{
              marginTop: 30,
              width: 160,
              alignSelf: 'center',
            }}
            onPress={() => {
              auth.signOut().then(() => {
                Toast.show({
                  type: 'success',
                  text1: 'Logged out successfuly!',
                });
              });
            }}
          />
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 35,
  },
  name: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
    color: colors.slateBlue,
    alignSelf: 'center',
    marginTop: 15,
  },
  label: {
    fontFamily: 'Overlock',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
    color: colors.slateBlue,
    marginTop: 40,
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
});

export default Profile;
