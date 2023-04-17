import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Button from "../components/Button";
import { colors } from "../constants/colors";
import { useFonts } from "expo-font";
import AuthWindow from "../components/AuthWindow";
import Notification from "../components/Notification";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App(props) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showAuthWindow, setShowAuthWindow] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  let [fontsLoaded] = useFonts({
    Overlock: require("../assets/fonts/Overlock-Black.ttf"),
  });

  const handleSignInClick = () => {
    setShowAuthWindow(true);
    setIsCreateAccount(false);
  };

  const handleCreateAccountClick = () => {
    setShowAuthWindow(true);
    setIsCreateAccount(true);
  };
  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (fontsLoaded) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onLayout={onLayoutRootView}
      >
        <Notification />
        {showAuthWindow && (
          <AuthWindow
            isCreateAccount={isCreateAccount}
            onClose={() => setShowAuthWindow(false)}
          ></AuthWindow>
        )}
        {!showAuthWindow && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            onLayout={onLayoutRootView}
          >
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logoImage}
                source={require("../assets/flowertopia-logo.svg")}
              />
              <Text style={styles.heading}>
                Support your local by creating beautiful bouquets
              </Text>
            </View>
            <Button
              bgColor={colors.dustyRose}
              fontSize={20}
              buttonHeight={50}
              borderRadius={20}
              textColor={colors.buttonText}
              buttonLabel={"Sign in"}
              onPress={handleSignInClick}
            />
            <Button
              bgColor="transparent"
              fontSize={20}
              buttonHeight={35}
              textColor={colors.slateBlue}
              buttonLabel={"Create an account"}
              onPress={handleCreateAccountClick}
            />
            <Button
              bgColor="transparent"
              fontSize={20}
              buttonHeight={35}
              textColor={colors.dustyRose}
            >
              Forgot Password?
            </Button>
            <Image
              style={styles.loginBackground}
              source={require("../assets/login-background.jpg")}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoWrapper: {
    position: "absolute",
    top: 50,
    alignItems: "center",
    width: 200,
  },
  heading: {
    fontFamily: "Overlock",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: colors.dustyRose,
  },
  loginBackground: {
    position: "absolute",
    resizeMode: "contain",
    bottom: 0,
    zIndex: -1,
  },
  logoImage: {
    width: 180,
    marginBottom: 10,
  },
  paragraph: {
    marginTop: 50,
    fontFamily: "Overlock",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
    color: colors.dustyRose,
  },
});
