import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions, ScrollView,Share } from 'react-native';
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
const HamburgerMenu = ({ isVisible, onClose }) => {
 const navigation = useNavigation()
  const RoutesData =[
    {Icon:<AntDesign name="user" size={24} color="grey" />,Title:"My account" , Route:"My Account"},
    {Icon:<MaterialCommunityIcons name="google-classroom" size={24} color="grey" />,Title:"My classes" , Route:"My Classes"},
    // {Icon:<Ionicons name="chatbox-ellipses-outline" size={24} color="grey" />,Title:"Chat" , Route:"Chat"},
    {Icon:<Octicons name="gift" size={24} color="grey" />,Title:"Refer" , Route:"Refer"},
    {Icon:<Entypo name="line-graph" size={24} color="grey" />,Title:"Step-by-step guid" , Route:""},
    {Icon:<FontAwesome6 name="laptop" size={22} color="grey" />,Title:"Web Login" , Route:""},
    {Icon:<FontAwesome name="dollar" size={24} color="grey" />,Title:"Pricing" , Route:""},
    {Icon:<AntDesign name="playcircleo" size={24} color="grey" />,Title:"How It works" , Route:""},
    {Icon:<AntDesign name="questioncircleo" size={24} color="grey" />,Title:"FAQ" , Route:""},
    {Icon:<MaterialIcons name="support-agent" size={24} color="grey" />,Title:"Contact us" , Route:"Contact Us"},
    {Icon:<AntDesign name="logout" size={24} color="grey" />,Title:"Logout" , Route:"logout"},
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
            padding: 2,
            height: 300,
            width:width * 0.6, 
           
            marginTop:4,borderTopRightRadius:10
          }}
        >
         
         <ScrollView style={{ marginTop: 30}}>
      {RoutesData.map((el, index) => (
        <TouchableOpacity activeOpacity={0.9} key={index} onPress={()=>handelRoute(el.Route)}>
             <View  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 0.2, padding: 10, borderColor: 'grey' }}>
          <View style={{ height: 30, width: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {el.Icon}
          </View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'grey', marginLeft: 20 }}>{el.Title}</Text>
        </View>
        </TouchableOpacity>
        
      ))}
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