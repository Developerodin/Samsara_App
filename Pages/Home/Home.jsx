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
  RefreshControl,
  ImageBackground
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
import { MoodSelectModel } from "../../Components/Model/MoodSelectModel";
import Happy from "../../assets/Mood/HappyMood.png";
import Sad from "../../assets/Mood/SadMood.png";
import Angry from "../../assets/Mood/AngryMood.png";
import Content from "../../assets/Mood/ContentMood.png";
import Enthused from "../../assets/Mood/EnthusedMood.png"
import Grateful from "../../assets/Mood/GratefulMood.png";
import Lonely from "../../assets/Mood/LonelyMood.png";
import Stressed from "../../assets/Mood/StressedMood.png";
import Tired from "../../assets/Mood/TiredMood.png";
import Anxious from "../../assets/Mood/AnxiousMood.png";
import * as NavigationBar from 'expo-navigation-bar'
import usePushNotifications from "../../usePushNotifications";
const calculateTimeLeft = (startDate, endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const timeLeft = end - now;

  if (timeLeft <= 0) {
    return '00:00:00:00';
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const MembershipTimer = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate, endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startDate, endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <Block>
      <Text style={{fontSize:15,color:"grey"}}>Time Left: {timeLeft}</Text>
    </Block>
  );
};

export const Home = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [webmodalVisible, setWebModalVisible] = useState(false);
  const [MoodmodalVisible, setMoodModalVisible] = useState(false);
  const [classes, setClasses] = useState([]);
  const [Events, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [TeacherData, setTeacherData] = useState([]);
  const [update, setupdate] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const moods = [
    { moodName: "Happy", emoji:Happy },
    { moodName: "Sad", emoji:Sad },
    { moodName: "Angry", emoji:Angry },
    { moodName: "Content", emoji:Content},
    { moodName: "Enthused", emoji:Enthused },
    { moodName: "Grateful", emoji:Grateful},
    { moodName: "Lonely", emoji:Lonely },
    { moodName: "Stressed", emoji:Stressed },
    { moodName: "Tired", emoji:Tired },
    { moodName: "Anxious", emoji:Anxious },
  ];
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedModdObject,setSelectedMoodObject] = useState(moods[0]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [MemberShipData,setMemberShipData] = useState(null);
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  // const {toggleDrwerMenu,isDrwerMenuVisible, setDrawerMenuVisible} =useAppContext()
  const CloseMenu= () =>{
    setMenuVisible(false)
  }
  const showMenue = ()=>{
    setMenuVisible(true)
  }

  const getUserMood = async (id) => {
    if(id){
      try {
        const response = await axios.get(`${Base_url}api/usermood/${id}`); // Update the API endpoint accordingly
        
        const Data = response.data
        console.log("User Mood Data 1 =====>  : ",Data[0])
        if(Data && Data.length>0){
          setSelectedMood(Data[0].mood);
          const Mood = moods.find(mood => mood.moodName === Data[0].mood)
          console.log("Selected Modds=============>==========>",Mood)
          setSelectedMoodObject(Mood)
        }
        
      
        
      } catch (error) {
        console.error('Error fetching Modd Data ======>:', error);
      }
    }
   
  };


  const handelTeacherClick = (id) => {
    navigation.navigate("About Instructor", { teacherId: id });
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Call your functions here
    fetchTeachers()
    getAllClasses();
    getUserMemberShip(userData._id)
    // After fetching data, set refreshing to false
    setRefreshing(false);
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${Base_url}api/teacher`); // Replace with your actual API endpoint
      // setUsers(response.data.data.users);
      const Data= response.data.data.teachers
      // console.log("Trainer Data ==>",Data)
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
    // console.log("web Complete");
  };

  
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const swiperHeight = screenHeight * 0.55; // Set swiper height to 40% of screen height

  const swiperItemWidth = screenWidth * 0.8;

  const handelComplete = () => {
    const data ={
      userId:userData && userData._id,
    }
  
    
      navigation.navigate("Membership", { data });
  };

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
    // console.log("Data details =====>", data);
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

      // console.log("Parse Data ===>", ParseData.data.user);
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
      // console.log("Data Class DAta in if  : ",response)
      if(Data){
        //  console.log("Formated DAta ==>",Data)
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
    userId:userData && userData._id,
    eventId:id
  }

  
    navigation.navigate("Event", { data });
    return;
 

 }

 const handelMemebershipWebView= ()=>{
  const data ={
    userId:userData && userData._id,
  }

  
    // navigation.navigate("Membership", { data });
    navigation.navigate("Plans");
    return;
 }

 const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const handelMoodModelOpen = ()=>{
  setMoodModalVisible(true);
}
 

const getUserMemberShip = async (id) => {
  try {
    const response = await axios.get(`${Base_url}api/memberships/user/${id}`); // Update the API endpoint accordingly
    
    const Data = response.data
    console.log("User MemberShip Data  0000 =====>  : ",Data[0])
 
    setMemberShipData(Data[0])
  
    
  } catch (error) {
    console.error('Error fetching MemberShip Data ======>:', error.message);
  }
};

const handelPayClick = ()=>{
  console.log("URl Click")
 const url = `https://samsara-web-8j4i.vercel.app/pricing/${userData._id}`
 Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
}


const handelContactus = ()=>{
  navigation.navigate("Contact Us")
}

useEffect(() => {
  if(userData && userData._id){
    getUserMood(userData._id);
    getUserMemberShip(userData._id)
  }
  
}, [update,userData]);



  useEffect(() => {
    getAllClasses();
    getAllEvents();
  
  }, []);
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      {/* <StatusBar style="dark" /> */}
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
            position:"relative"
          }}
        >

          <Block style={{position:"absolute",top:0,zIndex:999,width:width}}>
          
          <View style={[{marginTop:10,padding:10,paddingTop:20},styles2.container]}>
        <StatusBar  barStyle="light-content" 
        translucent={true} 
        />
        <Block  style={styles2.Space_Between}>
        <TouchableOpacity onPress={showMenue}>
          {/* <Entypo name="menu" size={40} color="grey"  /> */}
          <Image    source={require('../../assets/Images/ri_menu-2-line.png')} />
          </TouchableOpacity>
          <Block style={{alignItems:"center"}}>
          {/* samsaraLogo.png */}
          <Image  style={{height:33,width:150}}  source={require('../../assets/samsaraLogo.png')} />
          </Block>
          <Block>
          <TouchableOpacity onPress={handelMoodModelOpen}>
              <Block>
                  {/* <Text style={{fontSize:26}}>{selectedModdObject.emoji}</Text> */}
                  <Image style={{height:36,width:36}}  source={selectedModdObject.emoji} />
              </Block>

              </TouchableOpacity>
          </Block>
        </Block>
       <HamburgerMenu isVisible={isMenuVisible} onClose={CloseMenu}  />
    </View>


               
          <Block style={[{padding:10,height:height*0.15,flexDirection:"row",justifyContent:"left",alignItems:"center"}]}>
            <Block >
              <Text style={{fontSize:20,color:"#fff",fontWeight:700}}>Hii, {userData && userData.name}</Text>
              <Text style={{fontSize:18,color:"#EA6C13",fontWeight:600}}>{getGreeting()}</Text>
            </Block>
          </Block>


          </Block>
          



          <Block >
            <Swiper
              style={{ height: height * 0.35 }}
              showsPagination={true}
              overlayEnabled={true}
              overlayColor={"transparent"} 
              overlayOpacity={0.5}
              autoplay={true}
              autoplayTimeout={5}
            
            >
              <View >
        
              <ImageBackground
        source={require('../../assets/Images/Frame2.jpg')}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle} 
      >
           <LinearGradient 
              colors={['rgba(254, 242, 234, 0)', '#eef3f7']}
            locations={[0.7, 0.95]}
            style={styles.linearGradient}>
             
             </LinearGradient>
      </ImageBackground>
   
              </View>


              <View >
        
        <ImageBackground
  source={require('../../assets/Images/Frame1.png')}
  style={styles.imageBackground}
  imageStyle={styles.imageStyle} 
>
     <LinearGradient 
        colors={['rgba(254, 242, 234, 0)', '#eef3f7']}
      locations={[0.7, 0.95]}
      style={styles.linearGradient}>
       
       </LinearGradient>
</ImageBackground>

        </View>

        <View >
        
        <ImageBackground
  source={require('../../assets/Images/Frame3.jpg')}
  style={styles.imageBackground}
  imageStyle={styles.imageStyle} 
>
     <LinearGradient 
        colors={['rgba(254, 242, 234, 0)', '#eef3f7']}
      locations={[0.7, 0.95]}
      style={styles.linearGradient}>
       
       </LinearGradient>
</ImageBackground>

        </View>


           
              

            
             
            </Swiper>
          </Block>
        </Block>

        {/* <Block style={{padding:10}}>
             <Block style={styles.Space_Between}>
              <Block>
            
              <Text style={{fontSize:16,color:"grey"}}>Upgrade your membership today!</Text>
              
              {
                MemberShipData && <MembershipTimer startDate={MemberShipData.startDate} endDate={MemberShipData.endDate} />
              }
              </Block>
              

              <TouchableOpacity onPress={handelPayClick} style={styles.button2} >
      <Text style={styles.buttonText2}>Pay now</Text>
    </TouchableOpacity>
             </Block>
           
         </Block>
     */}

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
         


          <FlatList
  data={classes}
  horizontal
  pagingEnabled={false} // Disable paging, so half of the next card can be shown
  showsHorizontalScrollIndicator={false}
  snapToInterval={width * 0.75 + 10} // Snap to the size of 1 card + spacing
  decelerationRate="fast" // Optional: smooth snapping effect
  contentContainerStyle={{ paddingHorizontal: 10 }} // Padding to start/end cards
  renderItem={({ item,index }) => (
    <View style={{
      flexDirection: "row",
      width: width * 0.70, // Show 75% of the card width
      marginRight: 10, // Add spacing between cards
      height: 400,
      // borderWidth:1
      // Your card height
    }}>
      <Card
        mn={item.mn}
        title={item.Title}
        time={item.time}
        description={item.Teacher}
        ClassClick={() => handelClassClick(item._id)}
        book={handelMembershipModel}
        join={() => handelWebZommClassClick({
          number: item.mn,
          pass: item.pass
        })}
        index={index}
      />
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
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
         


          <FlatList
  data={Events}
  horizontal
  pagingEnabled
  snapToInterval={320} // Adjust this value according to card width + margin
  decelerationRate="fast" // Ensures smooth snapping
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 20 }} // Optional: adds padding to the list
  renderItem={({ item,index }) => (
    <View style={{ flexDirection: "row", height: 400, width: 300, marginRight: 10 }}>
      <EventCard
        mn={item.mn}
        title={item.eventName}
        description={item.eventType}
        date={item.Date}
        time={item.Time}
        ClassClick={handelClassClick}
        book={handelMembershipModel}
        join={() => handleEventWebView(item.id)}
        index={index}
      />
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>


    
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
<TouchableOpacity activeOpacity={0.8} onPress={handelContactus}>


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
  </TouchableOpacity>      
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

<MoodSelectModel
 modalVisible={MoodmodalVisible}
 setModalVisible={setMoodModalVisible}
 setupdate={setupdate}
 userId={userData && userData._id}
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
  },
  imageBackground: {
    width: '100%',
    height: height * 0.35,
    overflow: 'hidden',
  },
  imageStyle: {
   
  },
  button2: {
    height: 30, // Adjust height as needed
    width:80, // Take entire width
    borderRadius: 17, // Border radius for rounded corners
    backgroundColor: '#EA6C13', // Orange background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText2: {
    color: 'white', // Text color
    fontSize: 14, // Text font size
    // Text font weight
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
   
    height:height * 0.35
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


const styles2 = StyleSheet.create({
  container:{
  
    

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