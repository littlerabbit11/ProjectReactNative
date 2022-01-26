import React from "react";
import { View, Text, Button, SafeAreaView } from 'react-native';

import {styles} from '../components/style';

const ThirdPage = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1,padding:15}}>
                <View style={styles.container}>
                    <Text style={styles.textTopStyle}>
                        This is the Third Page
                    </Text>
                    <Button
                        title="Go To FIRST PAGE"
                        onPress={()=>navigation.navigate('FirstPage')}
                    />
                    <Button
                        title="Go To SECOND PAGE"
                        onPress={() => navigation.navigate('SecondPage')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ThirdPage;