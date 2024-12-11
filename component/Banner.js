import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from './Theme';

const Banner = ({onPress,textProNew}) => {
    const { themeStyles } = useTheme();
    return (
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../images/banner.png')}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={styles.title}>Planta - toả sáng{'\n'}không gian nhà bạn</Text>
                <Image style={{marginRight:20}} source={require('../images/cart.png')}/>
                </View>
                    <TouchableOpacity onPress={
                        onPress
                    }>
                        <View style={{ flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.textProNew}>{textProNew}</Text>
                            
                            <Image style={{ width: 20, height: 20,marginLeft:10 }} source={require('../images/next.png')} />
                        </View>

                    </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: 205
    },
    title: {
        fontSize: 24,
        fontFamily: 'Lato-Black',
        fontWeight: '500',
        marginLeft:20,
        marginTop: 20,
    },

    textProNew: {
        fontSize: 16,
        color: '#007537',
        fontWeight: '500',
        fontFamily: 'Lato-Black',
        marginLeft:20,
        marginTop:20,
        marginBottom:20
    }
})
export default Banner