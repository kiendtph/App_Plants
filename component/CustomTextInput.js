import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CustomTextInput = ({
  placeholder,
  placeholderTextColor,
  isPassword = false,
  style = {},
  onChangeText,
  inputValue
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassWord, setShowPassWord] = useState(false);

  return (
    <View style={[styles.textinput, isFocused && inputValue ? styles.inputFocused : styles.textinput]}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || '#000fff'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(inputValue.length > 0)}
        onChangeText={onChangeText} // Lắng nghe sự thay đổi văn bản
        value={inputValue} // Đảm bảo giá trị đầu vào được gán từ state của cha
        secureTextEntry={isPassword && !showPassWord}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassWord(!showPassWord)} style={styles.eyeIcon}>
          <Image
            source={showPassWord ? require('../images/eye_open.png') : require('../images/eye_close.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput

const styles = StyleSheet.create({
    textinput:{
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    inputFocused: {
        borderColor: '#00796B',
      },
    input:{
        fontSize: 16,
    paddingVertical: 10,
    flex:1
    },
    eyeIcon:{
        padding:5
    }
})