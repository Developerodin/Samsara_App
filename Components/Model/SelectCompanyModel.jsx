import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet,ScrollView, Pressable, View, Dimensions,Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Block } from "galio-framework";

import { FontAwesome6 } from '@expo/vector-icons';
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";

const { width, height } = Dimensions.get("screen");
export const SelectCompanyModel = ({modalVisible,setModalVisible,setselectedCompanyName,setselectedCompanyId}) => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
  const [companies, setCompanies] = useState([]);
  const handelModelClose = () => {
    console.log("Model CLick");
    setModalVisible(!modalVisible);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handelSelectedCompany =(value,id) =>{
    setselectedCompanyName(value);
    setselectedCompanyId(id)
    setModalVisible(false)
  }
  const getAllCompanies = async () => {
    try {
      // Get all companies
      const response = await axios.get(`${Base_url}api/company/companies`);
      if(response.status === 200) {
      setCompanies(response.data);
      const Data = response.data
       
      }
      
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);
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
        // swipeDirection={[ "down"]}
        style={styles.viewHalf}
      >
   
       <View style={[styles.centeredView]}>
      
          <View style={styles.modalView}>
          <Block center style={{marginTop:-42}}>
          <AntDesign name="minus" size={50} color="grey" />
          </Block>

<ScrollView>




          <Block left style={{width:width*0.9}}>
            <Text style={{fontSize:21,color:"#1E1E1E"}}>
                Select Your Company
            </Text>
          </Block>
           
              {
                companies && companies.map((el,index)=>{
                  return     <Block key={index} style={{marginTop:30}}>
                  <TouchableOpacity onPress={()=>handelSelectedCompany(el.companyName,el._id)} activeOpacity={0.5} style={{width:width*0.8}} >
                      <Block style={{borderWidth:1,borderColor:"#3E5072", borderRadius:10,padding:20,flexDirection:"row",justifyContent:"start",alignItems:"center"}}>
                      {/* <AntDesign name="user" size={20} color="grey" /> */}
                    
                              <Text style={{color:"grey",marginLeft:10}}>{el.companyName}</Text>
                              
                      </Block>
    
                  </TouchableOpacity>
             
                </Block>
                })
              }
         

         
        
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
  viewHalf: {
    // justifyContent: "flex-end",
    // margin: 0,
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

