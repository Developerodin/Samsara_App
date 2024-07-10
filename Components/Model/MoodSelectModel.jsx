import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Block, Text, Input, theme,Button } from "galio-framework";

import { Ionicons } from "@expo/vector-icons";

import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "@react-native-material/core";
import { Entypo } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
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
const { width, height } = Dimensions.get("screen");
export const MoodSelectModel = ({
  modalVisible,
  setModalVisible,
  setupdate,
  userId
}) => {

  const animationRef = useRef(null);

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

  const getUserMood = async () => {
    try {
      const response = await axios.get(`${Base_url}api/usermood/${userId}`); // Update the API endpoint accordingly
      
      const Data = response.data
      console.log("User Mood Data 1 =====>  : ",Data[0])
      setSelectedMood(Data[0].mood);
    
    
      
    } catch (error) {
      console.error('Error fetching Modd Data ======>:', error.message);
    }
  };

 const updateUserMood = async (moodName) => {
    try {
      const response = await axios.put(`${Base_url}api/usermood/${userId}`, {
        userId:userId,
        mood:moodName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    //  console.log("User Mood Data 2 =====>  : ",response.data)
    //  handelClose();
     setupdate((prev)=>prev+1);
    } catch (error) {
      console.error('Error updating mood:', error);
      throw error;
    }
  };


  useEffect(()=>{
    getUserMood();
  },[userId])


  const handleSelectMood = async (moodName) => {
    setSelectedMood(moodName);
    handelClose();
    updateUserMood(moodName);
   
   
  }


  useEffect(() => {
    // console.log(ItemModelData)
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);



  const handelClose = () => {
    setModalVisible(false);
    // setFormData(initalValuesForm);
  };

  return (
    <Modal
   
      animationType="slide"
      transparent={true}
      isVisible={modalVisible}
      // onSwipeComplete={() => setModalVisible(false)}
      backdropOpacity={0.5}
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection={["right"]}
      style={styles.viewHalf}
    >
        
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
            <ScrollView>
            <Block right style={{ width: width * 0.9 }}>
            <Ionicons
              onPress={handelClose}
              name="close-circle"
              size={24}
              color="orange"
            />
          </Block>
          <Block style={{marginTop:20,marginBottom:40}}>
            <Block center >
             <Text style={{fontSize:24}}> How are you feeling ?</Text>
              </Block>
              <View style={styles2.container}>
      {moods.map((el, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectMood(el.moodName)}
          style={[
            styles.moodContainer,
            {
              borderColor: selectedMood === el.moodName ? 'green' : 'transparent',
              borderWidth: selectedMood === el.moodName ? 2 : 0,
              borderRadius:20
            },
          ]}
        >
          <View style={styles2.blockCenter}>
            <Image style={styles2.image} source={el.emoji} />
            <Text style={styles2.text}>{el.moodName}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
         
          </Block>
            </ScrollView>
         
          
        </View>
      </View>

      {/* <View style={styles.content}>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Button testID={'close-button'}  title="Close" />
  </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
    moodContainer: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
      },
    webcontainer: {
       width:width*0.98,
       height:height,
        // marginTop: Constants.statusBarHeight,
      },
  viewHalf: {
    justifyContent: "flex-end",
    margin: 0,
    
  },
  lottie: {
    width: 250,
    height: 250,
  },
  content: {
    backgroundColor: "white",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width,
    height: height - 0.8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    color: "#2DA194",
  },
});


const styles2 = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  moodContainer: {
    width: '48%', // Two items per row
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  blockCenter: {
    alignItems: 'center',
  },
  image: {
    height: 98,
    width: 98,
  },
  text: {
    fontSize: 18,
  },
};


