import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform 
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button, GalioProvider } from "galio-framework";
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import YoutubePlayer from "../../Components/VideoPlayer/YoutubePlayer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import CustomButton from "../../Components/Buttons/CustomButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
export const BookSession = ({ route }) => {
  const { teacherId } = route.params;
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customSessions,setCustomSessions] = useState([])
  const [update, setupdate] = useState(0);

  const createSession = async () => {
    const currentDate = selectedDate; // Assuming currentDate is in the format "2024-04-18T10:27:17.227Z"
    const formattedDate = currentDate.toISOString().split('T')[0];
    const Data = {
     teacher:teacherId,
     user:userData._id,
     date:formattedDate,
     timeSlot:selectedTimeSlot,
     message:"1 on 1 yoga session",
    }
    console.log("Data Book",Data)
    setLoading(true)
   try {
     const response = await axios.post(`${Base_url}api/custom_session`, Data);
 
   setSelectedTimeSlot("")
 
   setLoading(false)
   navigation.navigate("Session Status", { status: true });
     return response.data;
   } catch (error) {

     setLoading(false)
     throw error.response ? error.response.data : error.message;
   }
 };

 const fetchTimeSlots = async () => {
  try {
    const response = await axios.get(`${Base_url}api/custom_session/time-slots`);  // Assuming your backend API endpoint is '/api/time-slots'
    setTimeSlots(response.data);
  } catch (error) {
    console.error('Error fetching time slots:', error);
  }
};

  const handleDateChange = (event, date) => {
    setSelectedTimeSlot("")
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false)
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setShowDatePicker(false)
    setSelectedTimeSlot(timeSlot);

  };

  const handelSessionStatus = ()=>{
    
    const currentDate = selectedDate; // Assuming currentDate is in the format "2024-04-18T10:27:17.227Z"
    const formattedDate = currentDate.toISOString().split('T')[0];
    console.log("Time Slots  ===>",selectedTimeSlot,formattedDate)

    createSession()
  }

  const getAllCustomSessions = async () => {
    try {
      const response = await axios.get(`${Base_url}api/custom_session`); // Update the API endpoint accordingly
      setCustomSessions(response.data);
      const Data = response.data
      console.log("Data Class DAta in if  : ",response)
      
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const isTimeSlotDisabled = (timeSlot) => {
    // Check if the time slot matches any data from the backend
    const currentDate = selectedDate; // Assuming currentDate is in the format "2024-04-18T10:27:17.227Z"
const formattedDate = currentDate.toISOString().split('T')[0];
    const matchingData = customSessions.find(
      (data) => data.timeSlot._id === timeSlot._id && data.date === formattedDate
    );
    return matchingData !== undefined; // If matchingData is found, the time slot should be disabled
  };

  useEffect(()=>{
    // fetchTeachers();
    fetchTimeSlots();
    getAllCustomSessions();
  },[update,selectedDate])
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
  // useEffect(() => {
   
  //   getAllCustomSessions();


  //   const interval = setInterval(() => {
  //     getAllCustomSessions();
  //   }, 10000);


  //   return () => clearInterval(interval);
  // }, []);

  // const today = new Date();
  // const minDate = today.toISOString().split('T')[0];
  // const maxDate = new Date(today.setDate(today.getDate() + 10));
  return (
    <View style={styles.container}>
        <ScrollView>


        <Block style={{padding:10}}>
        <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",padding:10}}>

<Image style={{width:60,height:60,borderRadius:13}} source={require('../../assets/Samsra-app.jpg')} />


<Block style={{marginLeft:20}}>
<Text  style={{fontSize:14}}>Booking 1:1 Session with</Text>
<Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:3}}>



<Block>
<Text style={{fontSize:26,color:"grey",letterSpacing:1,color:"#EA6C13"}}>Pradeep Singh </Text>
</Block>
</Block>

</Block>
            </Block>

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{marginTop:20,borderWidth:1,borderColor:"#D9E2F2",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:15}}>

              <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                 <Block>
                 <AntDesign name="calendar" size={24} color="black" />
                 </Block>
                <Block style={{marginLeft:20}}>
                <Text style={{fontSize:16}}>{selectedDate ? selectedDate.toDateString() : "Select Date" }</Text>
                </Block>
             
      
          
       

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            // minimumDate={today}
            // maximumDate={maxDate}
            onChange={handleDateChange}
          />
        )}
              </Block>

              <Block>
              <AntDesign name="down" size={22} color="black" />
              </Block>
      
      </TouchableOpacity>

      <View style={{marginTop:30}}>
        <Text style={{fontSize:18}}>Select Timing Slots</Text>

          <Block style={{marginTop:30,flexDirection:"row",justifyContent:"left",alignItems:"center",flexWrap:"wrap",gap:20}}>
          {timeSlots.map((timeSlot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles2.timeSlotButton,
              selectedTimeSlot === timeSlot._id && styles2.selectedTimeSlot
              ,{padding:20,
                width:"45%",
              backgroundColor: isTimeSlotDisabled(timeSlot) ? "lightgray" : selectedTimeSlot === timeSlot._id ? '#FFEFE4' : 'white',
              pointerEvents: isTimeSlotDisabled(timeSlot) ? "none" : "auto",
              opacity: isTimeSlotDisabled(timeSlot) ? 0.5 : 1,
              borderColor: selectedTimeSlot === timeSlot._id ? '#FFEFE4' : 'white',
            
            }
            ]}
            onPress={() => handleTimeSlotSelect(timeSlot._id)}>

            <Text style={[styles2.timeSlotText,selectedTimeSlot === timeSlot._id && styles2.selectedTimeSlotText]}>{timeSlot.timeRange}</Text>
          </TouchableOpacity>
        ))}
          </Block>
       
      </View>

        </Block>
        </ScrollView>
        <Block style={{padding:20,height:100,maraginBottom:20}}>
        <TouchableOpacity onPress={handelSessionStatus}  style={{marginBottom:20,height:65, width:"100%",borderRadius: 20,backgroundColor: '#EA6C13',justifyContent: 'center',alignItems: 'center',}} >
      <Text style={{fontSize:16,color:"white"}}>Confirm Session</Text>
    </TouchableOpacity>
        </Block>
    </View>
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

  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    datePicker: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
    },
    timeSlotsContainer: {},
    timeSlotButton: {
      borderWidth: 1,
      borderColor: '#D9E2F2',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      flexDirection:"row",justifyContent: 'center',alignItems:"center"
    },
    selectedTimeSlot: {
      backgroundColor: '#FFEFE4',
      borderColor: '#EA6C13',
    },
    selectedTimeSlotText: {
     color: '#EA6C13',
    },
    timeSlotText: {
      fontSize: 12,
      color: '#586B90',
    },
  });