import { Alert, Button, Image, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Block from '../component/Block';
import { ThemeProvider, useTheme } from '../component/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserApi } from '../src/redux/actions/todoAction';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Setting = ({navigation}:any) => {
    const dispatch = useDispatch();
    const { isDarkMode, toggleTheme, themeStyles } = useTheme();
    const Users = useSelector(state => state.listTodoStore.Users || []); 
    console.log('Users from Redux:', Users);
    const [isEnabled, setIsEnabled] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(""); 
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const getLoggedInUserId = async () => {
            const id = await AsyncStorage.getItem('id');
            console.log('Fetched ID from AsyncStorage:', id);
    
            if (!id) {
                Alert.alert('Lỗi', 'Bạn chưa đăng nhập hoặc thông tin bị lỗi.');
                navigation.navigate('LoginScreen');
            } else {
                setLoggedInUserId(id);
            }
        };
        getLoggedInUserId();
    }, [navigation]);
    const backgroundColor = isEnabled ? '#E0F2F1' : '#FFFFFF';
    
    // Lấy thông tin người dùng từ Redux (hoặc AsyncStorage nếu người dùng không lưu trong Redux)
    const currentUser = Users.find(user => user.id === loggedInUserId);
    console.log('Current User:', currentUser);
    const handleOpenModel = useCallback((userId) => {
        if (!userId) {
            console.error('User ID không hợp lệ');
            return;
        }
        setIdEdit(userId);
        setIsModalVisible(true);
    }, []);

    const handleCloseModel = useCallback(() => {
        setIsModalVisible(false);
        setNewPassword("");
        setConfirmPassword("");
        setCurrentPassword("");
        setIdEdit(null);
    }, []);

    const handleUpdatePassword = async () => {
        if (!currentUser) {
            Alert.alert('Lỗi', 'Không tìm thấy người dùng');
            return;
        }

        const storedPassword = await AsyncStorage.getItem('password') || currentUser.password;
        if (currentPassword !== storedPassword) {
            Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới không khớp');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }

        const updatedUserData = {
            ...currentUser,
            password: newPassword,
        };

        try {
            await dispatch(updateUserApi({
                id: currentUser.id,
                data: updatedUserData,
            }));

            await AsyncStorage.setItem('userPassword', newPassword);

            Alert.alert('Thành công', 'Mật khẩu đã được cập nhật');
            handleCloseModel();
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật mật khẩu. Hãy thử lại!');
            console.error('Error updating password:', error);
        }
    };
    return (
        <View style={[styles.Container, { backgroundColor: themeStyles.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 20, height: 20 }} source={require('../images/back.png')} />
                </TouchableOpacity>

                <Text style={styles.Title}>CÀI ĐẶT CHUNG</Text>
                <View style={{ width: 20 }} />
            </View>

            <Block style={[{ padding: 10, backgroundColor: themeStyles.background }]} title="Thông tin cá nhân">
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
                    <View>
                        <Text>
                            Họ và tên: Đinh Trọng Kiên
                            {'\n'}
                            Ngày sinh: 03/09/2004
                            {'\n'}
                            Ngành học: Công nghệ thông tin
                            {'\n'}
                            Môn học: Lập trình React Native
                            {'\n'}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Quê quán: Phú Thọ
                            {'\n'}
                            Giới tính: Nam
                            {'\n'}
                            Lớp: MD19202
                        </Text>
                    </View>
                </View>
            </Block>
            <Block style={[{ padding: 10, backgroundColor: themeStyles.background }]} title="Thông tin điện thoại">
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
                    <View>
                        <Text>
                            Tên sản phẩm: iPhone 11
                            {'\n'}
                            Hãng sản xuất: Apple
                            {'\n'}
                            Ngày ra mắt: Tháng 9 năm 2019
                            {'\n'}
                            Chip xử lý (CPU): Apple A13{'\n'}Bionic (7nm+)
                            {'\n'}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            RAM: 4GB
                            {'\n'}
                            Bộ nhớ trong: Có 3{'\n'}phiên bản(64GB,128GB,256GB)
                            {'\n'}
                            Lớp: MD19202
                        </Text>
                    </View>
                </View>
            </Block>
            <Block style={[{ padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, margin: 10, elevation: 3 }, { backgroundColor: themeStyles.background }]} title="Thiết lập riêng">
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Đổi Theme</Text>
                    <ThemeProvider>
                        <View>
                            <Switch
                                onValueChange={toggleTheme}
                                value={isDarkMode}
                            />
                        </View>
                    </ThemeProvider>
                </View>
                <TouchableOpacity onPress={() => handleOpenModel(Users[0]?.id)}>
                    <Text style={{ color: 'red', marginTop: 10 }}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </Block>

            <Modal visible={isModalVisible} transparent={true} animationType='slide'>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Mật khẩu hiện tại'
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Mật khẩu mới'
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Nhập lại mật khẩu'
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title='Hủy' onPress={handleCloseModel} color="#777" />
                            <Button title='Xác nhận' onPress={handleUpdatePassword} color="#007537" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Setting;

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
    titlettlh: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
        marginLeft: 5,
    },
    infoRow: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

