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
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";
import Card from "../../Components/Cards/ClassCard";
import { useNavigation } from "@react-navigation/native";
import { OneOnOneClassCard } from "../../Components/Cards/OneOnOneClassCard";
import { MemberShipModel } from "../../Components/Model/MemberShipModel";
import { WebModel } from "../../Components/Model/WebModel";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { ToastAndroid ,ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Home = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [webmodalVisible, setWebModalVisible] = useState(false);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData,setUserData] = useState(null)
  const cards = [
    { title: "Hatha Yoga", description: "Start Your Day Out Right " },
    { title: "Rise and Shine", description: "Intermediate Power Flow" },
    // Add more cards as needed
  ];

  const handelClassClick = () => {
    navigation.navigate("ClassDescription");
  };

  const handelWebModelOpen = () => {
    setWebModalVisible(true);
  };

  const handelWebModelClose = () => {
    setWebModalVisible(false);
  };

  const handelWebModelComplete = () => {
    console.log("web Complete");
  };

  const handelTeacherClick = () => {
    navigation.navigate("Teacher");
  };
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const swiperHeight = screenHeight * 0.5; // Set swiper height to 40% of screen height

  const swiperItemWidth = screenWidth * 0.8;

  const handelComplete = () => {};

  const handelMembershipModel = () => {
    setModalVisible(true);
  };

  const handelZommClassClick = () => {
    const zoomMeetingUrl =
      "https://us05web.zoom.us/j/88339990603?pwd=sg8wOrCMGY5mhat5RaJdhAhyTIxuuo.1";

    // Open the Zoom meeting URL using Linking
    Linking.canOpenURL(zoomMeetingUrl).then((supported) => {
      if (supported) {
        Linking.openURL(zoomMeetingUrl);
      } else {
        console.error(
          "Cannot open Zoom meeting. Make sure Zoom app is installed."
        );
      }
    });
  };

  const handelWebZommClassClick = (data) => {
    console.log("Data details =====>",data)
      const ZoomMeetingNumber={
    number:data.number,
    pass:data.pass,
    userName:userData && userData.name,
    email:userData && userData.email,
    }
  
    if(data.number){
      navigation.navigate("ZoomWebView", { ZoomMeetingNumber });
      return 
    }
    
    ToastAndroid.show("Class Not Available", ToastAndroid.SHORT);
    
  };

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

  const handelWebZommPageClick = () => {
    navigation.navigate("ZoomPage");
  };

  const getAllClasses = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${Base_url}api/classes`); // Update the API endpoint accordingly
     
      const Data = response.data.data
      setIsLoading(false)
      if(Data){
       
          const formattedData = Data.map((item) => ({
          "Title":item.title,
         "Teacher":item.teacher && item.teacher.name,
         "Date":item.schedule,
         "mn":item.meeting_number,
         "pass":item.password,
 
     }));


     setClasses(formattedData);

   
    
    
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching classes:', error.message);
    }
  };

  useEffect(() => {
    getAllClasses();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <StatusBar  style="dark"/>
      <ScrollView>
      {isLoading &&
        <ActivityIndicator size="large" color="orange" />
      }
        <Block style={{ backgroundColor: "#FFF", padding: 10 }}>

          <Block
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "#DCDCDC",
              padding: 10,
              backgroundColor: "orange",
              paddingBottom: 20,
              borderRadius: 7,
              elevation: 2,
            }}
          >
            <Block>
              <Block>
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  Commit to your goals &
                </Text>
              </Block>
              <Block style={[styles.Space_Between, { marginTop: -10 }]}>
                <Block>
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    sign up for membership{" "}
                  </Text>
                </Block>

                <Block>
                  <Button
                    // onPress={handelWebZommClassClick}
                    color="white"
                    style={{ width: 120 }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: 400 }}>
                      Get
                    </Text>
                  </Button>
                </Block>
              </Block>

              <Block>
                <Text style={{ fontSize: 18, color: "#fff" }}>today !</Text>
              </Block>
            </Block>
          </Block>

          <Block style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: "grey" }}>
              Recommended Teacher & Classes for you
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                fontWeight: 600,
                marginTop: 5,
              }}
            >
              Group Classes
            </Text>
          </Block>

          
          <Block style={{ marginTop: 10 }}>
            <Swiper
              style={{ height: swiperHeight, borderWidth: 1 }}
              showsPagination={false}
              overlayEnabled
              overlayColor={"transparent"} // Set the color of the overlay
              overlayOpacity={0.5}
            >
              {classes && classes.map((card, index) => (
                <View key={index}>
                  <Card
                   mn={card.mn}
                    title={card.Title}
                    description={card.Teacher}
                    ClassClick={handelClassClick}
                    book={handelMembershipModel}
                    join={()=>handelWebZommClassClick({number:card.mn,pass:card.pass})}
                  />
                </View>
              ))}
            </Swiper>
          </Block>

          <Block
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "#DCDCDC",
              padding: 10,
              backgroundColor: "#3333ef",
              paddingBottom: 20,
              borderRadius: 7,
              elevation: 2,
            }}
          >
            <Block>
              <Block>
                <Text style={{ fontSize: 16, color: "#fff" }}>Events</Text>
              </Block>
              <Block style={[styles.Space_Between, { marginTop: -10 }]}>
                <Block>
                  <Text
                    style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}
                  >
                    Power Yoga
                  </Text>
                </Block>

                <Block>
                  <Button
                    // onPress={handelZommClassClick}
                    color="white"
                    style={{ width: 120 }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: 400 }}>
                      Join
                    </Text>
                  </Button>
                </Block>
              </Block>

              <Block>
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  Rise and Shine
                </Text>
              </Block>
            </Block>
          </Block>

          <Block style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: "grey" }}>
              Personal classes
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                fontWeight: 600,
                marginTop: 5,
              }}
            >
              1-on-1 Classes
            </Text>
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Swiper
              style={{ height: swiperHeight, borderWidth: 1 }}
              showsPagination={false}
              overlayEnabled
              overlayColor={"transparent"} // Set the color of the overlay
              overlayOpacity={0.5}
            >
              {cards.map((card, index) => (
                <View key={index}>
                  <OneOnOneClassCard
                    title={card.title}
                    description={card.description}
                    onTeacherClick={handelTeacherClick}
                    book={handelMembershipModel}
                  />
                </View>
              ))}
            </Swiper>
          </Block>

          <Block
            style={{
              marginBottom: 60,
              marginTop: 30,
              borderWidth: 2,
              padding: 20,
              backgroundColor: "#FFFFFF",
              paddingBottom: 60,
              borderRadius: 10,
            }}
          >
            <Block style={styles.Space_Between}>
              <Block style={{ height: 200 }}>
                <Text style={{ fontSize: 30, fontWeight: 500 }}>Yoga</Text>
                <Text style={{ fontSize: 30, fontWeight: 500, color: "grey" }}>
                  begins with
                </Text>
                <Text style={{ fontSize: 30, fontWeight: 500 }}>listening</Text>
                <Block style={{ marginTop: 10 }}>
                  <Button
                    color="orange"
                    style={{ height: 80, borderBottomWidth: 1, marginLeft: -3 }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: 400, color: "#fff" }}
                    >
                      Book
                    </Text>
                    <Text
                      style={{ fontSize: 20, fontWeight: 500, color: "#fff" }}
                    >
                      Class
                    </Text>
                  </Button>
                </Block>
              </Block>

              <Block
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LottieView
                  ref={animationRef}
                  style={styles.lottie}
                  source={require("../../assets/Animations/Animation - 1706011493717.json")}
                  autoPlay={true}
                  loop={true}
                />
              </Block>
            </Block>
          </Block>

        </Block>

{/* ============================================================================ */}
  
{/* <Button onPress={handelWebZommPageClick} color='info' style={{width:120}}>
              <Text style={{fontSize:16,fontWeight:400,color:"#fff"}}>
              Zoom Page  
              </Text>
            
              </Button> */}
        <MemberShipModel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handelComplete={handelComplete}
        />

        <WebModel
          webUrl={
            "https://us05web.zoom.us/j/85135267203?pwd=6lbUCFVHcELptiad0J0aVi5IfSD8Ht.1"
          }
          modalVisible={webmodalVisible}
          setModalVisible={setWebModalVisible}
          handelComplete={handelWebModelComplete}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
  lottie: {
    width: 150,
    height: 150,
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
