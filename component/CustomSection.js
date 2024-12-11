import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomSection = ({title,children,style}) => {
  return (
    <View style={[styles.Khung,style]}>
      {
        title && <Text style={styles.title}>{title}</Text>
      }
      <View style={styles.NoiDung}>
        {children}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  Khung:{
    borderWidth:1,
    borderColor:'#80DEEA',
    shadowColor:'#A7FFEB',
    elevation:5,
    shadowRadius:5,
    borderRadius:5,
    margin:10
  },
  title:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30,
    color:'#84FFFF',

  },
  NoiDung:{
    marginBottom:10
  }
})
export default CustomSection