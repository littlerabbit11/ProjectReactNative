import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
} from "native-base";

import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ValidateSchema = Yup.object().shape({
  name: Yup.string().required("กรุณาป้อนชื่อสกุล"),
  email: Yup.string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .required("กรุณากรอกอีเมลใหม่"),
  password: Yup.string()
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป")
    .required("กรุณาป้อนรหัสผ่าน"),
});

const RegisterScreen = () => {
  return (
    <Container>
      <Content padder>
        <Formik
        //ค่าเริ่มต้นของข้อมูลโดยกำหนดให้ตรงกับ backend
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={ValidateSchema}
          //เมื่อคลิกปุ่ม Register ให้ทำงานส้วนนี้
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {/*errors ใช้สำหรับการตรวจสอบ state(ถ้าผู้ใช้ไม่กรอกข้อมูลจะให้มี error อะไรเกิดขึ้น)*/}
          {/* touched เมื่อผู้ใช้ไปกดที่ name และเลื่อนเมาส์ออกไปด้านนอกช่อง input โดยไม่กรอกข้อมูล*/}
          {({ errors, touched,values,handleChange,handleBlur }) => ( 
            <Form>
              {/* กำหนดให้มีเส้นสีแดงถ้าผู้ใช้ไม่ได้กรอกข้อมูลชื่อ*/}
              <Item fixedLabel error={errors.name && touched.name?true:false}>
                <Label>Name</Label>
                <Input
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                { errors.name && touched.name && <Icon name='close-circle'/>}
              </Item>
              {
                  errors.name && touched.name && (
                    <Item>
                      <Label style={{color:'red'}}>{errors.name}</Label>
                    </Item>
                  )
                }
              <Item fixedLabel last error={errors.email && touched.email?true:false}>
                <Label>Email</Label>
                <Input 
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                { errors.email && touched.email && <Icon name='close-circle'/>}
              </Item>
              {
                  errors.email && touched.email && (
                    <Item>
                      <Label style={{color:'red'}}>{errors.email}</Label>
                    </Item>
                  )
                }
              <Item fixedLabel last error={errors.password && touched.password?true:false}>
                <Label>Password</Label>
                <Input 
                  value={values.email}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  />
                  { errors.password && touched.password && <Icon name='close-circle'/>}
              </Item>
              {
                  errors.password && touched.password && (
                    <Item>
                      <Label style={{color:'red'}}>{errors.password}</Label>
                    </Item>
                  )
                }
              <Button
                block
                large
                style={{ marginTop: 30, backgroundColor: "grey" }}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Register
                </Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
