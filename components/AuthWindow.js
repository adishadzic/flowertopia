import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Checkbox,
} from 'react-native';
import { colors } from '../constants/colors';
import Button from './Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AuthWindow = ({ onClose, isCreateAccount }) => {
  const [isLogin, setIsLogin] = useState(!isCreateAccount);
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // handle login or signup based on the current state
    if (isLogin) {
      console.log('Logging in with:', email, password);
    } else {
      console.log('Creating account with:', name, email, password);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 50 }}>
        <Image
          style={{ width: 180 }}
          source={require('../assets/flowertopia-logo.svg')}
        />
      </View>
      <View style={styles.authWindowContainer}>
        <View style={styles.tabContainer}>
          <Text
            style={[
              styles.tabText,
              styles.leftTab,
              isLogin ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setIsLogin(true)}
          >
            Sign in
          </Text>
          <Text
            style={[
              styles.tabText,
              styles.rightTab,
              !isLogin ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setIsLogin(false)}
          >
            Create Account
          </Text>
        </View>
        <View style={styles.formContainer}>
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {/* TODO: Add Checbox component */}
          {/* <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Remember me</Text>
          </View> */}
          <Button
            bgColor={colors.slateBlue}
            borderRadius={5}
            fontSize={16}
            buttonHeight={35}
            textColor={colors.babyPink}
            buttonLabel={isLogin ? 'Login' : 'Create Account'}
            onPress={handleSubmit}
          />
        </View>

        <View style={styles.alternativeAuth}>
          <Text style={styles.alternativeAuthText}>OR</Text>
          <Text style={styles.alternativeAuthText}>
            {isLogin ? 'login' : 'sign up'} with:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              gap: 12,
            }}
          >
            <FontAwesome5 name="facebook" size={24} color={colors.rust} />
            <MaterialCommunityIcons
              name="gmail"
              size={26}
              color={colors.rust}
            />
            <AntDesign name="linkedin-square" size={24} color={colors.rust} />
          </View>
        </View>
      </View>
      <Image
        style={styles.loginBackground}
        source={require('../assets/login-background.jpg')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  authWindowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.babyPink,
    minWidth: 350,
    boxShadow: '0px 4px 4px #678C96',
    borderRadius: 20,
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.dustyRose,
    marginBottom: 20,
  },
  tabText: {
    width: '50%',
    paddingVertical: 15,
    textAlign: 'center',
    fontFamily: 'Overlock',
    fontSize: 16,
    fontWeight: '700',
    color: colors.slateBlue,
  },
  activeTab: {
    backgroundColor: colors.dustyRose,
  },
  leftTab: {
    borderTopLeftRadius: 20,
  },
  rightTab: {
    borderTopRightRadius: 20,
  },
  formContainer: {
    width: '80%',
    paddingVertical: 20,
  },
  input: {
    height: 40,
    background: 'rgba(255, 249, 249, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(103, 140, 150, 0.8)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontFamily: 'Overlock',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 10,
    color: 'rgba(103, 140, 150, 0.6)',
  },
  loginBackground: {
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 0,
    zIndex: -1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
    borderColor: '#fff',
  },
  label: {
    fontFamily: 'Overlock',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 10,
    margin: 5,
    color: 'rgba(103, 140, 150, 0.6)',
  },
  buttonStyle: {
    color: colors.slateBlue,
  },
  alternativeAuth: {
    marginBottom: 20,
    marginTop: 20,
  },
  alternativeAuthText: {
    fontFamily: 'Overlock',
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 12,
    color: colors.slateBlue,
    marginBottom: 10,
  },
});

export default AuthWindow;
