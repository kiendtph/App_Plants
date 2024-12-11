import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../component/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserApi } from '../src/redux/actions/todoAction';

const LoginScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.listTodoStore.Users || []);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                dispatch(fetchUserApi());
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        loadUsers();
    }, [dispatch]);

    useEffect(() => {
        const loadStoredCredentials = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                const storedPassword = await AsyncStorage.getItem('password');
                const storedIsChecked = await AsyncStorage.getItem('isChecked');

                if (storedEmail && storedPassword && storedIsChecked === 'true') {
                    setEmail(storedEmail);
                    setPassword(storedPassword);
                    setIsChecked(true);
                }
            } catch (error) {
                console.error('Error loading credentials from storage:', error);
            }
        };

        loadStoredCredentials();
    }, []);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleLogin = async () => {
        if (!email.trim()) {
            ToastAndroid.show('Vui lòng nhập email hoặc số điện thoại', ToastAndroid.SHORT);
            return;
        }
        if (!password.trim()) {
            ToastAndroid.show('Vui lòng nhập mật khẩu', ToastAndroid.SHORT);
            return;
        }

        // Kiểm tra thông tin đăng nhập
        const user = users.find(
            (user) => (user.email === email || user.phone === email) && user.password === password
        );

        if (user) {
            if (isChecked) {
                try {
                    
                    await AsyncStorage.setItem('id', user.id);
                    await AsyncStorage.setItem('name',user.name);
                    await AsyncStorage.setItem('email', email);
                    await AsyncStorage.setItem('password', password);
                    await AsyncStorage.setItem('isChecked', 'true');
                } catch (error) {
                    console.error('Error saving credentials to storage:', error);
                }
            } else {
                try {
                    await AsyncStorage.removeItem('name');
                    await AsyncStorage.removeItem('email');
                    await AsyncStorage.removeItem('password');
                    await AsyncStorage.removeItem('isChecked');
                } catch (error) {
                    console.error('Error clearing credentials from storage:', error);
                }
            }

            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
            navigation.navigate('HomeScreen');
        } else {
            ToastAndroid.show('Email hoặc mật khẩu không đúng', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.Container}>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode="contain"
                source={require('../images/logo1.png')}
            />
            <Text style={styles.title}>Chào mừng bạn</Text>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '400', marginBottom: 20 }}>
                Đăng nhập tài khoản
            </Text>
            <View style={styles.Noidung}>
                <CustomTextInput
                    placeholder="Nhập email hoặc số điện thoại"
                    placeholderTextColor="#A9A9A9"
                    onChangeText={setEmail}
                    inputValue={email}
                />
                <CustomTextInput
                    placeholder="Mật khẩu"
                    placeholderTextColor="#A9A9A9"
                    isPassword={true}
                    onChangeText={setPassword}
                    inputValue={password}
                />
                <View style={styles.checkContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={toggleCheck}>
                            <Image
                                source={require('../images/check.png')}
                                style={{ tintColor: isChecked ? '#4CAF50' : '#949090' }}
                            />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10, color: '#949090' }}>Nhớ tài khoản</Text>
                    </View>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: '#007537' }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn_Dangnhap} onPress={handleLogin}>
                    <LinearGradient
                        colors={['#007537', '#4CAF50']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.btnText}>Đăng nhập</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View style={styles.line} />
                    <Text style={{ marginHorizontal: 10, color: '#000000' }}>Hoặc</Text>
                    <View style={styles.line} />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 20,
                        gap: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => { }}>
                        <Image resizeMode="contain" source={require('../images/gg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Image resizeMode="contain" source={require('../images/fb.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                    <Text style={{ color: '#000000' }}>Bạn chưa có tài khoản?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('RegisterScreen');
                        }}
                    >
                        <Text style={{ color: '#009245', marginHorizontal: 10 }}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

// Styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    Noidung: {
        flex: 1,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn_Dangnhap: {
        marginTop: 20,
        width: '100%',
    },
    gradient: {
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#4CAF50',
    },
});