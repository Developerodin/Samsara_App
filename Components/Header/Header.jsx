import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import Logo from "./Logo_1.png"
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu ';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export const Header = () => {
 
  const [isMenuVisible, setMenuVisible] = useState(false);
  // const {toggleDrwerMenu,isDrwerMenuVisible, setDrawerMenuVisible} =useAppContext()
  const CloseMenu= () =>{
    setMenuVisible(false)
  }
  const showMenue = ()=>{
    setMenuVisible(true)
  }
  return (
    <View style={[{marginTop:10,padding:10,borderColor:"#d3d7d9",paddingTop:20},styles.container]}>
        {/* <StatusBar  hidden/> */}
        <Block  style={styles.Space_Between}>
        <TouchableOpacity onPress={showMenue}>
          {/* <Entypo name="menu" size={40} color="grey"  /> */}
          <Image    source={require('../../assets/Images/ri_menu-2-line.png')} />
          </TouchableOpacity>
          <Block style={{alignItems:"center",height:40,width:190}}>
          {/* samsaraLogo.png */}
          <Image  style={{height:"100%",width:"100%"}}  source={require('../../assets/samsaraLogo.png')} />
          </Block>
          <Block>
          {/* <FontAwesome5 name="bell" size={30} color="grey" /> */}
          {/* <MaterialCommunityIcons name="bell" size={30} color="black" /> */}
          {/* <FontAwesome name="bell-o" size={24} color="black" /> */}
          </Block>
        </Block>
       <HamburgerMenu isVisible={isMenuVisible} onClose={CloseMenu}  />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      backgroundColor:"#FFFFFF",
      
  
    },
    textPlayfair: {
      fontFamily: 'PlayfairDisplay_600SemiBold',
      fontSize: 27,
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