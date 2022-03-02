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
          onSubmit={async (values, { setSubmitting }) => {
            // same shape as initial values
            //console.log(values);
            //alert(JSON.stringify(values));
            try {
              const url = "https://api.codingthailand.com/api/register";
              const res = await axios.post(url, {
                name: values.name,
                email: values.email,
                password: values.password,
              });
              alert(res.data.message);
              navigation.navigate("Home");
            } catch (error) {
              //ถ้าไม่สามารถบันทึกข้อมูลลง server ได้ เช่น อีเมล์ซ้ำ
              alert(error.response.data.errors.email[0]);
            } finally {
              //ให้ปุ่มสามารถกลับมากดได้อีกครั้ง
              setSubmitting(false);
            }
          }}
        >
          {/*errors ใช้สำหรับการตรวจสอบ state(ถ้าผู้ใช้ไม่กรอกข้อมูลจะให้มี error อะไรเกิดขึ้น)*/}
          {/* touched เมื่อผู้ใช้ไปกดที่ name และเลื่อนเมาส์ออกไปด้านนอกช่อง input โดยไม่กรอกข้อมูล*/}
          {({ errors, touched,values,handleChange,handleBlur,handleSubmit,isSubmitting,setSubmitting, }) => ( 
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
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  keyboardType="number-pad"
                  secureTextEntry={true}
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
                 onPress={() => {
                  handleSubmit();
                }}
                //ไว้สำหรับเปิดปิดปุ่มการทำงาน
                disabled={isSubmitting}
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
