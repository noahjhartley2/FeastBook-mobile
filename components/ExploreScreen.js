import React, {useState, createRef, useEffect} from 'react';
import homeFilled from '../assets/icons/homeFilled.png';
import user from '../assets/icons/user.png';
import search from '../assets/icons/search.png';
import plus from '../assets/icons/plus.png';
import like from '../assets/icons/like.png';

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
  FlatList
} from 'react-native';

const ExploreScreen = ({navigation}) => { 
    
    const [postResults, setPostResults] = useState([]);
    const [favResults, setFavResults] = useState([]);
    const userId = localStorage.getItem('userID');
    const [isFaved, setIsFaved] = useState(false)

    useEffect(() => {
        displayPosts();
        getFavorites();
    }, []);

    const displayPosts = () => {
        fetch('https://feastbook.herokuapp.com/api/posts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.results[0].userid)
            let arr = [];
            for (let i = 0; i < response.results.length; i++) {
                let temp = {
                    name: response.results[i].name,
                    image: response.results[i].photo,
                    ingredients: response.results[i].ingredients,
                    directions: response.results[i].directions,
                    id: response.results[i]._id,
                    posterId: response.results[i].userid
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
    }

    const addLike = (postId, posterId) => {
        let dataToSend = {userid: posterId, postid: postId};
        var s = JSON.stringify(dataToSend)
        console.log(s);
        fetch('https://feastbook.herokuapp.com/api/likepost', {
            method: 'POST',
            headers: {
                //'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: s,
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getFavorites = () => {
        let dataToSend = {userid: userId}
        var s = JSON.stringify(dataToSend)
        fetch('https://feastbook.herokuapp.com/api/getfavorite', {
            
            method: 'POST',
            headers: {
                //'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: s
        })
        .then((response) => response.json())
        .then((response) => {
            let arr = [];
            for (let i = 0; i < response.results.length; i++) {
                let temp = {
                    favUserId: response.results[i].userid,
                    favPostId: response.results[i]._id,
                }
                arr.push(temp);
            }
        setFavResults(arr);

        })
        .catch((error) => {
            console.error(error);
        });
    }

    const isFavorited = (postId) => {
        setIsFaved(false)
        for (let i = 0; i < favResults.length; i++) {
            if (postId === favResults[i]._id) setIsFaved(true)
        }
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.heading}>FeastBook</Text>
            </View>

            <SafeAreaView style={{backgroundColor: '#1B262C', flex: 1}}>

                <View style={{flex: 1}}>
                    <FlatList data={postResults} renderItem={({item}) => 
                        <View>
                            <Image style={styles.postImage} source={{uri: item.image}}/>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.postName}>{item.name}</Text>
                                <TouchableOpacity
                                    stlye={styles.buttonStyle}
                                    onPress={()=>addLike(item.id, item.posterId)}>
                                    <Image source={like} style={{width: 28, height: 28, position: 'absolute', right: 0}}/>
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
                <View style={styles.spacingSmall}></View>
            </SafeAreaView>

            <View style = {styles.footer}>
                <Image source={homeFilled} style={{width: 40, height: 40}}/>
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
                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Profile')}>
                    <Image source={user} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExploreScreen;

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
        paddingLeft: '3%',
        width: '95%',
        fontFamily: 'MontserratSB',
        fontSize: 18,
        color: '#fff'
    },

    postBody: {
        paddingLeft: '2%',
        fontFamily: 'MontserratSB',
        fontSize: 16,
        color: '#fff'
    },

    postText: {
        paddingLeft: '2%',
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