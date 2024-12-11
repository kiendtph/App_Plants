import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '../component/Theme';

const NotificationScreen = ({ navigation }: any) => {
  const { themeStyles } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 20, height: 20 }} source={require('../images/back.png')} />
        </TouchableOpacity>

        <Text style={[styles.Title,{color:themeStyles.text}]}>THÔNG BÁO</Text>
        <View style={{ width: 20 }} />
      </View>
      <View style={{margin:40}}>
        <Text style={[{fontSize:16,fontWeight:'500'},{color:themeStyles.text}]}>Thứ tư, 03/09/2021</Text>
        <View style={{height:2,width:'100%',backgroundColor:'#ccc'}}/>
        <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
            <Image style={{width:100,height:100,borderRadius:10}} source={require('../images/pr1.png')}/>
          <View style={{flex:1,marginLeft:10}}>
            <Text style={[{fontSize:16,color:'#007537'},{color:themeStyles.text}]}>Đặt hàng thành công</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={[{fontSize:14,fontWeight:'bold'},{color:themeStyles.text}]}>Spider Plant | </Text>
            <Text style={[{color:'#7D7B7B',fontSize:14},{color:themeStyles.text}]}>Ưu bóng</Text>
            </View>
            
            <Text style={[{},,{color:themeStyles.text}]}>2 sản phẩm</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
})