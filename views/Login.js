import React, { useContext, useState } from 'react';
import AuthWindow from '../components/AuthWindow';
import { Text, View, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { colors } from '../constants/colors';
import { NewContext, NewProvider } from '../app/AuthContext';

const Login = ({ onLoginSuccess }) => {
  const [showAuthWindow, setShowAuthWindow] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  const handleSignInClick = () => {
    setShowAuthWindow(true);
    setIsCreateAccount(false);
  };

  const handleCreateAccountClick = () => {
    setShowAuthWindow(true);
    setIsCreateAccount(true);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showAuthWindow && (
        <NewProvider>
          <AuthWindow
            isCreateAccount={isCreateAccount}
            onClose={() => setShowAuthWindow(false)}
            onLoginSuccess={onLoginSuccess}
          />
        </NewProvider>
      )}
      {!showAuthWindow && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logoImage}
              source={require('../assets/logo.jpg')}
            />
            <Text style={styles.heading}>
              Support your local by creating beautiful bouquets
            </Text>
          </View>
          <Button
            fontSize={20}
            textColor={colors.buttonText}
            buttonLabel={'Sign in'}
            onPress={handleSignInClick}
            additionalStyles={{
              height: 50,
              borderRadius: 20,
              backgroundColor: colors.dustyRose,
            }}
          />
          <Button
            fontSize={20}
            textColor={colors.slateBlue}
            buttonLabel={'Create an account'}
            onPress={handleCreateAccountClick}
            additionalStyles={{
              height: 35,
              backgroundColor: 'transparent',
            }}
          />
          <Button
            fontSize={20}
            textColor={colors.dustyRose}
            buttonLabel={'Forgot password?'}
            onPress={() => router.push('/home/')}
            additionalStyles={{
              height: 35,
              backgroundColor: 'transparent',
              marginTop: 100,
            }}
          />
          <Image
            style={styles.loginBackground}
            source={require('../assets/login-background.jpg')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    width: 200,
  },
  heading: {
    fontFamily: 'Overlock',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: colors.dustyRose,
  },
  loginBackground: {
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 0,
    zIndex: -1,
  },
  logoImage: {
    width: 180,
    marginBottom: 10,
  },
  paragraph: {
    marginTop: 50,
    fontFamily: 'Overlock',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: colors.dustyRose,
  },
});

export default Login;
