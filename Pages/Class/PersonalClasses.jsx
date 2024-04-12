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
import { Header } from "../../Components/Header/Header";
import HamburgerMenu from "../../Components/HamburgerMenu/HamburgerMenu ";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";


import axios from "axios"
import { ToastAndroid, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { BottomTabs } from "../../Components/Tabs/BottomTabs";
import GroupClassCard from "../../Components/Cards/GroupClassCard";
import { OneOnOneClassCard } from "../../Components/Cards/OneOnOneClassCard";


export const PersonalClasses = () => {
  const navigation = useNavigation()

  const handelTeacherClick = () => {
    navigation.navigate("About Instructor");
  };
  return (
    <View style={styles.container}>
    <Header />
    <Block style={{padding:10}}>
           <Text style={{fontSize:21}}>Book 1:1 Sessions with</Text>
           <Text style={{fontSize:21,marginTop:3}}>our Expert Trainers</Text>
          </Block>
    <ScrollView>
   
      <Block style={{ backgroundColor: "#eef3f7",padding:10 }}>
          
        

       <Block style={{marginBottom:100}}>
       <OneOnOneClassCard
                
                      onTeacherClick={handelTeacherClick}
                     
                    />

<OneOnOneClassCard
                
                onTeacherClick={handelTeacherClick}
               
              />

<OneOnOneClassCard
                
                onTeacherClick={handelTeacherClick}
               
              />

<OneOnOneClassCard
                
                onTeacherClick={handelTeacherClick}
               
              />

       
       </Block>

       
     

       
      </Block>

     
    

     
     
    </ScrollView>
    <BottomTabs ActiveTab={"PersonalClasses"}/>
  </View>
  )
}


const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
   
    borderWidth: 1,
  },
  lottie: {
    width: 350,
    height: 250,
    marginBottom: -45,
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
  row: {
    flexDirection: "row",
    marginTop: 10, // This will create a row of items
  },
  column: {
    flex: 1, // Each column should take up equal space
    alignItems: "center", // Center items horizontally
    justifyContent: "space-between",
    // Center items vertically
  },
  gridItem: {
    width: 170,
    height: 75,
    backgroundColor: "#fff",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ea5932",
    borderRadius: 10,
  },
  itemText: {
    color: "#ea5932",
    fontSize: 17,
  },
});