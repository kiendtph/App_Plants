import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Block = ({title,style,children}) => {
  return (
    <View style={[st.khung,style]}>
      {
      title && <Text style={st.title}>{title}</Text>
      }
      <View style={st.content}>
        {children}
      </View>
    </View>
  )
}


const st = StyleSheet.create({
    khung:{
        borderWidth:1,
        borderRadius:10,
        margin:10,
        backgroundColor:'#eee',
        shadowOpacity:0.1,
        shadowRadius:10,
        elevation:1
    },
    title:{
        color:'#ee0290',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:10,
        textAlign:'center'
    },
    content:{
        marginBottom:20,
    },
})
export default Block