import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import UserPage from './app/screens/User';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='Ecos TEST' component={List} /> 
      <InsideStack.Screen name='details' component={Details} /> 
      <InsideStack.Screen name='user' component={UserPage} /> 
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
          <Stack.Screen name='Login' component={Login} options={{headerShown : false}} ></Stack.Screen>
        )
      }
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
