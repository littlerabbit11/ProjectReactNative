import React from 'react'
import { View, Text, Image } from 'react-native'

const Logo = () => {
    return (
        <View style={{
            flex:1,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'}}>
            <Image
                style = {{width:30,height:40}}
                source={require('../assets/react_logo.png')}
            />
        </View>
    )
}

export default Logo