import { View, Text , StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
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
            alert('Sign In failed: ' + error.message);
        }finally {
            setLoading(false);
        }
    }
    const signUp = async () => {
        setLoading(true) ;
        try {
            const res = await createUserWithEmailAndPassword(auth ,email, password);
            console.log(res); 
            alert('Check your email!')
        }catch (error: any) {
            console.log(error);
            alert('Sign In failed: ' + error.message);
        }finally {
            setLoading(false);
        }
    }
  return (
    <View  style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.logo}>ECOS</Text>
        <Text style={{fontSize:20 , textAlign:'center' , marginBottom : 30  , color : '#fff'}}>EcoCycle Solutions</Text>
        <View style={styles.containerLogin}>
            <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={password} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true}></TextInput>
            {loading ? <ActivityIndicator size='large' color="#000ff" />: <>
             <Button title='Login' onPress={signIn}></Button>
             <Button title='Create account' onPress={signUp}></Button>
            </>
            }
        </View>
        </KeyboardAvoidingView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container : {
        
        flex : 1,
        justifyContent: 'center',
        backgroundColor : '#181818'
    },
    containerLogin : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    input : {
        marginVertical : 4 , 
        height: 50 ,
        borderWidth : 1 ,
        borderRadius : 10 ,
        padding : 10 , 
        backgroundColor : '#fff' , 
        width : '80%',
        
    },
    logo : {
        fontSize : 36,
        textAlign: 'center',
        fontWeight : 800 ,
        color : 'green',
        marginBottom : 10 ,
    }
})
