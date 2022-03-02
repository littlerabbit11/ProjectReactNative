import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons';

const IoniconsHeaderButton = props => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const HomeScreen = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="search"
            iconName="menu"
            onPress={() => navigation.openDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Register"
          iconName="person-add"
          onPress={() => navigation.navigate("Register")}
        />
      </HeaderButtons>
      ),
    });
  }, [navigation]);

  // ประกาศตัวแปร userStore เพื่อรับข้อมูล
  const userStore = React.useContext(userStoreContext);

  return (
    <View style={styles.container}>
      <Ionicons name="home" size={30} color="skyblue" />
      <Text>หน้าหลัก</Text>
      {userStore.profile && (
        <>
          <Text>ยินดีต้อนรับ: {userStore.profile.name}</Text>
          <Text>อีเมล: {userStore.profile.email}</Text>
        </>
      )}
      <Button
        title="Go to About"
        onPress={() =>
          navigation.navigate('About', {
            email: 'da.siwakorn_st@tni.ac.th',
          })
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});