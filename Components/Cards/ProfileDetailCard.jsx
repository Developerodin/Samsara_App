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
import { FontAwesome5 } from '@expo/vector-icons';

export const ProfileDetailCard = ({data}) => {
  return (
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
                {data.icon}
                </Block>

                <Block style={{marginLeft:10}}>
                  <Block>
                    <Text style={{color:"grey",fontSize:12}}>{data.title}</Text>
                  </Block>
                  <Block style={{marginTop:5}}>
                    <Text style={{color:"black",fontSize:14}}>{data.sub1}</Text>
                  </Block>
                  <Block style={{marginTop:5}}>
                    <Text style={{color:"black",fontSize:14}}>{data.sub2}</Text>
                  </Block>
                </Block>
            </Block>

            <Block >
            <FontAwesome5 name="caret-right" size={24} color="grey" />
            </Block>

           </Block>
          </TouchableOpacity>
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