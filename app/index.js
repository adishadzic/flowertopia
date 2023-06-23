import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../constants/colors';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../views/HomeScreen';
import CreateBouquet from '../views/CreateBouquet';
import Settings from '../views/Settings';
import Profile from '../views/Profile';
import Flowers from '../views/Flowers';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { BaseToast } from 'react-native-toast-message';
import { NewProvider } from './AuthContext';
import Login from '../views/Login';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = forwardRef((props, ref) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showAuthWindow, setShowAuthWindow] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const Tab = createBottomTabNavigator();

  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Overlock: require('../assets/fonts/Overlock-Black.ttf'),
  });

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: '#424242',
          borderLeftColor: '#50C878',
          borderLeftWidth: 10,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: '#7CFC00',
        }}
        text2Style={{
          color: colors.buttonText,
          fontSize: 12,
        }}
      />
    ),
  };

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
      <>
        {isAuthenticated ? (
          <NewProvider>
            <View style={{ flex: 1 }}>
              {isAuthenticated && (
                <NavigationContainer independent={true}>
                  <Tab.Navigator
                    screenOptions={({ route }) => ({
                      tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        let iconColor;
                        let iconSize;
                        iconSize = route.name === 'Create' ? 40 : 25;
                        iconColor = focused
                          ? colors.dustyRose
                          : 'rgba(255,255,255, 0.9)';
                        if (route.name === 'Home') {
                          iconName = focused ? 'ios-home' : 'ios-home-outline';
                        } else if (route.name === 'Profile') {
                          iconName = focused
                            ? 'person-circle'
                            : 'person-circle-outline';
                        } else if (route.name === 'Settings') {
                          iconName = focused ? 'settings' : 'settings-outline';
                        } else if (route.name === 'Flowers') {
                          iconName = focused ? 'flower' : 'flower-outline';
                        } else if (route.name === 'Create') {
                          iconName = focused
                            ? 'add-circle'
                            : 'add-circle-outline';
                        }
                        return (
                          <Ionicons
                            name={iconName}
                            size={iconSize}
                            color={iconColor}
                          />
                        );
                      },
                      tabBarStyle: { backgroundColor: colors.slateBlue },
                      headerShown: false,
                    })}
                  >
                    <Tab.Screen
                      name="Home"
                      component={HomeScreen}
                      options={{
                        tabBarShowLabel: false,
                      }}
                    />
                    <Tab.Screen
                      name="Flowers"
                      component={Flowers}
                      options={{
                        tabBarShowLabel: false,
                      }}
                    />
                    <Tab.Screen
                      name="Create"
                      component={CreateBouquet}
                      options={{
                        tabBarShowLabel: false,
                      }}
                    />
                    <Tab.Screen
                      name="Settings"
                      component={Settings}
                      options={{
                        tabBarShowLabel: false,
                      }}
                    />
                    <Tab.Screen
                      name="Profile"
                      component={Profile}
                      options={{
                        tabBarShowLabel: false,
                      }}
                    />
                  </Tab.Navigator>
                </NavigationContainer>
              )}

              <Toast ref={ref} config={toastConfig} />
            </View>
          </NewProvider>
        ) : (
          <NewProvider>
            <Login onLoginSuccess={handleLoginSuccess} />
          </NewProvider>
        )}
      </>
    );
  }
});

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

export default App;
