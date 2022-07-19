import React, {useState, createRef, useEffect} from 'react';
import home from '../assets/icons/home.png';
import userFilled from '../assets/icons/userFilled.png';
import search from '../assets/icons/search.png';
import plus from '../assets/icons/plus.png';
import 'localstorage-polyfill';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisitedProfileScreen = ({route, navigation}) => { 

    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const {visitedUser, visitedId} = route.params;

    // useEffect(() => {
        
    //     console.log(userId);
    //     let dataToSend = {
    //         userId:userId
    //     }
    //     let s = JSON.stringify(dataToSend);
    //     console.log(s);
    //     fetch('http://localhost:5000/api/searchuser', {
    //         method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: s,
    //     })
    //     .then((response) => response.json())
    //         .then((response) => {
    //             setLoading(false);
    //             console.log(response.results.firstName);
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.error(error);
    //         });
    // })

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.heading}>FeastBook</Text>
            </View>

            <ScrollView style={{backgroundColor: '#1B262C'}}>
                <Text style={styles.content}>{visitedUser}</Text>
                <Text style={styles.content}>{visitedId}</Text>
            </ScrollView>

            <View style = {styles.footer}>
                
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Explore')}>
                    <Image source={home} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Post')}>
                    <Image source={plus} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Search')}>
                    <Image source={search} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
                <Image source={userFilled} style={{width: 40, height: 40}}/>
            </View>
        </View>
    )
}

export default VisitedProfileScreen;

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
    }
});