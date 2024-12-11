import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import SeeMoreTrees from './screens/SeeMoreTrees';
import NewPlants from './screens/NewPlants';
import shadeLoving from './screens/shadeloving';
import lightLoving from './screens/lightloving';
import { useTheme } from './component/Theme';


const ProductCatalog = () => {
    const { themeStyles } = useTheme();
    const Tab = createMaterialTopTabNavigator();
    return (
        
        <Tab.Navigator screenOptions={{
            tabBarStyle: {backgroundColor: themeStyles.background},
            tabBarLabelStyle: {color: themeStyles.text},
        }}>
            <Tab.Screen name="Tất cả" component={SeeMoreTrees} />
            <Tab.Screen name="Hàng mới về" component={NewPlants} />
            <Tab.Screen name="Ưa bóng" component={shadeLoving} />
            <Tab.Screen name="Ưa sáng" component={lightLoving} />
        </Tab.Navigator>
    )
}

export default ProductCatalog

const styles = StyleSheet.create({
    text:{
        color:'#FFFFFF'
    }
})