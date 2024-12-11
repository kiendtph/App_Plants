import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../component/Theme';
import { addViewedProduct } from '../src/redux/reducers/todoReducer';

const NewPlants = ({navigation}:any) => {
  const { themeStyles } = useTheme();
  const dispatch = useDispatch();
  const plants = useSelector(state => state.listTodoStore.plants || []);
  const plant_pots = useSelector(state => state.listTodoStore.plant_pots || []);
  const accessory = useSelector(state => state.listTodoStore.accessory || []);
  const newProducts = [...plants, ...plant_pots, ...accessory].filter(item => item.isNew);
  return (
    <View style={[{padding:10},{backgroundColor:themeStyles.background}]}>
        <FlatList
          data={newProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,margin:10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailProductScreen', { item });
                }}
              >
                <Image style={{ width: 180, height: 180, borderRadius: 10 }} source={{ uri: item.image }} />
                <Text style={[{ fontSize: 16, fontWeight: '500' },{color:themeStyles.text}]}>{item.name}</Text>
                {item.features && <Text style={[{ color: '#7D7B7B', fontSize: 14 },{color:themeStyles.text}]}>{item.features}</Text>}
                <Text style={[{ color: '#007537', fontSize: 14 },{color:themeStyles.text}]}>{item.price} VNĐ</Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
          // horizontal
        />
        </View>
  )
}

export default NewPlants

const styles = StyleSheet.create({})