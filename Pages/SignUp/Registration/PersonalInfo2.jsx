import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  KeyboardAvoidingView,
  Easing,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme } from "galio-framework";
const { width, height } = Dimensions.get("window");
import PhoneInput from "react-native-phone-number-input";

import { Feather } from "@expo/vector-icons";
import { ToastAndroid } from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomButton from "../../../Components/Buttons/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { SelectCategoryModel } from "../../../Components/Model/SelectCategoryModel";
import { useNavigation } from '@react-navigation/native';
import { Base_url } from "../../../Config/BaseUrl";
import { SelectCompanyModel } from "../../../Components/Model/SelectCompanyModel";
import { Ionicons } from '@expo/vector-icons';

export const PersonalInfo2 = () => {
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false)
   const [formData,setFormData] = useState({
    name:"",
    email:"",
    corporate_id:"",
    password:"",
    confirm_password:""
   })
  const [showPassword, setShowPassword] = useState(false);
  const [categoryModelOpen, setCategoryModelOpen] = useState(false);
  const [companyModelOpen, setCompanyModelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
 
  const [selectedCompanyName,setselectedCompanyName] = useState("");
  const [selectedCompanyId,setselectedCompanyId] = useState("");
  const handelCategoryModelOpen = () => {
    setCategoryModelOpen(true);
    console.log("handel category ,odel open clock");
  };

  const handelCompnayModelOpen = () => {
    setCompanyModelOpen(true);
    console.log("handel category ,odel open clock");
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handelPassBackPress=()=>{
    setShowPassword(false);
  }

  const handelSubmit = async()=>{
   
    const mobile  = await AsyncStorage.getItem("Mobile");
        console.log("Formadata ==>",mobile,formData,selectedCategory,selectedCompanyId)
       
       if(formData.password !== formData.confirm_password){
      
        ToastAndroid.show(`Password and Confirm Password are not same`, ToastAndroid.SHORT);
       return ;
      }
       
        if (selectedCategory === "Corporate" && (selectedCompanyName === "" || formData.corporate_id === "")) {
        
          ToastAndroid.show(`Company Name and Corporate ID are required for Corporate type.`, ToastAndroid.SHORT);
          return;
        }
       
       for (const key in formData) {
          // Skip checking companyName and corporateId if selectedType is Corporate
          console.log("Selected type : ",selectedCategory)
    
          if (formData[key] === "") {
            if (selectedCategory !== "Corporate" && (key === "companyName" || key === "corporate_id")) {
              console.log("Corporate ==>",key)
              continue;
            }
            else{
           
              ToastAndroid.show(`${key} is required.`, ToastAndroid.SHORT);
            }
            
            return; // Stop the submission process if any field is empty
          }
        }
    
        const formData1 = new FormData();

        const userData ={
          "name": formData.name,
          "corporate_id":formData.corporate_id,
          "email":formData.email,
          "password": formData.password,
          "mobile":mobile
        };
        
        formData1.append("name", userData.name);
       
        formData1.append("email", userData.email);
        formData1.append("password", userData.password);
        formData1.append("mobile", userData.mobile);

      if(selectedCategory === "Corporate"){
 
        userData.company_name=selectedCompanyId;
       

      }
      setLoading(true);
        
        axios.post(`${Base_url}student_signup`, userData)
          .then((response) => {
            console.log('User created successfully:', response.data);
            // Optionally, you can navigate to the login page or perform any other action
         
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
            setLoading(false)
            // navigation("/corporate/users");
          })
          .catch((error) => {
            console.error('Error creating user:', error);
            ToastAndroid.show(`Refresh and try again`, ToastAndroid.SHORT);
            setLoading(false)
            
          });
      }

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={{ backgroundColor: "#EA6C13", height: height }}>
          <View style={{ height: height * 0.3 }}>
            {
              showPassword ?
              <View style={{ marginTop: 70, padding: 20 }}>
              <Text style={{ color: "#fff", fontSize: 27 }}>Hii,</Text>
              <Text style={{ color: "#fff", fontSize: 27 }}>{formData.name}</Text>
              <Text style={{ color: "#fff", fontSize: 14 }}>Let's Secure your Account</Text>
            </View>
            :
            <View style={{ marginTop: 70, padding: 20 }}>
              <Text style={{ color: "#fff", fontSize: 27 }}>Let's Know </Text>
              <Text style={{ color: "#fff", fontSize: 27 }}>Each Other</Text>
            </View>
            }
            

            {
            showPassword ? (
              <Block
                right
                style={{ position: "absolute", right: 0, bottom: 55 }}
              >
                <Image
                  source={require("../../../assets/Images/signup2.gif")}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </Block>
            ) : (
              <Block
                right
                style={{ position: "absolute", right: 0, bottom: -55 }}
              >
                <Image
                  source={require("../../../assets/Images/signup.gif")}
                  style={{ width: 200, height: 200 }}
                  resizeMode="contain"
                />
              </Block>
            )
            }
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              height: 100,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              height: height * 0.7,
              padding: 25,
            }}
          >
            {/* ==================================================== */}
            {showPassword ? (
              <View>

                <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                <Ionicons onPress={handelPassBackPress} name="arrow-back" size={24} color="#3E5072" />
                  <Text style={{fontSize:24,color:"#3E5072",marginLeft:10}}>Setup Login Pin</Text>
                </Block>
                <Block style={{ marginTop: 10 }}>
                  <Input
                  keyboardType="number-pad"
                    password
                    viewPass
                    left
                    icon="Safety"
                    family="AntDesign"
                    maxLength={4}
                    iconSize={24}
                       value={formData.password}
                       onChangeText={(text) => handleInputChange("password", text)}
                    placeholder="  Create New Pin"
                    style={{
                      height: 60,
                      backgroundColor: "#A8B6D140",
                      borderColor: "#A8B6D140",
                      letterSpacing: 2,
                    }}
                  />
                </Block>

                <Block style={{ marginTop: 10 }}>
                  <Input
                   keyboardType="number-pad"
                    maxLength={4}
                    password
                    viewPass
                    left
                    icon="Safety"
                    family="AntDesign"
                    iconSize={24}
                    value={formData.confirm_password}
                       onChangeText={(text) => handleInputChange("confirm_password", text)}
                    placeholder="  Confirm New Pin"
                    style={{
                      height: 60,
                      backgroundColor: "#A8B6D140",
                      borderColor: "#A8B6D140",
                      letterSpacing: 2,
                      
                    }}
                  />
                </Block>
              </View>
            ) : (
              <View>
                <Block>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handelCategoryModelOpen}
                  >
                    <Block
                      style={{
                        borderWidth: 1,
                        borderColor: "#3E5072",
                        height: 60,
                        borderRadius: 10,
                        padding: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "grey" }}>
                        {selectedCategory === ""
                          ? "Select Category"
                          : selectedCategory}
                      </Text>
                      <AntDesign name="down" size={20} color="grey" />
                    </Block>
                  </TouchableOpacity>
                  {/* <Input
                    keyboardType="numeric"
                    left
                    icon="phone"
                    family="Feather"
                    iconSize={24}
                    //    value={formData.phoneNumber}
                    //    onChangeText={(text) => handleInputChange("phoneNumber", text)}
                    placeholder="   +91  xxx  xxx  xxx"
                    style={{
                      height: 60,
                      backgroundColor: "#A8B6D140",
                      borderColor: "#A8B6D140",
                      letterSpacing: 2,
                    }}
                  /> */}
                </Block>
                {selectedCategory === "Corporate" && (
                  <Block style={{ marginTop: 15 }}>
                      <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handelCompnayModelOpen}
                  >
                      <Block
                      style={{
                        borderWidth: 1,
                        borderColor: "#3E5072",
                        height: 60,
                        borderRadius: 10,
                        padding: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "grey" }}>
                        {selectedCompanyName === ""
                          ? "Select Company"
                          : selectedCompanyName}
                      </Text>
                      <AntDesign name="down" size={20} color="grey" />
                    </Block>
                  </TouchableOpacity>
                   

                  </Block>
                )}
                <Block style={{ marginTop: 10 }}>
                  <Input
                    left
                    icon="user"
                    family="Feather"
                    iconSize={24}
                    value={formData.name}
                    onChangeText={(text) => handleInputChange("name", text)}
                    placeholder="  My name is .."
                    style={{
                      height: 60,
                      backgroundColor: "#A8B6D140",
                      borderColor: "#A8B6D140",
                      letterSpacing: 2,
                    }}
                  />
                </Block>

               

                {selectedCategory === "Corporate" && (
                  <Block style={{ marginTop: 10 }}>
                   
                    <Input
                      left
                      icon="home"
                      family="AntDesign"
                      iconSize={24}
                      value={formData.corporate_id}
                      onChangeText={(text) => handleInputChange("corporate_id", text)}
                      placeholder="  My Corporate ID is.."
                      style={{
                        height: 60,
                        backgroundColor: "#A8B6D140",
                        borderColor: "#A8B6D140",
                        letterSpacing: 2,
                      }}
                    />
                
                   
                  </Block>
                )}

                <Block style={{ marginTop: 10 }}>
                  <Input
                    left
                    icon="mail"
                    family="Feather"
                    iconSize={24}
                       value={formData.email}
                       onChangeText={(text) => handleInputChange("email", text)}
                    placeholder="  My Mail ID is .."
                    style={{
                      height: 60,
                      backgroundColor: "#A8B6D140",
                      borderColor: "#A8B6D140",
                      letterSpacing: 2,
                    }}
                  />
                </Block>
              </View>
            )}
            {/* ==================================================== */}

            <Block style={{ marginTop: 30 }}>
              {showPassword ? (
                <>
                { loading ?
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="large"  color="#EA6C13" />
              </View>
                :
                <CustomButton
                  onPress={handelSubmit}
                  title="Submit"
                />
}
                </>

              ) : (
                <CustomButton
                  onPress={() => {
                    console.log("hii");
                    setShowPassword(true);
                  }}
                  title="Proceed"
                />
              )}
            </Block>
          </View>
        </View>
        <SelectCategoryModel
          modalVisible={categoryModelOpen}
          setModalVisible={setCategoryModelOpen}
          setSelectedCategory={setSelectedCategory}
        />
        <SelectCompanyModel
          modalVisible={companyModelOpen}
          setModalVisible={setCompanyModelOpen}
          setselectedCompanyName={setselectedCompanyName}
          setselectedCompanyId={setselectedCompanyId}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    // Fully opaque background
  },

  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.5,
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
    flex: 0.5,
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
  bottomBlock: {
    position: "absolute",
    bottom: 50,
    width: width,
  },
});
