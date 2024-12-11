import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from './Theme';

const CustomDetailPr = (props) => {
  const { themeStyles } = useTheme();
  return (
    <View style={{marginTop:10}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={[styles.nd,{color:themeStyles.text}]}>{props.title}</Text>
        <Text style={[styles.nd,{color:themeStyles.text}]}>{props.SubnameType}</Text>
        
      </View>
      <View style={styles.line1}/>
    </View>
  )
}

export default CustomDetailPr

const styles = StyleSheet.create({
    line1:{
        height:1,
        backgroundColor:'#CCCCCC',
        marginTop:5,
        marginBottom:10,
    },
    nd:{
        fontSize:14
    }
})