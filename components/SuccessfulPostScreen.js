import React, {useState, createRef} from 'react';
import home from '../assets/icons/home.png';
import user from '../assets/icons/user.png';
import search from '../assets/icons/search.png';
import plusFilled from '../assets/icons/plusFilled.png';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image, 
  Button,
  Platform,
} from 'react-native';

const SuccessfulPostScreen = ({navigation}) => { 

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.heading}>FeastBook</Text>
            </View>

            <Text style={styles.heading}>Success</Text>

            <View style = {styles.footer}>
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Explore')}>
                    <Image source={home} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
                <Image source={plusFilled} style={{width: 40, height: 40}}/>
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Search')}>
                    <Image source={search} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Profile')}>
                    <Image source={user} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SuccessfulPostScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0F4C75',
        alignItems: 'center',
    },
  
    heading: {
        paddingTop:33,
        color: '#BBE1FA',
        fontSize:32,
        fontFamily: 'MontserratSB'
    },

    footer: {
        flex: 1,
        height: 40,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0F4C75',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    currentPageStyle: {
        fontFamily: 'Montserrat',
        color: "#000"
    },

    navPageStyle: {
        fontFamily: 'Montserrat',
        color: "#fff"
    },

    content: {
        fontFamily: 'MontserratSB',
        fontSize: 36,
        color: '#000'
    },

    buttonStyle: {
        borderRadius: 10,
        width: 200,
        backgroundColor: "#0F4C75",
        height: 30,
        shadowColor: '#000',
        shadowOpacity: 5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },

    submitButtonStyle: {
        borderRadius: 10,
        width: 300,
        backgroundColor: "#0F4C75",
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        shadowColor: '#000',
        shadowOpacity: 5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },

    buttonTextStyle: {
        fontFamily: 'Montserrat',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff'
    },

    submitButtonTextStyle: {
        fontFamily: 'Montserrat',
        fontSize: 24,
        color: '#fff'
    },

    loginPrompts: {
        fontFamily: 'Montserrat',
        paddingLeft: 20,
        color: '#fff',
        fontSize:16,
    },

    inputStyle: {
        fontFamily: 'Montserrat',
        backgroundColor: '#fff',
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius:10,
        padding: 10,
    },

    boxStyle: {
        fontFamily: 'Montserrat',
        backgroundColor: '#fff',
        height: 120,
        margin: 12,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius:10,
        padding: 10,
        textAlignVertical: 'top'
    },

    spacingSmall: {
        marginTop:20
    },

    spacingLarge: {
        marginTop:80
    },
});