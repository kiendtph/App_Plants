import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Block from '../component/Block'
import { useTheme } from '../component/Theme';

const Contact = ({ navigation }: any) => {
    const { themeStyles } = useTheme();
    return (
        <View style={[{ flex: 1},{backgroundColor: themeStyles.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 20, height: 20 }} source={require('../images/back.png')} />
                </TouchableOpacity>

                <Text style={styles.Title}>THÔNG TIN LIÊN HỆ</Text>
                <View style={{ width: 20 }} />
            </View>
            <Block style={[{ padding: 15,borderRadius: 10, margin: 10, elevation: 3},{backgroundColor: themeStyles.background }]} title="Thông tin liên hệ">
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: '#4CAF50',
                            marginRight: 15,
                        }}
                        source={require('../images/Myprofile.jpg')}
                    />

                    <View style={{}}>
                        <View style={styles.infoRow}>
                            <Text style={styles.titlettlh}>Họ và tên:</Text>
                            <Text style={styles.infoText}>Đinh Trọng Kiên</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.titlettlh}>Email:</Text>
                            <Text style={styles.infoText}>dinhtrongkien2004@gmail.com</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.titlettlh}>Số điện thoại:</Text>
                            <Text style={styles.infoText}>0346752715</Text>
                        </View>
                    </View>
                </View>
            </Block>
        </View>
    )
}

export default Contact

const styles = StyleSheet.create({
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
        color: 'black',
        marginTop: 4,
        marginLeft: 5,

    },
    infoRow: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flex: 1,
    },
})