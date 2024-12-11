import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useTheme } from '../component/Theme';

const shadeLoving = ({navigation}:any) => {
  const { themeStyles } = useTheme();
  const plants = useSelector(state => state.listTodoStore.plants || []);
  const shadeLovingPlants = plants.filter(plant => plant.features === 'Ưa bóng');
  return (
    <View style={[styles.container,{backgroundColor:themeStyles.background}]}>
      <Text style={[styles.title,{color:themeStyles.text}]}>Sản phẩm ưa bóng</Text>
      <FlatList
        data={shadeLovingPlants}
        keyExtractor={item => item.id}

        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{
            navigation.navigate('DetailProductScreen',{item})
          }}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: item.image }} />
                <Text style={[styles.itemPrice,{color:themeStyles.text}]}>{item.price} VNĐ</Text>
              </View>

              <View style={{flex:1,marginLeft:10}}>
                <Text style={[styles.itemName,{color:themeStyles.text}]}>{item.name}</Text>
                <Text  style={[{ color: '#7D7B7B', fontSize: 14 },{color:themeStyles.text}]}>{item.features}</Text>
                <Text style={[{},,{color:themeStyles.text}]}>{item.origin}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default shadeLoving

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
    textAlign:'center',
    marginTop:10
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
})