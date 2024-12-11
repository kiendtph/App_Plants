import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from './Theme';

const CustomProduct = ({onPress, seeMore, title, children, style }) => {
    const { themeStyles } = useTheme();
    return (
        <View style={styles.Container}>
            

            <View style={styles.body}>
                {title && <Text style={[styles.title,{color:themeStyles.text}]}>{title}</Text>}
                <View style={styles.noiDung}>
                    {children}
                </View>
            </View>
            <View style={styles.header}>
                <TouchableOpacity onPress={
                    onPress
                }>
                    <Text style={[styles.seemore,{color:themeStyles.text}]}>{seeMore}</Text>
                    <View style={[styles.underline, style && style.underline]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomProduct

const styles = StyleSheet.create({
    Container: {
    },
    header: {
        padding:20,
        // width:'100%',
        flexDirection: 'row',      
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    seemore: {
        fontSize: 16,
        lineHeight: 20,
        color: '#221F1F'
    },
    underline: {
        width: '100%',
        height: 1,
        backgroundColor: '#221F1F'
    },
    body: {
        margin: 20
    },
    title: {
        fontSize: 24,
        lineHeight: 34,
        fontWeight: '500',
        marginBottom: 10
    }
})