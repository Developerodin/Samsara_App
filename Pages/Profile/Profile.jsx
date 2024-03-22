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

export const Profile = () => {

  const [userData,setUserData] = useState(null)


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

      console.log("Parse Data ===>",ParseData.data.user)
      const data = ParseData.data.user
      setUserData(data)

    }
    
    userDetailsFromStorage()
  },[])
  return (
    <View style={styles.container}>
        <ScrollView>

         <Block style={{height:height*0.22,backgroundColor:"#9290C3",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
              <Block>
              <AntDesign name="camera" size={26} color="white" />
              </Block>
              <Block style={{marginTop:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#fff",marginRight:5,fontSize:18,fontWeight:600}}>{userData && userData.name}</Text>
                <Feather name="edit-2" size={13} color="white" />
              </Block>

              <Block style={{marginTop:10}}>
                <Text style={{color:"#F1F1F1",fontSize:14}}>{userData && userData.email}</Text>
              </Block>
         </Block>

         <TouchableOpacity
    activeOpacity={0.8}
            style={{
              backgroundColor: "#fff",
              borderColor: "#E4E4E4",
              borderRadius: 5,
              padding: 15,
             
            }}
          >
           <Block style={[styles.Space_Between]}>

            <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}} >
                <Block>
                <Feather name="refresh-ccw" size={24} color="grey" />
                </Block>

                <Block style={{marginLeft:15}}>
                  <Block>
                    <Text style={{color:"grey",fontSize:12}}>Membership plan</Text>
                  </Block>
                  <Block style={{marginTop:5}}>
                    <Text style={{color:"crimson",fontSize:14}}>Your free trial expired</Text>
                  </Block>
                  <Block style={{marginTop:25}}>
                    <Text style={{color:"#0C359E",fontSize:14}}>See Membership Options</Text>
                  </Block>
                </Block>
            </Block>

            <Block >
            <FontAwesome5 name="caret-right" size={24} color="grey" />
            </Block>

           </Block>
          </TouchableOpacity>

          <Block style={{padding:15,marginBottom:-15}}>
            <Text style={{color:"grey",letterSpacing:1}}>PERSONAL DETAILS</Text>
          </Block>
         <Block style={{marginBottom:15}}>
         {
            CardData.map((el,index)=>{
              return  <Block  key={index} style={{marginTop:15}}>
                 <ProfileDetailCard key={index} data={el}/>
              </Block>
              
            })
          }
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