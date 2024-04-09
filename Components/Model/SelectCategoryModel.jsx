import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Pressable, View, Dimensions,Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Block } from "galio-framework";

import { FontAwesome6 } from '@expo/vector-icons';
const { width, height } = Dimensions.get("screen");
export const SelectCategoryModel = ({modalVisible,setModalVisible,setSelectedCategory}) => {
  const navigation = useNavigation();
  const animationRef = useRef(null);

  const handelModelClose = () => {
    console.log("Model CLick");
    setModalVisible(!modalVisible);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handelSelectedCategory =(value) =>{
    setSelectedCategory(value);
    setModalVisible(false)
  }

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);
 

  return (
    <Modal
    // propagateSwipe={true}
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        backdropOpacity={0.1}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection={[ "down"]}
        style={styles.viewHalf}
      >
   
      <View style={[styles.centeredView]}>
      
          <View style={styles.modalView}>
          <Block center style={{marginTop:-42}}>
          <AntDesign name="minus" size={50} color="grey" />
          </Block>


          <Block left style={{width:width*0.9}}>
            <Text style={{fontSize:21,color:"#1E1E1E"}}>
                Select Your User Category
            </Text>
          </Block>

          <Block style={{marginTop:30}}>
              <TouchableOpacity onPress={()=>handelSelectedCategory("Personal")} activeOpacity={0.5} style={{width:width*0.9}} >
                  <Block style={{borderWidth:1,borderColor:"#3E5072",height:70, borderRadius:10,padding:20,flexDirection:"row",justifyContent:"start",alignItems:"center"}}>
                  <AntDesign name="user" size={20} color="grey" />
                
                          <Text style={{color:"grey",marginLeft:10}}>Personal</Text>
                          
                  </Block>

              </TouchableOpacity>
         
            </Block>

            <Block style={{marginTop:20}}>
              <TouchableOpacity onPress={()=>handelSelectedCategory("Corporate")} activeOpacity={0.5} style={{width:width*0.9}} >
                  <Block style={{borderWidth:1,borderColor:"#3E5072",height:70, borderRadius:10,padding:20,flexDirection:"row",justifyContent:"start",alignItems:"center"}}>
                  {/* <AntDesign name="down" size={20} color="grey" /> */}
                  <FontAwesome6 name="users" size={20} color="grey" />
                          <Text style={{color:"grey",marginLeft:10}}>Corporate</Text>
                          
                  </Block>

              </TouchableOpacity>
         
            </Block>
             
         
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
  viewHalf: {
    justifyContent: "flex-end",
    margin: 0,
  },
  lottie:{
    width:250,
    height:250
    },
  content: {
    backgroundColor: "white",
    padding: 22,
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 35,
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
    height: height - 350,
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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  AlignCenter: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  borderView: {
    borderWidth: 1,
    borderColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBlock: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: 40, // Adjust as needed
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
