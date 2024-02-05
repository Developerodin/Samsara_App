import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View,Alert,Modal  } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer,useFocusEffect,useNavigation  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Home } from './Pages/Home/Home';
import {AppSlides} from './Pages/OnBoarding/AppSlides/AppSlides';
import { Login } from './Pages/Login/Login';
import { SignUp } from './Pages/SignUp/Signup';
import { WelcomeScreen } from './Pages/OnBoarding/SplashScreen/WelcomeScreen';
import { PersonalDetails } from './Pages/SignUp/Registration/PersonalDetails';
import { VerifyProfileStatus } from './Pages/SignUp/Registration/VerifyProfileStatus';
import { ClassDescription } from './Pages/Class/ClassDescription';
import { Teacher } from './Pages/Class/Teacher';
import { PlayfairDisplay_600SemiBold } from "@expo-google-fonts/playfair-display";
import { Manrope_400Regular } from "@expo-google-fonts/manrope";
import { useFonts } from "expo-font"
import "./App.css"
import { Chat } from './Pages/Chat/Chat';
import { MyClass } from './Pages/MyClasses/MyClass';
import { Profile } from './Pages/Profile/Profile';
import { ContactUs } from './Pages/Contactus/ContactUs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const Tabs = ({navigation}) => {
//   return (
 
// <Tab.Navigator
//     screenOptions={{
//       tabBarActiveTintColor: 'black',
//       tabBarInactiveTintColor :'grey',
//       tabBarLabelStyle:{color:"black"},
//       tabBarStyle: { backgroundColor: '#F1F1F1',color:"#fff",position:'absolute',bottom:0,paddingTop:2,paddingBottom:3},
//     }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color, size }) => (

          
//             <Ionicons name="home" color={color} size={size}  />
//           ),
//           headerShown: false,
//         }}
       
     
//       />
      
      


      







    
     
      
//     </Tab.Navigator>

 
    
//   );
// };

export default function App() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    Manrope_400Regular
  });
  
  
  const [Auth, setAuth]=useState(null);
  const [isAppFirstLaunched, setIsAppFirstLaunched] =useState(null);
  const [appIsReady, setAppIsReady] = useState(false);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
 
 

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        if (!fontsLoaded) {
          // Fonts are still loading, return a loading indicator or null
          return null;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync()
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    console.log("In use Effet -====>")
  }, [appIsReady]);

  useEffect(()=>{
    const checkAuthAndFirstLaunch = async () => {
       try {
         // Check authentication status
         const authStatus = await AsyncStorage.getItem('Auth') || null;
         setAuth(authStatus === 'true');
 
         // Check if app is launched for the first time
         const appData = await AsyncStorage.getItem('isAppFirstLaunched') || null;
         if (appData === null) {
           setIsAppFirstLaunched(true);
           await AsyncStorage.setItem('isAppFirstLaunched', 'false');
         } else {
           setIsAppFirstLaunched(false);
         }
       } catch (err) {
         console.log('Error while checking Auth and First Launch:', err);
       }
     };
 
     checkAuthAndFirstLaunch();
   },[])
   
   if (!appIsReady) {
    return <WelcomeScreen/>
  }
 
  return (
    // <AppProvider>
<NavigationContainer onLayout={onLayoutRootView} >
      {/* {
       isAppFirstLaunched !== null && Auth !== null && */}
         <Stack.Navigator initialRouteName={ Auth ? 'Home' : 'Login'}>
         {/* <Stack.Navigator initialRouteName={'AppSlides'}> */}
        {/* <Stack.Screen name="Home" component={Home}
        options={{
          headerShown: false,
        }}
        /> */}
           
{/* 
         <Stack.Screen name="StartScreen" component={StartScreen}
          options={{
            headerShown: false,
          }}
        /> */}
 <Stack.Screen name="Home" component={Home}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="AppSlides" component={AppSlides}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        /> */}
       
        <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="SignUp" component={PersonalDetails} options={{
            headerShown: false,
          }}/>

<Stack.Screen name="Signup Status" component={VerifyProfileStatus} options={{
            headerShown: false,
          }}/>

<Stack.Screen name="ClassDescription" component={ClassDescription} options={{
            headerShown: false,
          }}/>

<Stack.Screen name="Teacher" component={Teacher} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="Chat" component={Chat} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="My Classes" component={MyClass} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="My Account" component={Profile} options={{
            headerShown: true,
          }}/>
          <Stack.Screen name="Contact Us" component={ContactUs} options={{
            headerShown: true,
          }}/>
      
      </Stack.Navigator>
      {/* } */}
     
    </NavigationContainer>
  //  </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
