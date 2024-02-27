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

export const Teacher = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <Block>
        

          <Block
            style={{
              backgroundColor: "#fff",
              borderColor: "#E4E4E4",
              borderRadius: 5,
              padding: 15,
              marginTop: 10,
            }}
          >

            <Block
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
               
                padding:0,
                marginBottom:20,
                
              }}
            >
              <Block>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={require("../../assets/Samsra-app.jpg")}
                />
                
                <Block style={{marginTop:20}}>
                <Text style={{fontWeight:600,fontSize:20,letterSpacing:1}}>Mansi Dwivedi</Text>
                <Text style={{fontWeight:600,fontSize:13,color:"grey",marginTop:2}}>Available for a session today</Text>
                </Block>

                <Block style={{marginTop:10}} >
           <Button  style={{backgroundColor:"#FC6736",height:50,margin:0}}>
             <Text style={{letterSpacing:1,color:"#fff",fontWeight:600,fontSize:17}}>Book Session</Text>
             
             </Button>
          </Block>
                
              </Block>

              <Block>
              <Block
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green",
                    width: 50,
                    padding: 5,
                    borderRadius: 7,
                  }}
                >
                  <AntDesign name="star" size={16} color="#fff" />
                  <Text style={{ marginLeft: 3, color: "#fff" }}>4.9</Text>
                </Block>
                <Text style={{ fontSize: 12, color: "grey", letterSpacing: 1, marginTop:10 }}>
                  from 97 Reviews{" "}
                </Text>

               
              </Block>

              <Block></Block>
            </Block>



          <Block style={{height:150,borderWidth:1}}>
                 
            </Block>

          


          </Block>
        </Block>
        
        <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>

              <Block>
                <Text style={{ color: "black", fontWeight: 600, fontSize: 14 }}>
                 I help my students:
                </Text>
              </Block>


              <Block style={{ marginTop: 5 }}>
                <Block style={[{marginTop:10,flexDirection:"row",alignItems:"center"}]}>
                     

                <Block style={{marginRight:10}} >
                <AntDesign name="checkcircle" size={24} color="#FC6736" />
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontWeight:600}}>Heal from a medical condition like pain or injury</Text>
                </Block>

                </Block>

                <Block style={[{marginTop:10,flexDirection:"row",alignItems:"center"}]}>
                     

                <Block style={{marginRight:10}} >
                <AntDesign name="checkcircle" size={24} color="#FC6736" />
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontWeight:600}}>Increase strength and flexibility</Text>
                </Block>

                </Block>

                <Block style={[{marginTop:10,flexDirection:"row",alignItems:"center"}]}>
                     

                <Block style={{marginRight:10}} >
                <AntDesign name="checkcircle" size={24} color="#FC6736" />
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontWeight:600}}>Ease stress and boost mental health</Text>
                </Block>

                </Block>
                 
              </Block>

            </Block>
      </ScrollView>
    </View>
  );
};

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
