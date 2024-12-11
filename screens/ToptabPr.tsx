import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ProductCatalog from '../ProductCatalog'
import { useTheme } from '../component/Theme';

const ToptabPr = ({navigation}:any) => {
  const { themeStyles } = useTheme();
  return (
    <View style={[{flex:1},{backgroundColor: themeStyles.background }]}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 20, height: 20 }} source={require('../images/back.png')} />
        </TouchableOpacity>

        <Text style={[styles.Title,{color:themeStyles.text}]}>CÂY TRỒNG</Text>
        <View style={{ width: 20 }} />
      </View>
      <ProductCatalog/>
    </View>
  )
}

export default ToptabPr

const styles = StyleSheet.create({
    header: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      Title: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
      },
})