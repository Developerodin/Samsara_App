import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export const ContactUs = () => {
  return (
    <View style={[styles.container]}>
        <Block center style={{marginTop:40}} >
        <Image style={{width:190,height:100,borderTopLeftRadius:10,borderTopRightRadius:10}} source={require('../../assets/contact-us.png')} />
        </Block>

        <Block center style={{marginTop:160}}>
          <Text style={{fontSize:23,letterSpacing:2,fontWeight:600}}>We'd love to hear from you</Text>
          <Text style={{letterSpacing:1}}>Chat / call with us 24/7</Text>
        </Block>
         

         <Block style={{position:"absolute",bottom:100,left:0,right:0}}>
         <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
           <Block style={{flexDirection:"row",marginRight:20}}>
           <Feather name="phone-call" size={20} style={{marginRight:10,color:"#525CEB"}}  />
           <Text style={{color:"#525CEB"}}>Call us</Text>
           </Block>

           <Block style={{flexDirection:"row",marginRight:20}}>
          
           <Entypo name="chat" size={20}   style={{marginRight:10,color:"#525CEB"}} />
           <Text style={{color:"#525CEB"}}>Chat now</Text>
           </Block>

           <Block style={{flexDirection:"row"}}>
           
           <MaterialIcons name="email" size={20} style={{marginRight:10,color:"#525CEB"}} />
           <Text style={{color:"#525CEB"}}>Call us</Text>
           </Block>
        </Block>
         </Block>
       
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.5,
  },
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign: "center",
    padding: 0,
    fontSize: 22,
    // Remove padding to make it look borderless
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 10,

    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0.3,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
    width: "95%",
    height: 55,
    borderRadius: 5,
    backgroundColor: "#40A99E",
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderWidth: 1,
    borderColor: "blue",
  },
  Center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Space_Around: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  Space_Between: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    width: width,
  },
});