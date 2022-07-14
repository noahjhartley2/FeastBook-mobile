import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword1, setUserPassword1] = useState('');
    const [userPassword2, setUserPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!firstName || !lastName) {
            alert('First and last name required');
        }
        if (!username) {
            alert('Username required');
            return;
        }
        if (!userEmail) {
            alert('Email required');
            return;
        }
        if (!userPassword1) {
            alert('Password required');
            return;
        }
        if (!userPassword2) {
            alert('Passwords must match');
            return;
        }
        setLoading(true);
        let dataToSend = {
            firstName: firstName,
            lastName: lastName,
            login: username, 
            password: userPassword1,
            email: userEmail
        };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://feastbook.herokuapp.com/api/register', {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setLoading(false);
            console.log(responseJson);
            
            if (responseJson.status == 'success') {
                navigation.navigate('LoginScreen');
            }
            else {
                setErrortext(responseJson.msg);
                console.log('Registration unsuccessful');
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }

    return (
        <View style = {styles.mainBody}>
            <View style={styles.header}>
                <Text style={styles.heading}>FeastBook</Text>
            </View>
            <ScrollView>
                <SafeAreaView style={styles.SafeAreaView}>
                    <Text style={styles.loginPrompts}>First Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(firstName) => setFirstName(firstName)}
                        placeholder="First Name"
                        returnKeyType="next"
                        onSubmitEditing={() => 
                            passwordInputRef.current && passwordInputRef.current.focus()
                        }
                    />
                    <Text style={styles.loginPrompts}>Last Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(lastName) => setLastName(lastName)}
                        placeholder="Last Name"
                        returnKeyType="next"
                        onSubmitEditing={() => 
                            passwordInputRef.current && passwordInputRef.current.focus()
                        }
                    />
                    <Text style={styles.loginPrompts}>Username</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(username) => setUsername(username)}
                        placeholder="Username"
                        returnKeyType="next"
                        onSubmitEditing={() => 
                            passwordInputRef.current && passwordInputRef.current.focus()
                        }
                    />

                    <Text style={styles.loginPrompts}>Email</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(userEmail) => setUserEmail(userEmail)}
                        placeholder="Email"
                        returnKeyType="next"
                        onSubmitEditing={() => 
                            passwordInputRef.current && passwordInputRef.current.focus()
                        }
                    />

                    <Text style={styles.loginPrompts}>Password</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(userPassword1) => setUserPassword1(userPassword1)}
                        placeholder="Password"
                        secureTextEntry={true}
                        returnKeyType="next"
                        onSubmitEditing={() => 
                            passwordInputRef.current && passwordInputRef.current.focus()
                        }
                    />

                    <Text style={styles.loginPrompts}>Re-enter Password</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(userPassword2) => setUserPassword2(userPassword2)}
                        placeholder="Password"
                        secureTextEntry={true}
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </SafeAreaView>

                {errortext != '' ? (
                    <Text style={styles.errorTextStyle}>
                        {errortext}
                    </Text>
                ) : null}

                <View style={styles.spacingSmall}></View>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={handleSubmitPress}>
                    <Text style={styles.buttonTextStyle}>Register</Text>
                </TouchableOpacity>

                <View style={styles.spacingSmall}></View>
                <View style={styles.divider}></View>
                <View style={styles.spacingSmall}></View>

                <TouchableOpacity
                    stlye={styles.buttonStyle}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTextStyle}>Already registered? Click here to sign in!</Text>
                </TouchableOpacity>
                <View style={styles.spacingSmall}></View>
            </ScrollView>
            <View style={styles.fill}></View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0F4C75',
        alignItems: 'center',
    },
  
    heading: {
        paddingTop:33,
        color: '#BBE1FA',
        fontSize:32,
        fontFamily: 'MontserratSB',
    },

    mainBody: {
        backgroundColor: '#1B262C'
    },

    SafeAreaView: {
        marginTop: 30,
        backgroundColor: '#1B262C',
    },

    loginPrompts: {
        paddingLeft: 20,
        color: '#fff',
        fontSize:16,
        fontFamily: 'Montserrat',
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

    errorTextStyle: {
    },

    buttonStyle: {
        marginLeft:20,
        marginRight:20,
        backgroundColor: "#0F4C75",
        height: 30,
        borderRadius: 10,
    },

    buttonTextStyle: {
        fontFamily: 'Montserrat',
        alignSelf: 'center',
        fontSize:18,
        color: '#fff'
    },

    registerTextStyle: {
    },

    spacingSmall: {
        marginTop:20
    },

    divider: {
        border: 'solid',
        borderWidth: 1,
        borderColor: "#BBE1FA"
    },

    fill: {
        marginTop: 3000
    }
  });