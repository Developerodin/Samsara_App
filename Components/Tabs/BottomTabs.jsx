import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";

const { width, height } = Dimensions.get("window");
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ToastAndroid, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export const BottomTabs = ({ActiveTab}) => {
    const navigation = useNavigation();

    const handelHomeClick = () =>{
        navigation.navigate("Home")
    }

    const handelGroupClassesClick = () =>{
        navigation.navigate("GroupClasses")
    }

    const handelPersonalClassesClick = () =>{
        navigation.navigate("PersonalClasses")
    }
  return (
   
    <Block center style={styles.tab}>
          <Block style={[styles.Center,{width:"100%",height:"100%"}]}>
                  

                  <Block>
                    {
                        ActiveTab === "home" ? <Block style={{borderWidth:1,borderRadius:15,backgroundColor:"#FFEFE4",borderColor: '#FFEFE4',}}>
            
                        <Block style={{padding:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <AntDesign name="home" size={21} color="#EA6C13" />
            
                      <Text style={{marginLeft:10,color:"#EA6C13",fontWeight:500,fontSize:15}}>Home</Text>
                        </Block>
                             
            
                     
                        </Block>
                        :
                      
                         <TouchableOpacity activeOpacity={0.4} onPress={handelHomeClick}>
           <AntDesign name="home" size={28} color="#787878" />
          </TouchableOpacity> 
                    }
                       
 

 
                  </Block>
           
          

                  <Block>
                    {
                        ActiveTab === "groupClasses" ? 
                        <Block style={{borderWidth:1,borderRadius:15,backgroundColor:"#FFEFE4",borderColor: '#FFEFE4',}}>
            
            <Block style={{padding:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <AntDesign name="book" size={21} color="#EA6C13" />

          <Text style={{marginLeft:10,color:"#EA6C13",fontWeight:500,fontSize:15}}>Group Classes</Text>
            </Block>
                 

         
            </Block> 
            :
<TouchableOpacity activeOpacity={0.4} onPress={handelGroupClassesClick}>
          <AntDesign name="book" size={28} color="#787878" />
          </TouchableOpacity>
                    }
                       
 

 
                  </Block>

                  <Block>
                    {
                        ActiveTab === "PersonalClasses" ?
                        <Block style={{borderWidth:1,borderRadius:15,backgroundColor:"#FFEFE4",borderColor: '#FFEFE4',}}>
            
            <Block style={{padding:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          
            <MaterialCommunityIcons name="google-classroom" size={21} color="#EA6C13" />

          <Text style={{marginLeft:10,color:"#EA6C13",fontWeight:500,fontSize:15}}>1:1 Session</Text>
            </Block>
                 

         
            </Block> 
            :
            <TouchableOpacity activeOpacity={0.4} onPress={handelPersonalClassesClick}>
            <MaterialCommunityIcons name="google-classroom" size={28} color="#787878" />
             </TouchableOpacity>

                    }
                      
 

  
                  </Block>
          </Block>
         

    </Block>

  )
}


const styles = StyleSheet.create({
    wrapper: {},
    tab:{
      width:width*0.9,
      height:78,
      borderWidth:1,
      position:"absolute",
      bottom:20,
      backgroundColor:"#FFFFFF",
      borderRadius:26,
      borderColor: '#D9E2F2',
      elevation:1
    },
    Center: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
    },
  
  });