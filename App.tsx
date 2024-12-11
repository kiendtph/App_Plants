/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailProductScreen from './screens/DetailProductScreen';
import Setting from './screens/Setting';
import SeeMoreTrees from './screens/SeeMoreTrees';
import SeeMoreAccessory from './screens/SeeMoreAccessory';
import Contact from './screens/Contact';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SeeMorePlant_pots from './screens/SeeMorePlant_pots';
import ProductCatalog from './ProductCatalog';
import shade_loving from './screens/shadeloving';
import light_loving from './screens/lightloving';
import NewPlants from './screens/NewPlants';
import ToptabPr from './screens/ToptabPr';
import shadeLoving from './screens/shadeloving';
import lightLoving from './screens/lightloving';
import ProductFavorites from './screens/ProductFavorites';
import { ThemeProvider, useTheme } from './component/Theme';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen name='HomeScreen' component={TabNavigator} />
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='NofificationScreen' component={NotificationScreen} />
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='DetailProductScreen' component={DetailProductScreen} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='ProductCatalog' component={ProductCatalog} />
            <Stack.Screen name='SeeMoreAccessory' component={SeeMoreAccessory} />
            <Stack.Screen name='Contact' component={Contact} />
            <Stack.Screen name='NewPlants' component={NewPlants} />
            <Stack.Screen name='SeeMorePlant_pots' component={SeeMorePlant_pots} />
            <Stack.Screen name='ToptabPr' component={ToptabPr} />
            <Stack.Screen name='ProductFavorites' component={ProductFavorites} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
const TabNavigator = () => {
  const { themeStyles } = useTheme();
  return <Tab.Navigator initialRouteName='HomeScreen'
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 70,
        paddingTop: 15,      // Thêm khoảng cách ở trên để căn giữa biểu tượng
        paddingBottom: 10,
        backgroundColor: themeStyles.background
            
      },
    }}>
    <Tab.Screen name='HomeScreen' component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) =>

        (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('./images/home.png')}
              style={{ height: 30, width: 30 }}
            />
            {focused && <View style={styles.dot} />}
          </View>
        ),
      }}
    />

    <Tab.Screen name='SearchScreen' component={SearchScreen}
      options={{
        tabBarIcon: ({ focused }) =>
        (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./images/search.png')}
            style={{ height: 30, width: 30 }}
          />
          {focused && <View style={styles.dot} />}
        </View>)
      }} />

    <Tab.Screen name='NotificationScreen' component={NotificationScreen}
      options={{
        tabBarBadge: 99,
        tabBarBadgeStyle: {
          backgroundColor: '#FF0000',
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: 'bold',
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          top: -10,
          right: 10,
        },
        tabBarIcon: ({ focused }) =>
        (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./images/notifi.png')}
            style={{ height: 30, width: 30 }}
          />

          {focused && <View style={styles.dot} />}
        </View>)

      }} />

    <Tab.Screen name='ProfileScreen' component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) =>
        (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./images/profile.png')}
            style={{ height: 30, width: 30 }}
          />
          {focused && <View style={styles.dot} />}
        </View>)
      }} />
  </Tab.Navigator>
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#00796B',
    borderRadius: 3,
    marginTop: 4
  }
});

export default App;
