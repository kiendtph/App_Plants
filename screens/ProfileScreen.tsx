import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../component/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserApi } from '../src/redux/actions/todoAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }: any) => {
  const { themeStyles } = useTheme();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.listTodoStore.Users || []);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data only if `users` is empty or we don't have the current user
        if (!users.length) {
          await dispatch(fetchUserApi()); // Fetch user data from the API
        }

        // Get the user ID from AsyncStorage
        const id = await AsyncStorage.getItem('id');
        if (id) {
          // Wait until `users` is populated
          const user = users.find((u) => u.id === id);
          if (user) {
            setCurrentUser(user); // Set the current user based on the ID
          }
        } else {
          console.warn('No user ID found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Only fetch the data if `currentUser` is not set
    if (!currentUser) {
      fetchData();
    }
  }, [dispatch, users, currentUser]); // Ensure effect runs when `users` or `currentUser` change

  // Show loading screen while fetching data
  if (!currentUser) {
    return (
      <View style={[styles.Container, { backgroundColor: themeStyles.background }]}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.Container, { backgroundColor: themeStyles.background }]}>
      <View style={{ margin: 20 }}>
        <Text style={[styles.title,{color:themeStyles.text}]}>PROFILE</Text>
        <View style={[styles.profileName, { backgroundColor: themeStyles.background }]}>
          <View style={styles.person}>
            <Image style={styles.avatar} source={{ uri: currentUser.avatar }} />
          </View>

          <View style={[styles.info]}>
            <Text style={[styles.name,{color:themeStyles.text}]}>{currentUser.name}</Text>
            <Text style={[styles.email,{color:themeStyles.text}]}>{currentUser.email}</Text>
          </View>
        </View>
        <View style={styles.profile}>
          <Text style={[styles.nameTitle,{color:themeStyles.text}]}>Chung</Text>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Setting');
            }}
          >
            <Text style={[styles.infoNoidung,{color:themeStyles.text}]}>Thông tin cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Contact');
            }}
          >
            <Text style={[styles.infoNoidung,{color:themeStyles.text}]}>Thông tin liên hệ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductFavorites');
            }}
          >
            <Text style={[styles.infoNoidung,{color:themeStyles.text}]}>Sản phẩm yêu thích</Text>
          </TouchableOpacity>
          <Text style={[styles.nameTitle1,{color:themeStyles.text}]}>Bảo mật và Điều khiển</Text>
          <View style={styles.line} />
          <TouchableOpacity>
            <Text style={[styles.infoNoidung,{color:themeStyles.text}]}>Điều khoản và điều kiện</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.infoNoidung,{color:themeStyles.text}]}>Chính sách quyền riêng tư</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Thông báo',
                'Bạn có chắc muốn đăng xuất?',
                [
                  {
                    text: 'Không',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Có',
                    onPress: () => navigation.navigate('LoginScreen'),
                  },
                ]
              );
            }}
          >
            <Text style={[styles.infoNoidung1,{color:themeStyles.text}]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileName: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  person: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#757575',
  },
  profile: {
    marginTop: 40,
  },
  nameTitle: {
    fontSize: 16,
    color: '#7F7F7F',
  },
  nameTitle1: {
    marginTop: 20,
    fontSize: 16,
    color: '#7F7F7F',
  },
  line: {
    height: 1,
    backgroundColor: '#ABABAB',
    marginVertical: 5,
  },
  infoNoidung: {
    fontSize: 16,
    marginTop: 20,
  },
  infoNoidung1: {
    fontSize: 16,
    marginTop: 20,
    color: '#FF0000',
  },
});
