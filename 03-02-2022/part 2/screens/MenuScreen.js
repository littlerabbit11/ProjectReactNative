import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { userStoreContext } from '../Context/UserContext';

const MenuScreen = ({ navigation }) => {
  const userStore = React.useContext(userStoreContext);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await AsyncStorage.getItem("@profile");
      if (profile != null) {
        userStore.updateProfile(JSON.parse(profile));
        // setProfile(JSON.parse(profile));
      }
    };
    getProfile();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 150,
            width: undefined,
          }}
        >
          <Text
            style={{
              color: "blue",
              fontSize: 20,
              fontWeight: "bold",
              padding: 20,
            }}
          >
            Main Menu
          </Text>
          {/* แสดงข้อมูล profile ที่เมนูด้านข้างต่อจากข้อความเมนูหลัก */}
          {userStore.profile && (
            <>
              <Text
                style={{
                  color: "blue",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Welcome khun: {userStore.profile.name}
              </Text>
              <Text
                style={{
                  color: "blue",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Email: {userStore.profile.email}
              </Text>
            </>
          )}
        </View>
        {/* Native base code starts here */}
        <Content>
          <ListItem
            icon
            style={{ marginBottom: 10, marginTop: 10 }}
            onPress={() => {
              navigation.navigate("HomeStack");
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="home" />
              </Button>
            </Left>
            <Body>
              <Text>หน้าหลัก</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem
            icon
            onPress={() => {
              navigation.navigate("ProductStack");
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="cube" />
              </Button>
            </Left>
            <Body>
              <Text>สินค้า</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          {!userStore.profile && (
            <ListItem
              icon
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Left>
                <Button style={{ backgroundColor: "green" }}>
                  <Icon active name="log-in" />
                </Button>
              </Left>
              <Body>
                <Text>Login</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          )}
          {userStore.profile && (
            <ListItem
              icon
              onPress={async () => {
                await AsyncStorage.removeItem("@token");
                await AsyncStorage.removeItem("@profile");
                userStore.updateProfile(null);
                navigation.closeDrawer();
              }}
            >
              <Left>
                <Button style={{ backgroundColor: "red" }}>
                  <Icon active name="log-out" />
                </Button>
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          )}
        </Content>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
