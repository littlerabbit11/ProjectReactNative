import React from 'react'
import { useState } from 'react'
import { StyleSheet, TextInput, View, SafeAreaView, TouchableOpacity, Text } from 'react-native'

const TouchablePractice = () => {
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const checkEmailAlert = () => {
        if(!inputEmail.trim()){
            alert("Please Enter Email")
        }else if(!inputPassword.trim()){
            alert("Please Enter Password")
        } else{
            alert("email: " + inputEmail + "\npassword: " + inputPassword)
        }
    }
    return (
        <SafeAreaView style= {{flex: 1}}>
            <View style = {styles.container}>
                <TextInput
                    placeholder = 'Email'
                    style = {styles.textInputStyle}
                    onChangeText = {(inputEmail) => {setInputEmail(inputEmail)}}
                />
                <TextInput
                    placeholder = 'Password'
                    style = {styles.textInputStyle}
                    onChangeText = {(inputPassword) => {setInputPassword(inputPassword)}}
                />
                <TouchableOpacity
                style = {styles.buttonStyle}
                activeOpacity = {0.5}
                onPress = {checkEmailAlert}
                >
                    <Text style = {styles.buttonTextStyle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default TouchablePractice

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 35,
    },
    textInputStyle: {
    width: '100%',
    height: 40,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    marginTop: 15,
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#841584',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 10,
        }
        
});
