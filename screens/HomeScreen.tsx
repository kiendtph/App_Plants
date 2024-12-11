import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Banner from '../component/Banner'
import CustomProduct from '../component/CustomProduct'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, fetchTodos1, fetchTodos2 } from '../src/redux/actions/todoAction'
import { useTheme } from '../component/Theme'
import { addViewedProduct } from '../src/redux/reducers/todoReducer'



const HomeScreen = ({ navigation }: any) => {
  const { themeStyles } = useTheme();
  const dispatch = useDispatch();
  const plants = useSelector(state => state.listTodoStore.plants || []);
  const plant_pots = useSelector(state => state.listTodoStore.plant_pots || []);
  const accessory = useSelector(state => state.listTodoStore.accessory || []);
  const viewedProducts = useSelector(state => state.listTodoStore.viewedProducts || []);

  const newProducts = [...plants, ...plant_pots, ...accessory].filter(item => item.isNew);
  const hotProducts = [...plants, ...plant_pots, ...accessory].filter(item => item.isHot);
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchTodos1());
    dispatch(fetchTodos2());
  }, [dispatch])

  
  return (

    <View style={[styles.Container, { backgroundColor: themeStyles.background }]}>
      <Banner
        textProNew="Xem hàng mới về"
        onPress={() => {
          navigation.navigate('NewPlants');
        }}
      />
      <ScrollView>
        <View style={{margin:20}}>
        <Text style={[{fontSize: 24,lineHeight: 34,fontWeight: '500',marginBottom: 10},,{color:themeStyles.text}]}>Sản phẩm mới</Text>
        <FlatList
          data={newProducts}
          keyExtractor={(item, index) => item.id ? `${item.id}_${index}` : `${index}`}
          renderItem={({ item }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,margin:10 }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(addViewedProduct(item));
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
          horizontal
        />
        </View>
        <View style={{margin:20}}>
        <Text style={[{fontSize: 24,lineHeight: 34,fontWeight: '500',marginBottom: 10},{color:themeStyles.text}]}>Sản phẩm hot</Text>
        <FlatList
          data={hotProducts}
          keyExtractor={(item, index) => item.id ? `${item.id}_${index}` : `${index}`}
          renderItem={({ item }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,margin:10}}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(addViewedProduct(item));
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
          horizontal
        />
        </View>
        <CustomProduct onPress={() => {
          navigation.navigate('ToptabPr');
        }} seeMore="Xem thêm Cây trồng"
          title="Cây trồng" style={{}}>
          <FlatList

            data={plants}
            keyExtractor={(item, index) => item.id ? `${item.id}_${index}` : `${index}`}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <TouchableOpacity onPress={() => {
                    dispatch(addViewedProduct(item));
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
        </CustomProduct>

        <CustomProduct onPress={() => {
          navigation.navigate('SeeMorePlant_pots');
        }} seeMore="Xem thêm chậu cây trồng"
          title="Chậu cây trồng" style={{}}>
          <FlatList

            data={plant_pots}
            keyExtractor={(item, index) => item.id ? `${item.id}_${index}` : `${index}`}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <TouchableOpacity onPress={() => {
                    dispatch(addViewedProduct(item));
                    navigation.navigate('DetailProductScreen', { item })
                  }}>
                    <Image style={{ width: 180, height: 180, borderRadius: 10 }} source={{ uri: item.image }} />
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
        </CustomProduct>


        <CustomProduct onPress={() => {
          navigation.navigate('SeeMoreAccessory');
        }} seeMore="Xem thêm phụ kiện"
          title="Phụ kiện cây trồng" style={{}}>
          <FlatList

            data={accessory}
            keyExtractor={(item, index) => item.id ? `${item.id}_${index}` : `${index}`}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <TouchableOpacity onPress={() => {
                    dispatch(addViewedProduct(item));
                    navigation.navigate('DetailProductScreen', { item })
                  }}>
                    <Image style={{ width: 180, height: 180, borderRadius: 10 }} source={{ uri: item.image }} />
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
        </CustomProduct>
        <View style={{ margin: 20 }}>
          <Text style={[{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 },{color:themeStyles.text}]}>Sản phẩm đã xem</Text>
          <FlatList
            data={viewedProducts}
            keyExtractor={item => item.id.toString()}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Tạo khoảng cách ngang
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginHorizontal: 5 }} // Cách mỗi sản phẩm 5px ở hai bên
                onPress={() => navigation.navigate('DetailProductScreen', { item })}
              >
                <Image
                  style={{ width: 100, height: 100, borderRadius: 5 }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={[{ fontSize: 14, textAlign: 'center', marginTop: 10 },{color:themeStyles.text}]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
})