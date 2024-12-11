import { Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../component/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { addUserApi } from '../src/redux/actions/todoAction'; // Giả sử bạn có một action redux gọi là addUserApi

const RegisterScreen = ({ navigation }:any) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState('https://cdn-icons-png.flaticon.com/128/7710/7710521.png'); // Giả sử bạn có một input avatar để người dùng chọn ảnh
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = () => {
  if (!name.trim()) {
    Alert.alert('Lỗi', 'Vui lòng nhập họ tên');
    return;
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    Alert.alert('Lỗi', 'Địa chỉ email không hợp lệ!');
    return;
  }

  const phonePattern = /^[0-9]{10,}$/;
  if (!phonePattern.test(phone)) {
    Alert.alert('Lỗi', 'Số điện thoại không hợp lệ!');
    return;
  }

  if (password.length < 6) {
    Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự!');
    return;
  }
    const userData = {
      avatar,
      name,
      email,
      phone,
      password,
      status: false,
    };

    dispatch(addUserApi(userData))
      .then(() => {
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
        ToastAndroid.show('Đăng ký thất bại', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.Container}>
      <Image style={{ width: '100%', height: 200 }} resizeMode="contain" source={require('../images/logo1.png')} />
      <Text style={styles.title}>Đăng ký</Text>
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '400' }}>Tạo tài khoản</Text>
      <View style={styles.Noidung}>
        <CustomTextInput
          placeholder="Họ tên"
          placeholderTextColor="#A9A9A9"
          onChangeText={setName}
          inputValue={name}
        />
        <CustomTextInput
          placeholder="E-mail"
          placeholderTextColor="#A9A9A9"
          onChangeText={setEmail}
          inputValue={email}
        />
        <CustomTextInput
          placeholder="Số điện thoại"
          placeholderTextColor="#A9A9A9"
          onChangeText={setPhone}
          inputValue={phone}
        />
        <CustomTextInput
          placeholder="Mật khẩu"
          placeholderTextColor="#A9A9A9"
          isPassword={true}
          onChangeText={setPassword}
          inputValue={password}
        />
        <TouchableOpacity style={styles.btn_DangKy} onPress={handleAddUser}>
          <LinearGradient
            colors={['#007537', '#4CAF50']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
          >
            <Text style={styles.btnText}>Đăng ký</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View style={styles.line} />
          <Text style={{ marginHorizontal: 10, color: '#000000' }}>Hoặc</Text>
          <View style={styles.line} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <TouchableOpacity onPress={() => {}}>
            <Image resizeMode="contain" source={require('../images/gg.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image resizeMode="contain" source={require('../images/fb.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20 }}>
          <Text style={{ color: '#000000' }}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{ color: '#009245', marginHorizontal: 10 }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  Noidung: {
    flex: 1,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  btn_DangKy: {
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

export default RegisterScreen;
