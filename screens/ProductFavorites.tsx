import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteProApi } from '../src/redux/actions/todoAction';
import { useTheme } from '../component/Theme';

const ProductFavorites = ({navigation}:any) => {
    const { themeStyles } = useTheme();
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.listTodoStore.Favorites || []);
    useEffect(() => {
        dispatch(fetchFavoriteProApi());
    }, [dispatch]);
    return (
        <View style={[styles.Container,{backgroundColor: themeStyles.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 20, height: 20 }} source={require('../images/back.png')} />
                </TouchableOpacity>

                <Text style={styles.Title}>SẢN PHẨM YÊU THÍCH</Text>
                <View style={{ width: 20 }} />
            </View>
            <FlatList
            style={{marginBottom:20}}
            data={favorite}
            keyExtractor={item=> item.id.toString()}
            renderItem={({item})=> {
                return(
                    <TouchableOpacity style={[styles.khung,{backgroundColor: themeStyles.background }]} onPress={()=>{
                        navigation.navigate('DetailProductScreen',{item})
                    }}>
                        <View style={styles.body}>
                        <View>
                            <Image style={styles.image}  source={{uri: item.image}}/>
                            <Text style={{textAlign:'center',fontSize: 16,color: '#007537'}}>{item.price} VNĐ</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{fontWeight: 'bold',fontSize: 16,color: '#007537',}}>{item.name}</Text>
                            {item.features && <Text style={{ color: '#7D7B7B', fontSize: 14 }}>{item.features}</Text>}
                            <Text style={{fontSize: 14,color: '#007537',fontStyle: 'italic',}}>{item.type}</Text>
                            <Text style={{fontSize: 12,color: '#555'}} numberOfLines={0}>{item.description}</Text>
                        </View>
                        </View>
                       
                    </TouchableOpacity>
                )
            }

            
                
            }
            
            />
        </View>
    )
}

export default ProductFavorites

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
    khung:{
        marginTop:20,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderColor: '#90EE90',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow:'hidden',
    },
    image:{
        width:100,
        height:100,
        borderWidth:1,
        margin:10,
        borderRadius:10,
        borderColor:'#90ee90'
    },
    body:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5,
        margin:10
    }
    
})