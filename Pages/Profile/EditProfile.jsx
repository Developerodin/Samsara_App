import React, { useEffect, useState } from "react";
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
import { FontAwesome5 } from '@expo/vector-icons';
import { ProfileDetailCard } from "../../Components/Cards/ProfileDetailCard";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const EditProfile = () => {
    
  const [userData,setUserData] = useState(null)
  const [healthIssues,setHealthIssues] = useState([])

  const CardData =[
    {"icon": <MaterialCommunityIcons name="yoga" size={26} color="grey" />,"title":"Date of Birth & Gender","sub1":userData && userData.dob,"sub2":`Gender : ${userData && userData.gender}`,"route":"/details"},
    {"icon": <FontAwesome6 name="hand-holding-medical" size={23} color="grey" />,"title":"Medical history","sub1":"Asthama","sub2":"","route":"/details"},
    {"icon": <MaterialIcons name="sports-gymnastics" size={24} color="grey" />,"title":"My experience with yoga","sub1":"INTERMEDIATE","sub2":"","route":"/details"},
    {"icon": <FontAwesome5 name="calendar-alt" size={24} color="grey" />,"title":"Preferred practice time","sub1":"Afternonn (12pm - 5pm)","sub2":"","route":"/details"}
  ]

  useEffect(()=>{
    const userDetailsFromStorage = async()=>{
      const Details = await AsyncStorage.getItem('userDetails') || null;
      const ParseData = JSON.parse(Details);

      console.log("Parse Data users    ===>",ParseData.data.user)
      const data = ParseData.data.user
      setUserData(data)
      const healthIssuesArray = data && data.health_issues && data.health_issues[0].split(',');

      console.log("Health issuess ==>", healthIssuesArray)
      setHealthIssues(healthIssuesArray)

    }
    
    userDetailsFromStorage()
  },[])
  return (
    <View style={styles.container}>
    <ScrollView>
      
      <Block style={{padding:20}}>
          
      </Block>



     
     
      
   
   
    </ScrollView>
</View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f1f1f1",
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