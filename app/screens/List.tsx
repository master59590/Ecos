import {StyleSheet ,TouchableOpacity , View, Text } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation : NavigationProp<any, any>;
}

const list = ({navigation} : RouterProps) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.btnLogout}  onPress={() => navigation.navigate('details')}>
                <Text style={styles.btnTextLogout}>Detail.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout}  onPress={() => FIREBASE_AUTH.signOut()}>
                <Text style={styles.btnTextLogout}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default list

const styles = StyleSheet.create({
    container : {
        display : 'flex' ,
        justifyContent : 'center',
        alignItems : 'center'
    },
    btnText : {
        fontSize : 16 ,
        color : '#fff'
    },
    btnLogout : {
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
    btnTextLogout : {
        fontSize : 16 ,
        color : "green"
    }
    
})
