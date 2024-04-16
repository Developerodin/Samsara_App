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
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import YoutubePlayer from "../../Components/VideoPlayer/YoutubePlayer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import CustomButton from "../../Components/Buttons/CustomButton";
import { MemberShipModel } from "../../Components/Model/MemberShipModel";
import { FontAwesome6 } from '@expo/vector-icons';
export const SessionStatus = () => {
    const navigation = useNavigation();

    const handelHomeClick=()=>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
    }

  return (
    <View style={styles.container}>
    <ScrollView>
       
       <Block center style={{height:height,flexDirection:"column",justifyContent:"center",alignItems:"cemter"}}>

        <Block center>
             <Text style={{color:"#586B90",fontSize:24}}>1:1 Session Scheduled</Text>
             <Text style={{color:"#586B90",fontSize:24}}>Successfully</Text>
             <Text style={{color:"#8A94A7",fontSize:16}}>Kindly check the My Sessions Section of </Text>
             <Text style={{color:"#8A94A7",fontSize:16}}> our app to Join 1:1 Session</Text>
        </Block>

        <Block center style={{marginTop:20}}>
        <View style={styles2.card}>
   
   <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10}}>
    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>

    <Image style={{width:60,height:60,borderRadius:10}} source={require('../../assets/Samsra-app.jpg')} />


    <Block style={{marginLeft:10}}>
    <Text  style={{fontSize:12,color:"grey",letterSpacing:1}}>Instructor</Text>
    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:3}}>
  



<Block style={{marginLeft:4}}>
<Text  style={[styles2.title]}>Pradeep Singh </Text>
</Block>
    </Block>
  
    </Block>
    </Block>

   
      
    <Block>
    <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#DEFFE9",width:80,padding:5,borderRadius:15}}>
<AntDesign name="star" size={11} color="#1CBC52" />
     <Text style={{marginLeft:3,color:"#1CBC52",fontSize:18}}>4.3</Text>
</Block>
    </Block>
   </Block>
   

   
    
    <Block style={{padding:20}}>
    
    <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:-16}}>
    </Block>

    <Block style={{flexDirection:"column",marginTop:10}}>
    <Text style={{fontSize:24}}>Fri , 26 Jan 2024</Text>
   
    <Text style={{fontSize:14,color:"#4F4F4F",letterSpacing:1,marginTop:3}}>4:30 PM - 5:30 PM ( IST )</Text>
    </Block>

  

  
    </Block>
    
    
  </View>
        </Block>


        <Block style={{marginTop:30}}>
        <Block  style={{padding:20,height:100,maraginBottom:20,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity  onPress={handelHomeClick}  style={{marginBottom:20,height:65, width:"60%",borderRadius: 20,backgroundColor: '#EA6C13',justifyContent: 'center',alignItems: 'center',}} >
      <Text style={{fontSize:16,color:"white"}}>Home</Text>
    </TouchableOpacity>
        </Block>
        </Block>

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

  const styles2 = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      borderRadius: 25,
      elevation: 2, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      padding:5,
      width:width*0.9,
      borderWidth:1,
      borderColor: '#D9E2F2'
    
    },
    title: {
      fontSize: 17
    },
    description: {
      fontSize: 16,
    },
  });