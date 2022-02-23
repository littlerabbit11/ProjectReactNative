import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Badge,
} from "native-base";

const DetailScreen = ({ navigation, route }) => {
  const { id, title } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      //title:'รายละเอียดสินค้า' //set แบบ static
      title: title, //set แบบ dynamic
    });
  }, [navigation]);

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  //getData from server
  const getData = async (id) => {
    setLoading(true);
    const res = await axios.get(
      "https://api.codingthailand.com/api/course/" + id
    );
    // alert(JSON.stringify(res.data.data[0].title));
    setDetail(res.data.data);
    setLoading(false);
  };

  //useEffect when A Product is selected
  useEffect(() => {
    getData(id);
  }, [id]);

  const _onRefresh = () => {
    getData(id);
  };

  return (
    <View>
      <FlatList
        // set the data form server
        data={detail}
        // Extract the key from the data with keyExtractor
        keyExtractor={(item, index) => item.ch_id.toString()}
        //pull to refresh
        onRefresh={_onRefresh}
        refreshing={loading} //ถ้า refreshing เป็น true คือจะรอให้ refresh data
        // render the data with renderItem
        renderItem={({ item,index }) => (
          <ListItem thumbnail>
            <Left>
              <Text>{index+1}</Text>
            </Left>
            <Body>
              <Text>{item.ch_title}</Text>
              <Text note numberOfLines={1}>
                {item.ch_detail}
              </Text>
            </Body>
            <Right>
              <Badge danger>
                <Text>{item.ch_view}</Text>
              </Badge>
              {/* <Button transparent>
                <Text>View</Text>
              </Button> */}
            </Right>
          </ListItem>
        )}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
