import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Background } from '@react-navigation/elements'
import CustomSection from '../component/CustomSection'

const WelcomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigation])
  return (
    <View style={styles.container}>
      <CustomSection title='Thông tin sinh viên' style={{}}>
        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
            <Text>
              Họ và tên: Đinh Trọng Kiên
            </Text>
            <Text>
              Mã sinh viên: PH37589
            </Text>
        </View>
      </CustomSection>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.img}>
          <Image style={styles.img} source={require('../images/logo1.png')} />
        </View>

        <Text style={styles.title}>Welcome to Apptrees</Text>

      </View>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color='#A5D6A7' size={30} />
        <Text style={{ marginTop: 10, color: '#A5D6A7' }}>Please wait, loading...</Text>
      </View>

    </View>

  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  img: {
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#00796B',
  },
  indicatorContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  }
})