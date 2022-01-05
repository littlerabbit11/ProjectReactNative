import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstPage from './screens/FirstPage'
import SecondPage from './screens/SecondPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="First"
          component={FirstPage}
          options={{title: 'First Page'}}
        />
        <Stack.Screen
          name="Second"
          component={SecondPage}
          options={{title: 'Second Page'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
