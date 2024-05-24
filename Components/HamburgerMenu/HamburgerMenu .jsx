import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions, ScrollView,Share, Image } from 'react-native';
import Modal from "react-native-modal";
const {width, height} = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';
import { Block } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
const HamburgerMenu = ({ isVisible, onClose }) => {
 const navigation = useNavigation()
 const [userData, setUserData] = useState(null);
  const RoutesData =[
    // {Icon:<AntDesign name="user" size={24} color="#586B90" />,Title:"My account" , Route:"My Account"},
    // {Icon:<FontAwesome5 name="chalkboard-teacher" size={24} color="#586B90" />,Title:"My classes" , Route:"My Classes"},
    {Icon:<FontAwesome5 name="chalkboard-teacher" size={24} color="#586B90" />,Title:"My Sessions" , Route:"My Sessions"},
    {Icon:<AntDesign name="playcircleo" size={24} color="#586B90" />,Title:"How It works ?" , Route:""},
    // {Icon:<Ionicons name="chatbox-ellipses-outline" size={24} color="grey" />,Title:"Chat" , Route:"Chat"},
    {Icon:<EvilIcons name="share-google" size={26} color="#586B90" />,Title:"Share App" , Route:"Refer"},
   
    {Icon:<FontAwesome6 name="laptop" size={21} color="#586B90" />,Title:"Web Login" , Route:""},

    
    {Icon:<AntDesign name="questioncircleo" size={24} color="#586B90" />,Title:"FAQ" , Route:""},
    {Icon:<MaterialIcons name="support-agent" size={24} color="#586B90" />,Title:"Contact us" , Route:"Contact Us"},
    // {Icon:<AntDesign name="logout" size={24} color="#586B90" />,Title:"Logout" , Route:"logout"},
  ]


const handelRoute = (route) =>{
  if(route === "Refer"){
    handleShare();
    return;
  }
  if(route === "logout"){
    handelLogout();
    return ;
  }

  if(route !== ""  ){onClose
    onClose()
    navigation.navigate(route);
    
  }
 
}

const handleShare = async () => {
  try {
    const result = await Share.share({
      message: "Hey there ! I've been using this app, and it's been great. I thought you might like it too. If you sign up using my referral code, we both get 50 rupee credits in our wallets. Here's my referral code: [ICX59908]. Give it a try",
    });
    if (result.action === Share.sharedAction) {
      // Share was successful
      console.log('Shared successfully');
    } else if (result.action === Share.dismissedAction) {
      // Share was dismissed/cancelled
      console.log('Share dismissed');
    }
    onClose()
  } catch (error) {
    console.error('Error sharing:', error.message);
  }
};

const handelLogout=async()=>{
  console.log("Log out");
  try {
   await AsyncStorage.removeItem("userDetails");
   await AsyncStorage.setItem("Auth",'false');
   console.log('AsyncStorage cleared successfully');
 } catch (error) {
   console.error('Error clearing AsyncStorage:', error);
 }
 // navigation.navigate("Login")
 navigation.reset({
   index: 0,
   routes: [{ name: 'Login' }],
 });
 }

 const handelProfileClick = ()=>{
  
  navigation.navigate("My Account");
  onClose()
 }

 useEffect(() => {
  const userDetailsFromStorage = async () => {
    const Details = (await AsyncStorage.getItem("userDetails")) || null;
    const ParseData = JSON.parse(Details);

    console.log("Parse Data ===>", ParseData.data.user);
    const data = ParseData.data.user;
    setUserData(data);
  };

  userDetailsFromStorage();
}, []);

  return (
    <View>
      

      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        animationIn="slideInLeft" 
        animationOut="slideOutLeft" 
        swipeDirection="left" 
        backdropOpacity={0.5}
        style={{
          justifyContent: 'flex-start',
          margin: 0,
          
        }}
      >

        <View
          style={{
            flex:1,
            backgroundColor: 'white',
            padding: 10,
            height: 300,
            width:width * 0.7, 
           
            marginTop:2,borderTopRightRadius:10
          }}
        >

          <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:60}}>
                 
                 <TouchableOpacity onPress={handelProfileClick} style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                      <Block>
                      <Image
                    source={require("../../assets/Images/Rectangle 5.png")}
                    
                  />
                      </Block>
                      <Block style={{marginLeft:10}}>
                        <Text style={{color:"#787878",fontSize:13}}>Welcome Back</Text>
                        <Text style={{fontSize:18}}>{userData && userData.name}</Text>
                      </Block>
                 </TouchableOpacity>

                 <Block>
                  <TouchableOpacity activeOpacity={0.4} onPress={onClose}>
                  <AntDesign  name="close" size={24} color="black" />
                  </TouchableOpacity>
                    
                 </Block>
          </Block>

          <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:20}}>
    </Block>
         
         <ScrollView style={{ marginTop: 30}}>
      {RoutesData.map((el, index) => (
        <TouchableOpacity activeOpacity={0.9} key={index} onPress={()=>handelRoute(el.Route)}>
             <View  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, borderColor: 'grey' }}>
          <View style={{ height: 45, width: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',borderRadius:20,padding:5,backgroundColor:"#D2E1FD40" }}>
            {el.Icon}
          </View>
          <Text style={{ fontSize: 17, color: '#586B90', marginLeft: 20 }}>{el.Title}</Text>
        </View>
        </TouchableOpacity>
        
      ))}

           <Block style={{marginLeft:10,marginTop:20}}>
            <Text style={{fontSize:16,color:"#EA6C13"}}>Privacy Policy</Text>
            <Text style={{fontSize:16,color:"#EA6C13",marginTop:5}}>Terms & Conditions</Text>
           </Block>

<TouchableOpacity activeOpacity={0.9} style={{borderRadius:17,backgroundColor:"#FFE9E9",height:60,marginBottom:30,marginTop:30}}  onPress={()=>handelRoute("logout")}>
             <Block center  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 10, borderColor: 'grey' }}>
          <View style={{ height: 45, width: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',borderRadius:20,padding:5 }}>
          <AntDesign name="logout" size={22} color="#FC2C2C" />
          </View>
          <Text style={{ fontSize: 17, color: '#FC2C2C', marginLeft: 20 }}>Logout</Text>
        </Block>
        </TouchableOpacity>
    </ScrollView>
         
        
         
          
         
        </View>
     
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex:1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,// Adjust the width as needed
    backgroundColor: 'black',
    padding: 20,
    minHeight:height
  },
});

export default HamburgerMenu;