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
  RefreshControl
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
import { ToastAndroid, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { BottomTabs } from "../../Components/Tabs/BottomTabs";
import EventCard from "../../Components/Cards/EventCard";
export const Home = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [webmodalVisible, setWebModalVisible] = useState(false);
  const [classes, setClasses] = useState([]);
  const [Events, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [TeacherData, setTeacherData] = useState([]);
  const [update, setupdate] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const handelTeacherClick = (id) => {
    navigation.navigate("About Instructor", { teacherId: id });
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Call your functions here
    fetchTeachers()
    getAllClasses();
    // After fetching data, set refreshing to false
    setRefreshing(false);
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${Base_url}api/teacher`); // Replace with your actual API endpoint
      // setUsers(response.data.data.users);
      const Data= response.data.data.teachers
      console.log("Trainer Data ==>",Data)
      if(Data){
        setTeacherData(Data)
    //  setFilterRows(Data);

    
    
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(()=>{
    fetchTeachers();
 
  },[update])
  const cards = [
    { title: "Hatha Yoga", description: "Start Your Day Out Right " },
    { title: "Rise and Shine", description: "Intermediate Power Flow" },
    // Add more cards as needed
  ];

  const handelClassClick = (id) => {
    navigation.navigate("ClassDescription",{ value: id });
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

  
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const swiperHeight = screenHeight * 0.55; // Set swiper height to 40% of screen height

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

  const handelWebZommPageClick = () => {
    navigation.navigate("ZoomPage");
  };

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



  const getAllEvents = async () => {
    try {
      const response = await axios.get(`${Base_url}api/events`); // Update the API endpoint accordingly
      
      const Data = response.data
      console.log("Data Class DAta in if  : ",response)
      if(Data){
         console.log("Formated DAta ==>",Data)
          const formattedData = Data.map((item) => ({
         "id":item._id,
         "eventName":item.eventName,
         "eventType":item.eventType,
         "Date":formatDate(item.startDate),
         "Time":formatTimeTo12Hour(item.startTime) ,
          'mn': item.meeting_number,
          'pass': item.password,
       
     
     }));

     setEventsData(formattedData)
    
    
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

 const handleEventWebView = (id)=> {
  // console.log("Data details =====>", data);
  // const ZoomMeetingNumber = {
  //   number: data.number,
  //   pass: data.pass,
  //   userName: userData && userData.name,
  //   email: userData && userData.email,
  // };
  const data ={
    userId:userData._id,
    eventId:id
  }

  
    navigation.navigate("Event", { data });
    return;
 

 }

 

  useEffect(() => {
    getAllClasses();
    getAllEvents()
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <StatusBar style="dark" />
       {isLoading ? <Block center style={{height:height*0.8,flexDirection:"row",justifyContent:"center",alignItems:"center"}}> 

        <ActivityIndicator size="large" color="orange" />
       </Block> 
      :
      <ScrollView    refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      
      <Block style={{ backgroundColor: "#eef3f7" }}>
        <Block
          style={{
            width: width,
          }}
        >
          <Block >
            <Swiper
              style={{ height: height * 0.25 }}
              showsPagination={false}
              overlayEnabled
              overlayColor={"transparent"} // Set the color of the overlay
              overlayOpacity={0.5}
            >
              <View>
                <Image
                  source={require("../../assets/Images/Frame1.png")}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Image
                  source={require("../../assets/Images/Frame1.png")}
                  resizeMode="contain"
                />
              </View>
            </Swiper>
          </Block>
        </Block>

        <Block style={{ padding: 10 }}>
          <Block style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: "black",

                marginTop: 5,
              }}
            >
              Group Classes
            </Text>
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Swiper
              style={{ height: swiperHeight }}
              showsPagination={false}
              overlayEnabled={true}
              overlayColor={"transparent"} // Set the color of the overlay
              overlayOpacity={0.5}
              spaceBetween={3}
            >
              {classes &&
                classes.map((card, index) => (
                  <View key={index}>
                    <View style={{ flexDirection: "row" }}>
                      {/* Current card */}
                      <Card
                        mn={card.mn}
                        title={card.Title}
                        time={card.time}
                        description={card.Teacher}
                        ClassClick={()=>handelClassClick(card._id)}
                        book={handelMembershipModel}
                        join={() =>
                          handelWebZommClassClick({
                            number: card.mn,
                            pass: card.pass,
                          })
                        }
                        // Pass overlay color to the Card component
                      />
                      {/* Next card */}
                      {classes[index + 1] && (
                        <Card
                          mn={classes[index + 1].mn}
                          title={classes[index + 1].Title}
                          description={classes[index + 1].Teacher}
                          overlayColor={classes[index + 1].overlayColor} // Pass overlay color to the next card
                        />
                      )}
                    </View>
                  </View>
                ))}
            </Swiper>
          </Block>

         <Block style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 20,
                color: "black",

                marginTop: 5,
              }}
            >
              Upcoming Events
            </Text>
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Swiper
              style={{ height: swiperHeight }}
              showsPagination={false}
              overlayEnabled={true}
              overlayColor={"transparent"} // Set the color of the overlay
              overlayOpacity={0.5}
              spaceBetween={3}
            >
              {Events &&
                Events.map((card, index) => (
                  <View key={index}>
                    <View style={{ flexDirection: "row" }}>
                    
                      <EventCard
                        mn={card.mn}
                        title={card.eventName}
                        description={card.eventType}
                        date={card.Date}
                        time={card.Time}
                        ClassClick={handelClassClick}
                        book={handelMembershipModel}
                        join={() =>
                          // handelWebZommClassClick({
                          //   number: card.mn,
                          //   pass: card.pass,
                          // })
                          handleEventWebView(card.id)
                        }
                    
                      />
                    
                      {classes[index + 1] && (
                        <Card
                          mn={classes[index + 1].mn}
                          title={classes[index + 1].Title}
                          description={classes[index + 1].Teacher}
                          overlayColor={classes[index + 1].overlayColor} // Pass overlay color to the next card
                        />
                      )}
                    </View>
                  </View>
                ))}
            </Swiper>
          </Block> 

          <Block style={{ marginTop: 40 }}>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                marginTop: 5,
              }}
            >
              Book 1:1 Session
            </Text>
            <Text style={{ fontSize: 14, color: "grey" }}>
              With your favorite Instructor
            </Text>
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Swiper
              style={{ height: screenHeight * 0.25 }}
              showsPagination={false}
              overlayEnabled
              overlayColor={"transparent"} // Set the color of the overlay
              overlayOpacity={0.5}
            >
              {
          TeacherData && TeacherData.map((el,index)=>{
               return  <Block key={index}> 
                <OneOnOneClassCard 
                data={el}
               onTeacherClick={()=>handelTeacherClick(el._id)}
              
             />
             </Block>
          })
        }
            </Swiper>
          </Block>

          <LinearGradient
    colors={['#FFFFFF', '#E6FBEB']}
    style={{
      flex: 1,
      marginBottom: 120,
      marginTop: 30,
      padding: 10,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#D9E2F2',
    }}>
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

      }}>
      <View>
        <Text style={{ fontSize: 24 }}>We are here to help you</Text>
        <Text style={{ color: 'grey', marginTop: 3 }}>
          Feel free to reach us out
        </Text>
      </View>

      <View>
        <Image
          source={require('../../assets/Images/streamline_customer-support-1.png')}
        />
      </View>
    </View>
    <Block center>
              <LottieView
                style={styles.lottie}
                source={require("../../assets/Animations/Animation - 1712820681578.json")}
                autoPlay
                loop
              />
            </Block>
  </LinearGradient>
          
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
      }
      
      <BottomTabs ActiveTab={"home"}/>
    </View>
  );
};

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
