import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomDetailPr from '../component/CustomDetailPr';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentUserApi, addFavoriteProductApi, deleteCommentUserApi, deleteFavoriteProductApi, fetchCommentUserApi } from '../src/redux/actions/todoAction';
import { useTheme } from '../component/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height

const DetailProductScreen = ({ route, navigation }: any) => {
    const { themeStyles } = useTheme();
    const [imgActive, setimgActive] = useState(0);
    const { item } = route.params;

    const Favorites = useSelector((state) => state.listTodoStore.Favorites);
    const Comments = useSelector((state) => state.listTodoStore.Comments);
    const filteredComments = Comments.filter((comment) => comment.product_id === item.id);
    const viewedProducts = useSelector(state => state.listTodoStore.viewedProducts || []);
    const [isFavorite, setIsFavorite] = useState(
        Favorites.some((product) => product.id === item.id)
    );
    const dispatch = useDispatch();


    const scrollRef = useRef<ScrollView>(null);

    const onchange = (nativeEvent: any) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != imgActive) {
                setimgActive(slide);
            }
        }
    }

    const handleNext = () => {
        if (imgActive < item.image_slider.length - 1) {
            scrollRef.current?.scrollTo({
                x: (imgActive + 1) * WIDTH,
                animated: true,
            });
            setimgActive(imgActive + 1);
        }

    };
    const handleBack = () => {
        if (imgActive > 0) {
            scrollRef.current?.scrollTo({
                x: (imgActive - 1) * WIDTH,
                animated: true,
            });
            setimgActive(imgActive - 1);
        }
    }

    const toggleFavorite = async () => {
        try {
            // setIsFavorite(!isFavorite);

            if (!isFavorite) {
                const favoriteProduct = { ...item }
                await dispatch(addFavoriteProductApi(favoriteProduct));
                ToastAndroid.show("Thêm vào yêu thích thành công!", ToastAndroid.SHORT);
                console.log('Thêm vào yêu thích thành công!');
            } else {
                await dispatch(deleteFavoriteProductApi(item.id));
                ToastAndroid.show("Xóa khỏi yêu thích thành công!", ToastAndroid.SHORT);
                console.log('Xóa khỏi yêu thích thành công!');
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Lỗi khi thêm vào danh sách yêu thích:', error);
        }
    };
    const [comments, setComments] = useState("");

    const handleAddComment = async () => {
        const userID = await AsyncStorage.getItem('id');
        const username = await AsyncStorage.getItem('name');
        const name = JSON.stringify(username)
        console.log(userID);

        const user = userID;


        if (!userID) {
            Alert.alert('Thông báo', 'Bạn cần đăng nhập để gửi bình luận.');
            return;
        }
        if (comments.trim() === '') {
            Alert.alert('Vui lòng nhập nội dung bình luận');
            return;
        }
        const date = `${new Date().getDate()}/${new Date().getMonth() + 1
            }/${new Date().getFullYear()}`;



        let duLieuThem = {
            user_id: user,
            user_name: name,
            avatar: 'https://cdn-icons-png.flaticon.com/128/666/666201.png',
            product_id: item.id,
            comment_text: comments,
            create_at: date,
            update_at: null,
        };
        dispatch(addCommentUserApi(duLieuThem))
            .then((result) => {
                console.log("Added comment successfully");
                ToastAndroid.show("Gửi bình luận thành công", ToastAndroid.SHORT);
                setComments("");
            })
            .catch((error) => {
                console.log("Error adding comment", error);
            })

    }
    useEffect(() => {
        dispatch(fetchCommentUserApi())
            .then((response) => {
                console.log("Fetched comments:", response); 
            })
            .catch((error) => {
                console.log("Error fetching comments:", error);
            });
    }, [dispatch]);
    const handleDeleteTodo = async (id) => {
        dispatch(deleteCommentUserApi(id))
            .then((res) => {
                ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);
            })
            .catch((e) => {
                console.log("Lỗi xóa: ", e);

            })
    }
    return (
        <View style={[{},{backgroundColor:themeStyles.background}]}>
        <FlatList
            ListHeaderComponent={
                <View style={[styles.Container, { backgroundColor: themeStyles.background }]}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={{ width: 20, height: 20 }} source={require('../images/back.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.name,{color:themeStyles.text}]}>{item.name}</Text>
                        <Image style={{}} source={require('../images/cart.png')} />
                    </View>

                    <View style={styles.wrap}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                            ref={scrollRef}
                        >
                            {item.image_slider.map((image, index) => (
                                <Image
                                    key={index}
                                    style={styles.wrap}
                                    resizeMode="stretch"
                                    source={{ uri: image }}
                                />
                            ))}
                        </ScrollView>
                        <View style={styles.wrapDot}>
                            {item.image_slider.map((e, index: number) =>
                                <Text
                                    key={index}
                                    style={imgActive == index ? styles.dotActive : styles.dot}
                                >●</Text>
                            )}
                        </View>
                        <View style={styles.navigationBtn}>
                            <TouchableOpacity
                                style={styles.navBtn}
                                onPress={handleBack}
                                disabled={imgActive === 0}
                            >
                                <Image
                                    source={require('../images/back1.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.navBtn}
                                onPress={handleNext}
                                disabled={imgActive === item.image_slider.length - 1}
                            >
                                <Image
                                    source={require('../images/next2.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Text style={styles.tf}>{item.type}</Text>
                                <Text style={styles.tf}>{item.features}</Text>
                            </View>
                            <TouchableOpacity onPress={toggleFavorite}>
                                <Image style={{ width: 30, height: 30 }} source={
                                    isFavorite
                                        ? require('../images/love.png')
                                        : require('../images/inlove.png')
                                } />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.price,{color:themeStyles.text}]}>{item.price + " VNĐ"}</Text>
                        <Text style={[{ fontSize: 20, fontWeight: 'bold', marginTop: 15 },{color:themeStyles.text}]}>Chi tiết sản phẩm</Text>
                        <View style={styles.line} />

                        <CustomDetailPr
                            title="Kích cỡ"
                            SubnameType={item.size}
                        />
                        <CustomDetailPr
                            title="Xuất xứ"
                            SubnameType={item.origin}
                        />
                        <CustomDetailPr
                            title="Tình trạng"
                            SubnameType={"Còn " + item.state + " sp"}
                        />
                        <Text style={[{ fontSize: 14 },{color:themeStyles.text}]}>Mô tả sản phẩm</Text>
                        <View style={styles.underline} />
                        <Text style={[{ fontSize: 14, marginTop: 10, lineHeight: 20 },{color:themeStyles.text}]}>{item.description}</Text>
                    </View>
                </View>
            }
            data={filteredComments}
            keyExtractor={(comment) => comment.id.toString()}
            renderItem={({ item }) => (
                <View style={[styles.commentItem,{backgroundColor:themeStyles.background}]}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={[styles.userName,{color:themeStyles.text}]}>{item.user_name}</Text>
                        <Text style={[styles.commentText,{color:themeStyles.text}]}>{item.comment_text}</Text>
                        <Text style={[styles.commentDate,{color:themeStyles.text}]}>{item.create_at}</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                            <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828843.png' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            ListFooterComponent={
                <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TextInput
                            value={comments}
                            onChangeText={setComments}
                            placeholder='Nhập bình luận'
                            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, flex: 1 }}
                        />
                        <TouchableOpacity onPress={handleAddComment} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../images/send.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        />
        </View>
    )
}

export default DetailProductScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.3
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dotActive: {
        margin: 3,
        color: 'black',

    },
    dot: {
        margin: 3,
        color: 'white'
    },
    navigationBtn: {
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT * 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    navBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        margin: 20,
        padding: 10
    },
    tf: {
        backgroundColor: '#009245',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        color: '#FFFFFF',
        elevation: 5,
        fontSize: 14,
    },
    price: {
        marginTop: 15,
        fontSize: 24,
        color: '#007537'
    },
    line: {
        height: 1,
        backgroundColor: '#221F1F',
        marginTop: 5,
        marginBottom: 10,
    },
    underline: {
        width: '100%',
        height: 1,
        backgroundColor: '#CCCCCC'
    },
    viewedContainer: {
        marginTop: 30,
    },
    viewedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    viewedImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    viewedText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginRight: 20,
        marginLeft: 20
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    commentText: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        lineHeight: 20,
    },
    commentDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
})