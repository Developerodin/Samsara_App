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
import { Base_url } from "../../Config/BaseUrl";


export const GroupClasses = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const handelClassClick = (id) => {
    navigation.navigate("ClassDescription",{ value: id });
  };
  const handelTeacherClick = () => {
    navigation.navigate("About Instructor");
  };

  const handelMembershipModel = () => {
    setModalVisible(true);
  };

  const handelWebZommClassClick = (data) => {
    console.log("Data details =====>", data);
    const ZoomMeetingNumber = {
      number: data.number,
      pass: data.pass,
      userName: userData && userData.name,
      email: userData && userData.email,
    };

    if (data.number) {
      navigation.navigate("ZoomWebView", { ZoomMeetingNumber });
      return;
    }

    ToastAndroid.show("Class Not Available", ToastAndroid.SHORT);
  };

  useEffect(() => {
    const userDetailsFromStorage = async () => {
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      const ParseData = JSON.parse(Details);

      console.log("Parse Data ===>", ParseData.data.user);
      const data = ParseData.data.user;
      setUserData(data);
    };

    userDetailsFromStorage();
  }, []);

  const getAllClasses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Base_url}api/classes`); // Update the API endpoint accordingly

      const Data = response.data.data;
      setIsLoading(false);
      if (Data) {
        const formattedData = Data.map((item) => ({
          _id:item._id,
          Title: item.title,
          Teacher: item.teacher && item.teacher.name,
          Date: item.schedule,
          mn: item.meeting_number,
          pass: item.password,
          time: item.startTime ? `${item.startTime} to ${item.endTime} ` : ""
        }));

        setClasses(formattedData);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching classes:", error.message);
    }
  };

  useEffect(() => {
    getAllClasses();
  }, []);
  return (
    <View style={styles.container}>
    <Header />
    <Block style={{padding:10}}>
           <Text style={{fontSize:21}}>My Upcoming Group</Text>
           <Text style={{fontSize:21,marginTop:3}}>Classes Sessions</Text>
          </Block>
          {isLoading ? <Block center style={{height:height*0.8,flexDirection:"row",justifyContent:"center",alignItems:"center"}}> 

<ActivityIndicator size="large" color="orange" />
</Block> 
:
<ScrollView>
   
<Block style={{ backgroundColor: "#eef3f7",padding:10 }}>
    
  

 <Block style={{marginBottom:100}}>
     
 {classes &&
            classes.map((card, index) => (
              <View key={index}>
                <View >
                  {/* Current card */}
                  <GroupClassCard
                    mn={card.mn}
                    title={card.Title}
                    time={card.time}
                    description={card.Teacher}
                    ClassClick={() => handelClassClick(card._id)}
                    book={handelMembershipModel}
                    join={() =>
                      handelWebZommClassClick({
                        number: card.mn,
                        pass: card.pass,
                      })
                    }
                    // Pass overlay color to the Card component
                  />
                
                </View>
              </View>
            ))}


 </Block>

 


 
</Block>






</ScrollView>
  }
  
    <BottomTabs ActiveTab={"groupClasses"}/>
  </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {},
    container: {
      flex: 1,
    
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