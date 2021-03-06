import React from 'react';
import {StyleSheet} from 'react-native';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Label,
} from 'native-base';
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { userStoreContext } from '../Context/UserContext';

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .required("กรุณากรอกอีเมลใหม่"),
  password: Yup.string()
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป")
    .required("กรุณาป้อนรหัสผ่าน"),
});

const LoginScreen = ({navigation}) => {
  const userStore = React.useContext(userStoreContext);
  return (
    <Container>
      <Content padder>
        <Formik
          //ค่าเริ่มต้นของข้อมูลโดยกำหนดข้อมูลให้ตรงกับ backend
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validateSchema}
          //เมื่อคลิกปุ่ม register ให้ทำงานส่วนนี้
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const url = 'https://api.codingthailand.com/api/login';
              const res = await axios.post(url, {
                email: values.email,
                password: values.password,
              });
              // alert(JSON.stringify(res.data));
              // เก็บ token ลงเครื่อง
              await AsyncStorage.setItem('@token', JSON.stringify(res.data));
              // get profile >> การทำงานที่ postman
              const urlProfile = 'https://api.codingthailand.com/api/profile';
              const resProfile = await axios.get(urlProfile, {
                headers: {
                  Authorization: 'Bearer ' + res.data.access_token,
                },
              });
              // alert(JSON.stringify(resProfile.data.data.user));
              // เก็บข้อมูล profile ลง AsyncStorage
              await AsyncStorage.setItem(
                '@profile',
                JSON.stringify(res_profile.data.data.user),
              );

              // get and update profile by context (Global State)
              const profile = await AsyncStorage.getItem('@profile');
              userStore.updateProfile(JSON.parse(profile));

              alert('เข้าสู่ระบบเรียบร้อยแล้ว');
              navigation.navigate('Home');
            } catch (error) {
              alert(error.response.data.message);
            } finally {
              // ให้ปุ่ม Register กลับไปมาใช้งานได้อีก
              setSubmitting(false);
            }
          }}
        >
          {/*errors ใช้สำหรับตรวจสอบ state(ถ้าผู้ใช้ไม่กรอกข้อมูลให้ error อะไรเกิดขึ้น*/}
          {/* touched เมื่อผู้ใช้กดที่ name แล้วไปโดนส่วนอื่นโดยไม่กรอกข้อมูลในช่อง input */}
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form>
              {/* กำหนดให้มีเส้นสีแดงถ้าผู้ใช้ไม่กรอกชื่อข้อมูล */}
              <Item
                fixedLabel
                last
                error={errors.email && touched.email ? true : false}
              >
                <Label>Email</Label>
                <Input
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {errors.email && touched.email && <Icon name="close-circle" />}
              </Item>
              {errors.email && touched.email && (
                <Item>
                  <Label style={{ color: "red" }}>{errors.email}</Label>
                </Item>
              )}
              <Item
                fixedLabel
                last
                error={errors.password && touched.password ? true : false}
              >
                <Label>Password</Label>
                <Input
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  keyboardType="number-pad"
                  secureTextEntry={true}
                />
                {errors.password && touched.password && (
                  <Icon name="close-circle" />
                )}
              </Item>
              {errors.password && touched.password && (
                <Item>
                  <Label style={{ color: "red" }}>{errors.password}</Label>
                </Item>
              )}
              <Button
                onPress={() => {
                  handleSubmit();
                  // setSubmitting(false);
                }}
                //ไว้สำหรับเปิดปิดปุ่มการทำงาน
                disabled={isSubmitting}
                block
                large
                style={{ marginTop: 30, backgroundColor: "darkblue" }}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Login
                </Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default LoginScreen;
