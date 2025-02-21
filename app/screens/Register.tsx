import { TouchableOpacity , View, Text , StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';


interface RouterProps {
    navigation : NavigationProp<any, any>;
}
const Register = ({navigation} : RouterProps) => {
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password'); // ดึงค่าของ password ที่ผู้ใช้กรอกไว้
    const [email , setEmail] = useState('') ;
    const [loading , setLoading] = useState(false) ;
    const auth = FIREBASE_AUTH;
    
    const signUp = async (data : any) => {
        setLoading(true) ;
        console.log('Register Data:', data);
        try {
            const res = await createUserWithEmailAndPassword(auth ,email, password);
            console.log(res); 
            FIREBASE_AUTH.signOut()
            navigation.goBack()
            alert('Register Success')
            
        }catch (error: any) {
            console.log(error);
            alert('Register Failed: ' + error.message);
        }finally {
            setLoading(false);
        }

      
    }
  return (
    <View  style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.logo}>สมัครสมาชิก</Text>
        <Text style={{fontSize:12 , textAlign:'center' , marginBottom : 30  , color : '#dark'}}> เพื่อเข้าใช้งาน YukYa แอปพลิเคชัน</Text>
        
        
        <View style={styles.containerLogin}>
            <Text style={styles.label}>Email ของบัญชีผู้ใช้</Text>
            <TextInput value={email} style={styles.input} placeholder='กรอก Email ของผู้ใช้' 
            autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
             <Text style={styles.label}>รหัสผ่านผู้ใช้งาน</Text>
            <Controller
                control={control}
                name="password"
                rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'รหัสผ่านต้องมีมากกว่า 6 ตัว' },
                pattern: {
                    value: /^(?=.*[A-Z]).+$/, // อย่างน้อย 1 ตัวพิมพ์ใหญ่
                    message: 'รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    placeholder="กรอกรหัสผ่านบัญชีผู้ใช้"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize='none'
                />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            <Text style={styles.label}>กรอกรหัสผ่านบัญชีผู้ใช้อีกครั้ง</Text>
            
            <Controller
                control={control}
                name="รหัสผ่านบัญชีผู้ใช้"
                rules={{
                required: 'Please confirm your password',
                validate: value =>
                    value === password || 'รหัสผ่านไม่ตรงกัน', // ตรวจสอบความตรงกันของ password
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    placeholder="ยืนยันรหัสผ่านบัญชีผู้ใช้"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize='none'
                />
                )}
            />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
            
            {loading ? <ActivityIndicator size='large' color="#000ff" />: <>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit(signUp)}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.goBack()}>
                    <Text>
                        <Text >มีบัญชีผู้ใชอยู่แล้ว ? </Text>
                        <Text style={styles.btnTextRegister}>เข้าสู่ระบบ</Text>
                        </Text>
                </TouchableOpacity>
            </>
            }
                        {/* <TextInput value={password} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true}></TextInput> */}
            {/* <TextInput value={confirmPassword} style={styles.input} placeholder='Confirm Password' autoCapitalize='none' onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true}></TextInput>  */}
        </View>
        </KeyboardAvoidingView>
        <Text style={styles.version}>Version 1.1</Text>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
    container : {
        
        flex : 1,
        justifyContent: 'center',
        backgroundColor : '#cbf2f5',
        position : 'relative'
    },
    containerLogin : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    label: {
        alignSelf: "flex-start", // จัดตำแหน่งให้ชิดซ้าย
        marginLeft: "13%", // เพิ่มระยะห่างจากขอบซ้าย
        fontSize: 12,
        fontFamily: "Inter_400Regular",
        marginBottom: 5, // ระยะห่างระหว่างข้อความกับ TextInput
        marginTop:5,
        color: "#333",
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
        fontSize : 36,
        textAlign: 'center',
        fontWeight : 800 ,
        color : '#dark',
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
    },
    error: {
        color: 'red',
        marginBottom: 10,
      }
    
})
