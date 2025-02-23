import {  } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header_page } from '@/components/Header_page';
import { View, Text, Image, StyleSheet, Platform , TouchableOpacity ,Alert } from "react-native";
import { useRouter } from 'expo-router';
import Pen from 'assets/pen.svg';
import Arrow from 'assets/arrow-right.svg';
import Family from 'assets/Family.svg';
import Help from 'assets/Help.svg';
import Logout from 'assets/Logout.svg';
import Privacy from 'assets/Privacy.svg';
import Profile from 'assets/Profile.svg';
import Settings from 'assets/Settings.svg';
import { NavigationProp } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

export default function HomeScreen({ navigation }: RouterProps) {
  const showAlert = () => {
    Alert.alert(
      "Logout", 
      "คุณต้องการออกจากระบบใข่หรือไม่",
      [
        { text: "ไม่ใช่", style: "cancel" },
        // { text: "ใช่", onPress: () => Alert.alert("Logout", "ออกจากระบบเรียบร้อย") }
        { text: "ใช่", onPress: async () => 
        {
          try {
            await signOut(auth);
            Alert.alert("Logout", "ออกจากระบบเรียบร้อย");
            navigation.navigate('Login');
          } catch (error) {
            console.error("เกิดข้อผิดพลาดขณะออกจากระบบ: ", error);
          }
        }
        }
      ]
    );
  };
  

  const alertMaintenance = () => {
      Alert.alert("ข้อผิดพลาด", "ปิดปรับปรุง");
  }

  const router = useRouter();

  const auth = getAuth();
  return (
    <View style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' }} >
      <View style={styles.TopContainer}>
        <Header_page name='My Profile'></Header_page>
        <View style={styles.blankContainer}></View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri : "https://www.matichon.co.th/wp-content/uploads/2024/08/dfdfdf9-wed.jpg"}}></Image>
          <View  style={styles.edit} >
            <Pen width={20} height={20} color="#FFFFFF"></Pen>
          </View>
        </View>
        <View style={styles.userDataContainer}>
          <Text id='UserName' style={{textAlign:'center' , fontSize: 24 , fontWeight : 700 , marginBottom : 10 , color: '#FFF'}}>Gong Yoo</Text>
          <Text id='UserId' style={{textAlign:'center' , fontSize: 16 , fontWeight : 700 ,color: '#FFF'}}>UID: 000000000</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>

        <TouchableOpacity onPress={alertMaintenance} >
          <View id='profile' style={styles.boxContent}>
            <View id='left' style={styles.left}>
              <View style={styles.icon_box}>
                <Profile width={25} height={25} color="#FFFFFF"></Profile>
              </View>
            </View>
            <View id='middle' style={styles.middle}>
              <ThemedText  type='defaultSemiBold'>Profile</ThemedText>
            </View>
            <View id='right' style={styles.right}>
                <Arrow width={20} height={20} color="#FFFFFF"></Arrow>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('family')} >
        <View id='profile' style={styles.boxContent}>
          <View id='left' style={styles.left}>
            <View style={styles.icon_box}>
              <Family width={25} height={25} color="#FFFFFF"></Family>
            </View>
          </View>
          <View id='middle' style={styles.middle}>
            <ThemedText  type='defaultSemiBold'>Family</ThemedText>
          </View>
          <View id='right' style={styles.right}>
              <Arrow width={20} height={20} color="#FFFFFF"></Arrow>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={alertMaintenance} >
        <View id='profile' style={styles.boxContent}>
          <View id='left' style={styles.left}>
            <View style={styles.icon_box}>
              <Privacy width={25} height={25} color="#FFFFFF"></Privacy>
            </View>
          </View>
          <View id='middle' style={styles.middle}>
            <ThemedText  type='defaultSemiBold'>Privacy Policy</ThemedText>
          </View>
          <View id='right' style={styles.right}>
              <Arrow width={20} height={20} color="#FFFFFF"></Arrow>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={alertMaintenance} >
        <View id='profile' style={styles.boxContent}>
          <View id='left' style={styles.left}>
            <View style={styles.icon_box}>
              <Settings width={25} height={25} color="#FFFFFF"></Settings>
            </View>
          </View>
          <View id='middle' style={styles.middle}>
            <ThemedText  type='defaultSemiBold'>Settings</ThemedText>
          </View>
          <View id='right' style={styles.right}>
              <Arrow width={20} height={20} color="#FFFFFF"></Arrow>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={alertMaintenance} >
        <View id='profile' style={styles.boxContent}>
          <View id='left' style={styles.left}>
            <View style={styles.icon_box}>
              <Help width={25} height={25} color="#FFFFFF"></Help>
            </View>
          </View>
          <View id='middle' style={styles.middle}>
            <ThemedText  type='defaultSemiBold'>Help</ThemedText>
          </View>
          <View id='right' style={styles.right}>
              <Arrow width={20} height={20} color="#FFFFFF"></Arrow>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={showAlert} >
          <View id='logout' style={styles.boxContent}>
            <View id='left' style={styles.left}>
              <View style={styles.icon_box}>
                <Logout width={25} height={25} color="#FFFFFF"></Logout>
              </View>
            </View>
            <View id='middle' style={styles.middle}>
              <ThemedText  type='defaultSemiBold'>Logout</ThemedText>
            </View>
            <View id='right' style={styles.right}>
                
            </View>

          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    width: '100%',
    height: "36%",
    backgroundColor: '#55C3CC',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  blankContainer : {
    width: "100%",
    height : 130
  },
  imageContainer : {
    width: 106 ,
    height: 106 ,
    borderRadius : 100 , 
    display : "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  image : {
    width: "100%",
    height: "100%",
    borderRadius : 100
  },
  edit : {
    width: 28,
    height: 28,
    backgroundColor : "#00524D",
    position: "absolute",
    right: 0,
    bottom: 0,
    borderRadius : 100 , 
    display : "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  userDataContainer : {
    position: "absolute",
    bottom: 20,
  },
  bottomContainer: {
    width: '80%',
    height: '64%',
    marginTop: 20,
  },
  boxContent : {
    flexDirection: 'row',
    marginBottom: 20,
  },
  left : {
    width: '15%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  middle : {
    width: '70%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 15
  },
  right : {
    width: '15%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon_box : {
    display: 'flex' ,
    justifyContent: 'center' ,
    alignItems: 'center' ,
    height: 40 , width: 40 ,
    backgroundColor: '#8FDAE0' ,
    borderRadius: 100
  },
  customText : {
    fontSize: 20,
    fontWeight:600,
  }
  

});
