import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput, ToastAndroid } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');
import { TabView, SceneMap } from 'react-native-tab-view';
import CustomButton from '../../Components/Buttons/CustomButton';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation, useRoute } from '@react-navigation/native';


export const MyEvents = () => {
  const navigation= useNavigation();
  const [customSessions,setCustomSessions] = useState([])
  const [userData, setUserData] = useState(null);

  const getAllCustomSessions = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/event-applications/events/user/${id}`); // Update the API endpoint accordingly
      
      const Data = response.data
    
      setCustomSessions(Data);
      console.log("Data of Events ============>-=======>",Data)
      
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const handelWebZommClassClick = (data) => {
    // console.log("Data details =====>",data);
    const ZoomMeetingNumber = {
      number: data.meeting_number,
      pass: data.password,
      userName: userData && userData.name,
      email: userData && userData.email,
    };

    if (data.meeting_number) {
      navigation.navigate("ZoomWebView", { ZoomMeetingNumber });
      return;
    }

    ToastAndroid.show("Class Not Available", ToastAndroid.SHORT);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    
    return `${day}/${month}/${year}`;
  }
  
  function formatTimeTo12Hour(timeString) {
    let [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  useEffect(() => {
    const userDetailsFromStorage = async () => {
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      const ParseData = JSON.parse(Details);

      // console.log("Parse Data ===>", ParseData.data.user);
      const data = ParseData.data.user;
      setUserData(data);
      getAllCustomSessions(data._id)
    };

    userDetailsFromStorage();
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView>
      <Block>
            
         
            <Block center style={{marginTop:20}}>
    
              {
                customSessions && customSessions.map((el,index)=>{
                  return <View key={index} style={[styles2.card,{marginTop:20}]}>
       
                  <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10}}>
                   <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
               
                   <Image style={{width:60,height:60,borderRadius:10}} source={require('../../assets/Samsra-app.jpg')} />
               
               
                   <Block style={{marginLeft:10}}>
                   <Text  style={{fontSize:12,color:"grey",letterSpacing:1}}>Event {el && el.eventId && el.eventId.eventType === "inPerson" ? "In Person" : "Virtual"}</Text>
                   <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:3}}>
                 
               
               
               
               <Block style={{marginLeft:4}}>
               <Text  style={[styles2.title]}>{el && el.eventId && el.eventId.eventName}</Text>
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
                   <Text style={{fontSize:24}}>{el && el.eventId && formatDate(el.eventId.createdAt)}</Text>
                  
                   <Text style={{fontSize:14,color:"#4F4F4F",letterSpacing:1,marginTop:3}}>{el && el.eventId && formatTimeTo12Hour(el.eventId.startTime)} ( IST )</Text>
                   </Block>
               
                   <Block style={{marginTop:30}}>
                       <Block  style={{padding:20,height:100,maraginBottom:20,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                       <TouchableOpacity onPress={()=>handelWebZommClassClick({
                            meeting_number: el.meeting_number,
                            password: el.password,
                          })}    style={{marginBottom:20,height:65, width:"100%",borderRadius: 20,backgroundColor: '#EA6C13',justifyContent: 'center',alignItems: 'center',}} >
                     <Text style={{fontSize:16,color:"white"}}>Join Now</Text>
                   </TouchableOpacity>
                       </Block>
                       </Block>
                    
                 
                   </Block>
                   
                   
                 </View>
                })
              }
            
            </Block>
    
            </Block>
      </ScrollView>
       
        
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#ffffff",

  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
    padding:10,
    backgroundColor:"#f1f1f1"
    
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop:10
    
  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: 'transparent', // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign:"center",
    padding:0,
    fontSize:22
     // Remove padding to make it look borderless
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
   width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
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