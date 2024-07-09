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
const { width, height } = Dimensions.get("screen");
export const MoodSelectModel = ({
  modalVisible,
  setModalVisible,
  setupdate,
  userId
}) => {

  const animationRef = useRef(null);

  const moods = [
    { moodName: "Happy", emoji: "☺️" },
    { moodName: "Sad", emoji: "😢" },
    { moodName: "Angry", emoji: "😠" },
    { moodName: "Excited", emoji: "😃" },
    { moodName: "Surprised", emoji: "😮" },
    { moodName: "Confused", emoji: "😕" },
    { moodName: "Scared", emoji: "😱" },
    { moodName: "Disgusted", emoji: "🤢" },
    { moodName: "Bored", emoji: "😒" },
    { moodName: "Calm", emoji: "😌" },
    { moodName: "Tired", emoji: "😴" },
    { moodName: "Love", emoji: "❤️" }
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
          {/* <WebView style={styles.webcontainer} source={{ uri: webUrl  }}  originWhitelist={['*']} /> */}
          {moods.map((el, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectMood(el.moodName)}
          style={[
            styles.moodContainer,
            {
              borderColor: selectedMood === el.moodName ? 'green' : 'transparent',
              borderWidth: selectedMood === el.moodName ? 2 : 0,
            },
          ]}
        >
          <Text style={{ fontSize: 35 }}>{el.emoji}</Text>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>{el.moodName}</Text>
        </TouchableOpacity>
      ))}
         
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
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


