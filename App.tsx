import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Mainpage from './app/screens/Mainpage';
import Medicine_index from './app/screens/Medicine_index';
import Antibiotic from './app/screens/Antibiotic';
import Antifungal from './app/screens/Antifungal';
import CoughSyrup from './app/screens/CoughSyrup';
import HealthSupplement from './app/screens/HealthSupplement';
import Painkiller from './app/screens/Painkiller';
import Para from './app/screens/Para';
import Profile from './app/screens/Profile';
import family from './app/screens/family';
import MedicineList from './app/screens/MedicineList';
import MedicineReminder from './app/screens/MedicineReminder';

import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Register from './app/screens/Register';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
            

           
      <InsideStack.Screen name='Mainpage' component={Mainpage} options={{headerShown : false}} /> 
      <InsideStack.Screen name='Medicine_index' component={Medicine_index} options={{headerShown : false}} /> 
      <InsideStack.Screen name='Antibiotic' component={Antibiotic} options={{headerShown : true}} /> 
      <InsideStack.Screen name='Antifungal' component={Antifungal} options={{headerShown : true}} /> 
      <InsideStack.Screen name='CoughSyrup' component={CoughSyrup} options={{headerShown : true}} /> 
      <InsideStack.Screen name='HealthSupplement' component={HealthSupplement} options={{headerShown : true}} /> 
      <InsideStack.Screen name='Painkiller' component={Painkiller} options={{headerShown : true}} /> 
      <InsideStack.Screen name='Para' component={Para} options={{headerShown : true}} /> 
      <InsideStack.Screen name='Profile' component={Profile} options={{headerShown : false}} />
      <InsideStack.Screen name='family' component={family} options={{headerShown : false}} />

    </InsideStack.Navigator>
  );
}
function loginRegister() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='MedicineReminder' component={MedicineReminder} options={{headerShown : false}} /> 
      <InsideStack.Screen name='MedicineList' component={MedicineList} options={{headerShown : false}} /> 
      <InsideStack.Screen name='Login' component={Login} options={{headerShown : false}} /> 
      <InsideStack.Screen name='Register' component={Register} options={{headerShown : false}} /> 
    </InsideStack.Navigator>
  );
}


export default function App() {
  const [user , setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH , (user) => {
      console.log('user' , user);
      setUser(user);
    });
  },[]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='My todo' component={InsideLayout} options={{headerShown : false}} ></Stack.Screen>
        ) :
        (
          <Stack.Screen name='Login' component={loginRegister} options={{headerShown : false}} ></Stack.Screen>
        )
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
