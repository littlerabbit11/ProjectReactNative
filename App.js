// import React in our code
import React from 'react';
import {useState} from 'react';
// import all the components we are going to use
import { 
  TextInput, 
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View
} from 'react-native';

const App = () => {
  
  const [innputValue, setInputValue] = useState('')

  const checkValueIsNumberOrNot = () => {
    if(isNaN(innputValue)){
      alert("It is not a number");
    }else{
      alert("It is a Number");
    }
  };


  return(
    <SafeAreaView style={{flex:1}}>
      <View style = {styles.container}>
        <TextInput
          placeholder = "Enter Text"
          style = {styles.textInputStyle}
          onChangeText = {(innputValue) => {setInputValue(innputValue)}}
        />
        <Button
          title = "Check Value Is Number or Not"
          color = "#606070"
          onPress = {checkValueIsNumberOrNot}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : "center",
    marginTop : 60
    },
    textInputStyle:{
      textAlign:"center",
      height:50,
      width:'70%',
      marginBottom:10,
      borderColor:"black"
    }
  });

export default App;