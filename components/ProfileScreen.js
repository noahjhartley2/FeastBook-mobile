import React, {useState, createRef, useEffect} from 'react';
import home from '../assets/icons/home.png';
import userFilled from '../assets/icons/userFilled.png';
import search from '../assets/icons/search.png';
import plus from '../assets/icons/plus.png';
import deleteIcon from '../assets/icons/deleteIcon.png';
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
  FlatList,
  ListItem
} from 'react-native';

const ProfileScreen = ({navigation}) => { 

    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userID');
    const username = localStorage.getItem('username');
    const [postResults, setPostResults] = useState([]);

    useEffect(() => {
        let dataToSend = {id: userId};
        var s = JSON.stringify(dataToSend)
        //console.log(s);
        fetch('http://192.168.1.158:5000/api/userposts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: s,
        })
        .then((response) => response.json())
        .then((response) => {
            let arr = [];
            for (let i = 0; i < response.results.length; i++) {
                let temp = {
                    name: response.results[i].name,
                    image: response.results[i].photo,
                    ingredients: response.results[i].ingredients,
                    directions: response.results[i].directions,
                    id: response.results[i]._id
                }
                arr.push(temp);
            }
            //console.log(response);
            //console.log(response.results[0])
            setPostResults(arr)
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const handleDelete = postId => {
        let dataToSend = {id: userId, postid: postId};
        var s = JSON.stringify(dataToSend)
        console.log(s);
        fetch('http://192.168.1.158:5000/api/deletepost', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: s,
        })
        .then((response) => response.json())
        .then((response) => {
            setLoading(false);
            console.log(response);
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.heading}>FeastBook</Text>
            </View>

            <ScrollView style={{backgroundColor: '#1B262C', flex: 1}}>
                <Text style={styles.username}>{username}</Text>
                <View style={styles.spacingSmall}></View>

                <View>
                    <FlatList data={postResults} renderItem={({item}) => 
                        <View>
                            <Image style={styles.postImage} source={{uri: item.image}}/>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.postName}>{item.name}</Text>
                                <TouchableOpacity
                                    stlye={styles.buttonStyle}
                                    onPress={()=>handleDelete(item.id)}>
                                    <Image source={deleteIcon} style={{width: 28, height: 28, position: 'absolute', right: 0}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.body}>
                                <Text style={styles.postBody}>Ingredients</Text>
                                <Text style={styles.postText}>{item.ingredients}</Text>
                            </View>

                            <View style={{marginTop:5}}></View>

                            <View style={styles.body}>
                                <Text style={styles.postBody}>Directions</Text>
                                <Text style={styles.postText}>{item.directions}</Text>
                            </View>
                            <View style={{marginTop:30}}></View>
                        </View>
                    }/>
                </View>

                <View style={styles.spacingLarge}></View>
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

export default ProfileScreen;

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

    username: {
        marginTop: 10,
        paddingLeft: 10,
        fontFamily: 'MontserratSB',
        fontSize: 36,
        color: '#fff'
    },

    postImage: {
        width: '100%',
        aspectRatio: 4/4,
    },

    postName: {
        marginTop: 3,
        marginBottom: 3,
        paddingLeft: 15,
        width: '95%',
        fontFamily: 'MontserratSB',
        fontSize: 18,
        color: '#fff'
    },

    postBody: {
        paddingLeft: 10,
        fontFamily: 'MontserratSB',
        fontSize: 16,
        color: '#fff'
    },

    postText: {
        paddingLeft: 10,
        fontFamily: 'Montserrat',
        fontSize: 16,
        color: '#fff'
    },

    body: {
        border: 'solid',
        borderWidth: 4,
        borderColor: '#0F4C75',
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center'
    },

    spacingSmall: {
        marginTop:20
    },

    spacingLarge: {
        marginTop:80
    },
});