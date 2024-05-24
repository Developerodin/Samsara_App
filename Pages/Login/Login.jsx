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
  Easing ,
  ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme } from "galio-framework";
const { width, height } = Dimensions.get("window");
import PhoneInput from "react-native-phone-number-input";
import Img from "../Images/Onbording.png";
import Logo from "../Images/Logo_1.png";
import { Feather } from "@expo/vector-icons";
import { OTPInput } from "../../Components/Otp/OtpInputs";
import { ToastAndroid } from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Shape from "../Images/shape.png";
import LoginImg from "../Images/loginImg1.jpg";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import CustomButton from "../../Components/Buttons/CustomButton";

export const Login = ({ navigation }) => {
  const initalValuesForm = {
    phoneNumber: "",
  }
  const [formData, setFormData] = useState(initalValuesForm);
  const [showOTP, setOTPShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const scaleValue = new Animated.Value(1);

  const customStyle ={
    Card: {
    
      borderRadius:5,
      padding:10,
      backgroundColor:"#fff",
      elevation:isKeyboardOpen ? 4 : 0
    }
  }
  
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOtpFill = (otp) => {
    console.log("OTP entered:", otp);
    setOtp(otp);

    // You can perform any actions with the completed OTP here
  };
  const saveAuthStatus = async () => {
    try {
      // You can use any key you like to store the authentication status
      const key = 'Auth';
      const value = 'true'; // Replace with your actual authentication status
  
      // Use AsyncStorage to save the authentication status
      await AsyncStorage.setItem(key, value);
      console.log('Authentication status saved successfully.');
    } catch (error) {
      console.error('Error saving authentication status:', error);
    }
  };

  const saveMobileNumber = async () => {
    try {
      // You can use any key you like to store the authentication status
      const key = 'Mobile';
      const value = formData.phoneNumber; // Replace with your actual authentication status
  
      // Use AsyncStorage to save the authentication status
      await AsyncStorage.setItem(key, value);
      console.log('Mobile saved successfully.');
    } catch (error) {
      console.error('Error saving Mobile:', error);
    }
  };

  const handleLogin = async () => {
    console.log("Login Fun")
    setLoading(true)
    try {
        const response = await axios.post(`${Base_url}student_loginbymobile`, { mobile:formData.phoneNumber, password:otp });
    
              console.log("Status ==>",response.data)
            if (response.data.status === "success") {
          const { token } = response.data;
          console.log("data ==>",response.data)
          const Data = JSON.stringify(response.data);
          await AsyncStorage.setItem("userDetails", Data);
          // Save the token in AsyncStorage or in state management (e.g., Redux)
          AsyncStorage.setItem('token', token);
          saveAuthStatus()
          setLoading(false)
          handelPreviousUser()
         } 
    else {
      setLoading(false)
      handelNewUser();
    }
        
       
        // console.log('Login successful! Token:', token);
        // Redirect user to dashboard or perform any other necessary action
    } catch (error) {
      setLoading(false)
        console.error('Login failed:', error.response.data.message);
        Alert.alert('Login failed', 'Invalid mobile number or password');
    }
};

  const handelOtpComplete = () => {
    saveMobileNumber()
    // loginWithOTP()
    handleLogin()
    
  };

  const handelPreviousUser = () => {
    saveMobileNumber()
    setFormData(initalValuesForm);
    setOTPShow(false)
    setOtp("")
    // navigation.navigate("Home");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handelNewUser = () => {
    saveMobileNumber()
    setFormData(initalValuesForm);
    setOTPShow(false)
    setOtp("")
    navigation.navigate("PersonalInfo");
  };

  const handelMobileNumber = () => {
    if (!formData.phoneNumber) {
      ToastAndroid.show("Please Provide Mobile Number", ToastAndroid.SHORT);
      return;
    }
    setOTPShow(true);
    // generateOTP()
    
  };

  const handelBack = () => {
    setOTPShow(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Animate the scale when focused
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Disable native driver for transforms
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Animate the scale back when blurred
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  // const generateOTP = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await axios.post(`${Base_url}api/b2b/generate-otp`, { mobile_number: formData.phoneNumber });
  //     // handelNewUser();
  //     console.log(response.data.message);
  //     setLoading(false);
  //     if( response.data.message === "User not found"){
  //       handelNewUser()
  //       return ;
  //     }
  //     ToastAndroid.show("Otp send to mobile number", ToastAndroid.SHORT);
  //     setOTPShow(true);

  //   } catch (error) {
  //     console.error('Error:', error);
  //     ToastAndroid.show("Try After Some Time", ToastAndroid.SHORT);
  //     setLoading(false);
  //     console.log('Failed to generate OTP. Please try again.');
  //   }
  // };

  // const loginWithOTP = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await axios.post(`${Base_url}api/b2b/login-with-otp`, { mobile_number: formData.phoneNumber, otp: otp });
  //     setLoading(false)
  //       if(response.data.message === "Login successful"){
  //         const User = JSON.stringify(response.data.data)
  //         await AsyncStorage.setItem("userDetails", User);
  //         saveAuthStatus()
  //         handelPreviousUser();
  //         console.log("res =>",response.data.data);
  //       }

  //       if(response.data.message === "User not found") {
  //         handelNewUser()
  //       }

      
  //   } catch (error) {
  //     setLoading(false)
  //     console.error('Error:', error);
  //     console.log('Failed to login. Please try again.');
  //   }
  // };

  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView>

      
      {!isKeyboardOpen &&  <Block
          style={[styles.Space_Between, { marginTop: 30, marginRight: -13 }]}
        >
          <Block>
            {showOTP && (
              <AntDesign
                onPress={handelBack}
                name="arrowleft"
                size={30}
                color="grey"
                style={{ marginLeft: 20 }}
              />
            )}
          </Block>
             
         
        </Block>}

        <Block center style={{marginTop:20,height:40,width:190}}>
        <Image style={{height:40,width:190}} source={require("../../assets/samsaraLogo.png")}  />
        </Block>
        
        {
          !showOTP && 
          <Block style={{position:"absolute",top:100,right:20,transform: [{ rotate: '-33deg' }]}}>
        <Image source={require("../../assets/Images/loginbg2.png")} style={{ width: 90, height: 90 }} />
        </Block>
}
{
        !showOTP &&  <Block style={{position:"absolute",left:-32,top:230,transform: [{ rotate: '33deg' }]}}>
        <Image source={require("../../assets/Images/loginbg1.png")} style={{ width: 120, height: 120 }} />
        </Block>
         
        }
        

        <View
          style={[
            { marginTop: 10, flexDirection: "row", justifyContent: "center" },
          ]}
        >
          <Block style={{ padding: 10 }}>
           {
            <Block center style={{marginTop:10}}>
              {
                showOTP ?
                <LottieView
                style={styles.lottie}
                source={require("../../assets/Animations/Animation - 1712298978315.json")}
                autoPlay
                loop
              />
              :
              <LottieView
              style={styles.lottie}
              source={require("../../assets/Animations/Animation - 1712035403480.json")}
              autoPlay
              loop
            />
              }
           
          </Block>
           } 



            {showOTP ? (
              <View
              style={{
                padding: 20,
                justifyContent: "center",
                width: width,
              
              
              }}
              >
                <Text style={{fontSize:16,color:"grey"}}>
                  Please Enter Your
                </Text>
                <Text style={{ fontSize: 27,letterSpacing:1,color:"grey"  }}>
                {loading ? 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large"  color="#EA6C13" />
        </View>
        :
        "4 Digit Pin"
      }
                 
                  
                  
                  </Text>
                {/* <Text
                   style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "grey",
                    marginTop: 7,
                    letterSpacing:1,
                    marginLeft:2,
                    marginTop:10
                  }}
                >
                  OTP Sent to  <Text style={{color:"#EA6C13"}}>
                  +91 {formData.phoneNumber}
                    </Text>
                </Text> */}
              
                <Block
                  style={[
                    styles.Space_Between,
                    { width: "95%", marginTop: 20 },
                  ]}
                >
                  <Block style={{ flex: 1 }}>
                    <OTPInput length={4} onComplete={handleOtpFill} />
                  </Block>
                </Block>

                <Block style={{ marginLeft:0 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "400",
                      marginTop: 20,
                      color: "#BDBDBD",
                    }}
                  >
                   
                    {/* <Text style={{ color: "#EA6C13", fontWeight: 500 }}>
                      Resend OTP
                    </Text> */}
                  </Text>
                </Block>
              </View>
            ) : (
              <View
                style={{
                  padding: 20,
                  justifyContent: "center",
                  width: width,
                  marginTop: 35,
                
                }}
              >
                <Text style={{ fontSize: 17,letterSpacing:1,color:"#586B90" }}>
                {loading ? 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large"  color="#65be34" />
        </View>
        :
        "Please Enter Your"
      }
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    
                    color: "#586B90",
                    marginTop: 2,
                    letterSpacing:1
                  }}
                >
                  Mobile Number 
                </Text>

                <Block style={[{marginTop:30}]}>
                {/* <Input

        variant="outlined"
        keyboardType="numeric"
        label="Mobile Number"
        leading={(props) => <Icon name={isFocused ? 'phone' : 'account'} {...props} />}
        value={formData.phoneNumber}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
       
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:20,letterSpacing:3 }}
        start={{borderRadius:30}}
        
      /> */}
      <Input 
      keyboardType="numeric"
       left
       icon="phone"
       family="Feather"
       iconSize={24}
       value={formData.phoneNumber}
       onChangeText={(text) => handleInputChange("phoneNumber", text)}
      placeholder="   +91  xxx  xxx  xxx" 
      style={{height:60,backgroundColor:"#A8B6D140",borderColor:"#A8B6D140",letterSpacing:2}}
      />
                </Block>
      
              </View>
            )}

            <Block center style={[{  marginTop: 10 }]}>
              {showOTP ? (
                // <Button
                //   title="Proceed"
                //   color="#65be34"
                //   style={{ width: 150, padding: 5 }}
                //   onPress={handelOtpComplete}
                //   trailing={(props) => <Icon name="send" {...props} />}
                //   tintColor="#fff"
                //   disabled={loading}
                // />
                <CustomButton onPress={handelOtpComplete} title="Verify" disabled={loading} />
              ) : (
                // <Button
                //   title="Get Otp"
                //   color="#EA6C13"
                //   style={{ width:width*0.8, padding: 5,height:60 }}
                //   onPress={handelMobileNumber}
                //   trailing={(props) => <Icon name="send" {...props} />}
                //   tintColor="#fff"
                // />
                <CustomButton onPress={handelMobileNumber} title="Get OTP" />
              )}
            </Block>
          </Block>
        </View>
      </ScrollView>
      {
        showOTP ?
        !isKeyboardOpen && <Block center style={styles.bottomBlock}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            marginTop: 30,
            color: "#BDBDBD",
          }}
        >
          By proceeding you agree to our {" "}
          <Text
            onPress={handelNewUser}
            style={{ color: "#EA6C13", fontWeight: 500 }}
          >
            Privacy Policy
          </Text>
      
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            marginTop: 3,
            color: "#BDBDBD",
          }}
        >
           and {" "}
          <Text
            onPress={handelNewUser}
            style={{ color: "#EA6C13", fontWeight: 500 }}
          >
            Term & Conditions
          </Text>
        </Text>
      </Block>
      :
      !isKeyboardOpen && <Block center style={styles.bottomBlock}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginTop: 30,
          color: "#BDBDBD",
        }}
      >
        <Text style={{color:"#EA6C13"}}>
        Made {" "}
        </Text>
        In {" "}
        <Text style={{color:"green"}}>
        India
        </Text>
    
      </Text>
     
    </Block>
      }
   
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
    justifyContent: 'center',
    alignItems: 'center',
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
