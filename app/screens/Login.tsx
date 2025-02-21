import { TouchableOpacity , View, Text , StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native'
import { Image } from 'react-native';


interface RouterProps {
    navigation : NavigationProp<any, any>;
}


const Login = ({navigation} : RouterProps) => {
    const [email , setEmail] = useState('') ;
    const [password , setPassword] = useState('') ;
    const [loading , setLoading] = useState(false) ;
    const auth = FIREBASE_AUTH;
    

    const signIn = async () => {

        setLoading(true) ;
        try {
            const res = await signInWithEmailAndPassword(auth ,email, password);
            console.log(res); 
            alert('Login Success')
        }catch (error: any) {
            console.log(error);
            alert('Login Failed: ' + error.message);
        }finally {
            setLoading(false);
        }
    }
    
  return (
    <View  style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.logo}>เข้าสู่ระบบ</Text>
        <Text style={{fontSize:12 , textAlign:'center' , marginBottom : 30  , color : '#dark'}}>Yukya เป็นแอปพลิเคชันสำหรับเตือนการรับประทานยา</Text>

        <View style={styles.containerLogin}>
            <Text style={styles.label}>Email ของบัญชีผู้ใช้</Text>
            <TextInput value={email} style={styles.input} placeholder='กรอก Email ของผู้ใช้' 
            autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
            <Text style={styles.label2}>รหัสผ่านบัญชีผู้ใช้</Text>
            <TextInput value={password} style={styles.input} placeholder='กรอกรหัสผ่านบัญชีผู้ใช้' 
            autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true}></TextInput>
            {loading ? <ActivityIndicator size='large' color="#000ff" />: <>
            <TouchableOpacity style={styles.btn} onPress={signIn}>
                <Text style={styles.btnText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
            <Text>
                <Text >ยังไม่มีบัญชีผู้ใช้ ? </Text>
                <Text style={styles.btnTextRegister}>สมัครสมาชิก</Text>
            </Text>
            </TouchableOpacity>
             
            </>
            }
        </View>
        </KeyboardAvoidingView>
        <Text style={styles.version}>Version 1.1</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container : {
        
        flex : 1,
        justifyContent: 'center',
        backgroundColor : '#cbf2f5',
        position : 'relative'
    },
    label: {
        alignSelf: "flex-start", // จัดตำแหน่งให้ชิดซ้าย
        marginLeft: "13%", // เพิ่มระยะห่างจากขอบซ้าย
        fontSize: 12,
        fontFamily: "Inter_400Regular",
        marginBottom: 5, // ระยะห่างระหว่างข้อความกับ TextInput
        color: "#333",
      },
      label2: {
        alignSelf: "flex-start", // จัดตำแหน่งให้ชิดซ้าย
        marginLeft: "13%", // เพิ่มระยะห่างจากขอบซ้าย
        fontSize: 12,
        fontFamily: "Inter_400Regular",
        marginTop: 20,
        marginBottom: 5, // ระยะห่างระหว่างข้อความกับ TextInput
        color: "#333",
      },
    containerLogin : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    input : {
        marginVertical : 4 , 
        height: 50 ,
        borderWidth : 0 ,
        borderRadius : 20 ,
        padding : 10 , 
        backgroundColor : '#fff' , 
        width : '80%',
        
    },
    logo : {
        fontSize : 32,
        textAlign: 'center',
        fontWeight : 800 ,
        color : 'dark',
        marginBottom : 10 ,
    },
    btn : {
        borderWidth : 1,
        backgroundColor : '#00524D',
        borderColor : '#00524D',
        width : "80%",
        display : 'flex',
        justifyContent : 'center' ,
        alignItems : 'center' ,
        height : 50 , 
        borderRadius : 20 , 
        marginTop : 20

    },
    btnText : {
        fontSize : 16 ,
        color : '#fff',
        fontWeight : 800 ,

    },
    btnRegister : {
        // borderWidth : 1,
        borderColor : '#fff',
        width : "80%",
        display : 'flex',
        justifyContent : 'center' ,
        alignItems : 'center' ,
        height : 50 , 
        borderRadius : 10 , 
        marginTop : 10
    },
    btnTextRegister : {
        fontSize : 16 ,
        color : "#00524D",
        textDecorationLine: "underline", // เพิ่มขีดเส้นใต้

    },
    version : {
        textAlign : 'center' ,
        color : "#dark" , 
        position : 'absolute' ,
        bottom : 40,
        left : 30
    }
    
})
