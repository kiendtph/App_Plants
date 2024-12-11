import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../src/redux/actions/todoAction'
import { useTheme } from '../component/Theme'

const Product = [
  {
    id: 1,
    name: 'Song of India',
    features: 'Ưu sáng',
    price: '250.000 VNĐ',
    size: 'Nhỏ',
    origin: 'Châu Phi',
    state: 'Còn 156 sp',
    type: 'Cây trồng',
    image: require('../images/pr1.png')
  },
  {
    id: 2,
    name: 'Grey Star Calarthea',
    features: 'Ưu sáng',
    price: '250.000 VNĐ',
    size: 'Nhỏ',
    origin: 'Châu Á',
    state: 'Còn 154 sp',
    type: 'Cây trồng',
    image: require('../images/pr2.png')
  },
  {
    id: 3,
    name: 'Spider Plant',
    features: 'Ưu bóng',
    price: '250.000 VNĐ',
    size: 'Vừa',
    origin: 'Châu Âu',
    state: 'Còn 150 sp',
    type: 'Cây trồng',
    image: require('../images/pr3.png')
  },
  {
    id: 4,
    name: 'Banana Plant',
    features: 'Ưu sáng',
    price: '250.000 VNĐ',
    size: 'Lớn',
    origin: 'Châu Phi',
    state: 'Còn 159 sp',
    type: 'Cây trồng',
    image: require('../images/pr4.png')
  },


]

const SeeMoreTrees = ({ navigation }: any) => {
  const { themeStyles } = useTheme();
  const dispatch = useDispatch();
  const plants = useSelector(state => state.listTodoStore.plants || []);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch])
  return (
    <View style={[styles.Container,{backgroundColor: themeStyles.background }]}>
      
      <FlatList

        data={plants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('DetailProductScreen', { item })
              }}>
                <Image style={{ width: 180, height: 180, borderRadius: 10 }} source={{ uri: item.image }} />
                <Text style={[{ fontSize: 16, fontWeight: '500' },{color:themeStyles.text}]}>{item.name}</Text>
                <Text style={[{ color: '#7D7B7B', fontSize: 14 },{color:themeStyles.text}]}>{item.features}</Text>
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

export default SeeMoreTrees

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingVertical:10
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