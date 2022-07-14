import React, {useState, createRef} from 'react';
import home from '../assets/icons/home.png';
import user from '../assets/icons/user.png';
import searchFilled from '../assets/icons/searchFilled.png';
import plus from '../assets/icons/plus.png';
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
  KeyboardAvoidingView,
} from 'react-native';

const SearchScreen = ({navigation}) => { 

    const [search, setSearch] = useState('');

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.heading}>FeastBook</Text>
            </View>

            <ScrollView style={{backgroundColor: '#1B262C'}}>
            <TextInput
                    style={styles.inputStyle}
                    onChangeText={(search) => setSearch(search)}
                    placeholder="Search"
                    returnKeyType="next"
                    onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={styles.textStyle}>Recently viewed:</Text>
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
                <Image source={searchFilled} style={{width: 40, height: 40}}/>
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Profile')}>
                    <Image source={user} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchScreen;

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

    inputStyle: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        backgroundColor: '#fff',
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius:10,
        padding: 10,
    },

    textStyle: {
        fontFamily: 'Montserrat',
        paddingLeft: 20,
        color: '#fff',
        fontSize:16,
    },
});