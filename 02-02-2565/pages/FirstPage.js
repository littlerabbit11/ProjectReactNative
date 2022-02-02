import React from "react";
import { View, Text, Button, SafeAreaView } from 'react-native';
import {styles} from '../components/style';

import { Ionicons } from "@expo/vector-icons";
import Logo from "./Logo";

const FirstPage = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Logo/> ,
          headerRight: () => (
            <Button onPress={() => alert('test')} title="Register" />
          ),
        });
      }, [navigation]);

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1,padding:15}}>
                <View style={styles.container}>
                    <Ionicons name='home' size={50} color='skyblue'/>
                    <Text style={styles.textTopStyle}>
                        This is the First Page
                    </Text>
                    <Button
                        title="Go To SECOND PAGE"
                        onPress={() => navigation.navigate('SecondPage')}
                    />
                    <Button
                        title="Go To THIRD PAGE"
                        onPress={() => navigation.navigate('ThirdPage')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FirstPage;