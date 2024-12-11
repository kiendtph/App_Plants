import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos1, fetchTodos2 } from '../src/redux/actions/todoAction';
import { useTheme } from '../component/Theme';


const SeeMoreAccessory = ({navigation}:any) => {
  const { themeStyles } = useTheme();
    const dispatch = useDispatch();
    const accessory = useSelector(state => state.listTodoStore.accessory || []);
    useEffect(()=>{
        dispatch(fetchTodos2());
    },[dispatch])
  return (
    <View style={[styles.Container,{backgroundColor: themeStyles.background }]}>
    <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 20, height: 20 }} source={require('../images/back.png')} />
                </TouchableOpacity>

                <Text style={[styles.Title,{color:themeStyles.text}]}>PHỤ KIỆN CHĂM SÓC</Text>
                <View style={{ width: 20 }} />
            </View>
    <FlatList

    data={accessory}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 ,marginTop:20}}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('DetailProductScreen',{item})
          }}>
            <Image style={{ width: 180, height: 180, borderRadius: 10 }} source={{uri:item.image}} />
            <Text style={[{ fontSize: 16, fontWeight: '500' },{color:themeStyles.text}]}>{item.name}</Text>
            <Text style={[{ color: '#007537', fontSize: 14 },{color:themeStyles.text}]}>{item.price} VNĐ</Text>
            <Text></Text>
          </TouchableOpacity>
        </View>
      )
    }}
    numColumns={2}
  // horizontal

  />
  </View>
  )
}

export default SeeMoreAccessory

const styles = StyleSheet.create({
  Container: {
    flex: 1,
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
    flex: 1,
},
})