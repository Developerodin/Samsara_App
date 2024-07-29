import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View,Alert,Modal  } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
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
import {  ZoomWebView } from './Pages/WebViewPage/WebView';
import { ZoomPage } from './Pages/ZoomSdkPage/ZoomPage';
import { AppProvider } from './Context/AppContext';
import { PersonalInfo2 } from './Pages/SignUp/Registration/PersonalInfo2';
import { GroupClasses } from './Pages/Class/GroupClasses';
import { PersonalClasses } from './Pages/Class/PersonalClasses';
import { BookSession } from './Pages/Class/BookSession';
import { SessionStatus } from './Pages/Class/SessionStatus';
import { MySessions } from './Pages/MyClasses/MySessions';
import { EditProfile } from './Pages/Profile/EditProfile';
import { EventWebView } from './Pages/WebViewPage/EventWebView';
import { MyEvents } from './Pages/MyClasses/MyEvents';
import { MemberShipWebView } from './Pages/WebViewPage/MemberShipWebView';
import { Membership } from './Pages/MemberShip/MemberShip';
import * as NavigationBar from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './PushNotificationHelper';
import { Platform } from 'react-native';
import axios from 'axios';
import usePushNotifications from './usePushNotifications';
import * as Linking from 'expo-linking';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
  return (
 
<Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor :'grey',
      tabBarLabelStyle:{color:"black"},
      tabBarStyle: {borderWidth:1, backgroundColor: '#F1F1F1',color:"#fff",position:'absolute',bottom:0,paddingTop:2,paddingBottom:3},
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (

          
            <Ionicons name="home" color={color} size={size}  />
          ),
          headerShown: false,
        }}
       
     
      />

    </Tab.Navigator>

 
    
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    Manrope_400Regular
  });

  const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix, 'samsara://'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'profile/:id',
    },
  },
};

  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  
  const [Auth, setAuth]=useState(null);
  const [isAppFirstLaunched, setIsAppFirstLaunched] =useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  // const [notification, setNotification] = useState(undefined);
  const [userData, setUserData] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const sendPushNotification = async (expoPushToken) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Demo Notification',
      body: 'This is a test notification',
      data: { someData: 'goes here' },
    };

    try {
      const response = await axios.post('https://exp.host/--/api/v2/push/send', message, {
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
      });
      console.log('Notification sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const userDetailsFromStorage = async () => {
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      const ParseData = JSON.parse(Details);

      // console.log("Parse Data ===>", ParseData.data.user);
      const data = ParseData.data.user;
      setUserData(data);
    };

    userDetailsFromStorage();
  }, []);


  // useEffect(() => {
  //   if(userData){
  //     registerForPushNotificationsAsync(userData._id).then(token => {
  //       token && setExpoPushToken(token)
  //       console.log("Token push token =====================>====>",token)
  //       if (token) {
          
  //         sendPushNotification(token);
  //       } else {
  //         console.log("Failed to get push token");
  //       }
  //     });
  
  //     if (Platform.OS === 'android') {
  //       Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
  //     }
  //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //       setNotification(notification);
  //     });
  
  //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //       console.log(response);
  //     });
  
  //     return () => {
  //       notificationListener.current &&
  //         Notifications.removeNotificationSubscription(notificationListener.current);
  //       responseListener.current &&
  //         Notifications.removeNotificationSubscription(responseListener.current);
  //     };
  //   }
  //   else{
  //     console.log("User Data not found for push notifi")
  //   }
    
  // }, [userData]);


  

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

   useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#fff'); // Change this to your desired color
  }, []);


   
   if (!appIsReady) {
    return <WelcomeScreen/>
  }
 
  return (
    <AppProvider>
<NavigationContainer linking={linking} onLayout={onLayoutRootView} >


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
         <Stack.Screen name="GroupClasses" component={GroupClasses}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen name="PersonalClasses" component={PersonalClasses}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="ZoomPage" component={ZoomPage}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="ZoomWebView" component={ZoomWebView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Event" component={EventWebView}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="Membership" component={MemberShipWebView}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="Plans" component={Membership}
          options={{
            headerShown: true,
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

<Stack.Screen name="PersonalInfo" component={PersonalInfo2} options={{
            headerShown: false,
          }}/>


<Stack.Screen name="Signup Status" component={VerifyProfileStatus} options={{
            headerShown: false,
          }}/>

<Stack.Screen name="ClassDescription" component={ClassDescription} options={{
            headerShown: false,
          }}/>

<Stack.Screen name="About Instructor" component={Teacher} options={{
            headerShown: true,
          }}/>
          <Stack.Screen name="Book Session" component={BookSession} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="Session Status" component={SessionStatus} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="Chat" component={Chat} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="My Classes" component={MyClass} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="My Sessions" component={MySessions} options={{
            headerShown: true,
          }}/>
          <Stack.Screen name="My Events" component={MyEvents} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="My Account" component={Profile} options={{
            headerShown: true,
          }}/>
          <Stack.Screen name="Edit Profile" component={EditProfile} options={{
            headerShown: true,
          }}/>
          <Stack.Screen name="Contact Us" component={ContactUs} options={{
            headerShown: true,
          }}/>
      
      </Stack.Navigator>
      {/* } */}
    

    </NavigationContainer>
    </AppProvider>
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
