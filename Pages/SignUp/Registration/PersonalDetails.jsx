import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../../Images/Logo_1.png";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
// import { Base_url } from '../../../Config/BaseUrl';
import { ToastAndroid } from "react-native";
import { CategoryAddModel2 } from '../../../Components/Model/CategoryAddModel2';
// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation();

    const HealthIssuesData= [
      {name:"Neck and Shoulder"},
      {name:"Lower Back"},
      {name:"Frozen Shoulder"},
      {name:"Diabetic"},
      {name:"Knee Problem"},
      {name:"PCOS & PCOD"},
      {name:"Thyroid"},
      {name:"Gastric & Constipations"},
      {name:"Insomnia"},
      {name:"Varicos Vein"},
      {name:"High BP"},
      {name:"Low Bp"},
      {name:"Anxiety"},
      {name:"Depression"},
      {name:"Breathless"},
      {name:"Dizziness"},
      {name:"Sciatica"},
      {name:"Morning Sickness"},
      {name:"Oedema (Swelling Joints)"},
      {name:"Headache"}
    ]

  const initalFormData ={
    gender:"",
    pincode:"",
    email: "",
    name:"",
    city:"",
    category:"",
    address:"",
    country:"",
    companyName:"",
    employeeId:"",
    height:"",
    weight:"",
    password:"",
    description:"",
    priorExperience:"",
    howKnowus:""
  }

    const [formData, setFormData] = useState(initalFormData);
    const [UserCategoryData, setUserCategoryData] = useState(HealthIssuesData);
    const [yogainformationshow,setYogaInformation] = useState(false)
    const [ catmodalVisible,setcatModalVisible] = useState(false);
    const [updatedCategoriesData,setUpdatedCategoriesData] = useState(HealthIssuesData)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [CategoriesData, setCategoriesData] = useState(HealthIssuesData);
    // const [selectedHealthIssues, setSelectedHealthIssues] = useState([]);
    const [isFocused, setIsFocused] = useState({
      ForName:false,
      ForEmail:false,
      ForCity:false
    });
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const customStyle ={
      Card1: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForName ? 4 : 0
      },
      Card2: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForEmail ? 4 : 0
      },
      Card3: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForCity ? 4 : 0
      },
    }

    const savePersonalDetails = async () => {
      try {
        // You can use any key you like to store the authentication status
        const key = 'Details';
        const value = JSON.stringify(formData) // Replace with your actual authentication status
    
        // Use AsyncStorage to save the authentication status
        await AsyncStorage.setItem(key, value);
        console.log('Details saved successfully.');
      } catch (error) {
        console.error('Error saving Details :', error);
      }
    };
    const handelPersonalDetailSubmit=()=>{
      const emptyField = Object.keys(formData).find(key => formData[key] === "");

      if (emptyField) {
        ToastAndroid.show(`Please provide ${emptyField}`, ToastAndroid.SHORT);
        return ;
      }
        // setShowShopDetails(true);
        console.log("Details",formData);
        savePersonalDetails()
        navigation.navigate("Signup Status")
    }
    const handelCatSelectComplete = async()=>{

      if(selectedCategories && selectedCategories.length>0){
       
          const Data = selectedCategories.map(category => {
            return {
              name:category.name, 
            }
          });
          console.log("Helth Issues After Select",Data)
          const UpdatedData = JSON.stringify(Data);
          setSelectedCategories(Data);
        // setupdate((prev) => prev + 1);
            setcatModalVisible(false)
          // try {
          //   const response = await axios.post(
          //     `${Base_url}api/b2b/${userDetails._id}/addCategories`,{
          //      Data : UpdatedData
          //     }
              
          //   );
          //   setupdate((prev) => prev + 1);
          //   setcatModalVisible(false)
          //   return response.data;
          // } catch (error) {
          //   console.error("Error adding category:", error);
          //   throw error;
          // }
      
      }
      
      
    }

    const ToggelNext = ()=>{
      console.log("Toogel Next ==>",yogainformationshow)
      setYogaInformation(!yogainformationshow)
    }

    const handleInputChange = (fieldName, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    };
    const handelBack = () => {
      navigation.navigate("Login")
    };
    // const getCategories = async () => {
      
    //   try {
    //     const response = await axios.get(`${Base_url}api/category`);
    //     setCategoriesData(response.data);
    //     console.log("Categories all", response.data)
    //     return response.data;
    //   } catch (error) {
    //     throw error.response.data;
    //   }
    // };

    const handelCategoryModelOpen=()=>{

      const newCategoriesData = CategoriesData.filter(
        (category) => !UserCategoryData.some((userCategory) => userCategory.name === category.name)
      );
      setUpdatedCategoriesData(newCategoriesData)
        // console.log("CategoryUpdatedData",newCategoriesData)
     
      setcatModalVisible(true)
    }

    const handelPrevious = ()=>{
      ToggelNext();
    }

    const handelSubmit = () =>{
      console.log("Submit Data ==> ",formData)
    }
    
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

    // useEffect(()=>{
    //   getCategories()
    // },[])
  return (
    <View style={styles.container}>
    <StatusBar style="dark" />
  
        <ScrollView>
      
       <View style={{alignItems:"left",marginTop:35,width:width}}>
         
       {!isKeyboardOpen &&
         <Block>
           {
             yogainformationshow ?
             <AntDesign
                onPress={handelPrevious}
                name="arrowleft"
                size={30}
                color="grey"
                style={{ marginLeft: 20 }}
              />
              :
              <AntDesign
                onPress={handelBack}
                name="arrowleft"
                size={30}
                color="grey"
                style={{ marginLeft: 20 }}
              /> 
           }
              
            
          </Block>
}
   
       </View>

        <Block style={{padding:10}}>

        

        {
          !yogainformationshow &&  
          <Block >
<Block style={{marginTop:20,padding:10}}>
<Block style={[{borderBottomWidth:1,borderColor:"grey",flexDirection:"row",alignItems:"center"}]}>
  <Block style={{width:"6%"}}>
  <MaterialIcons name="category" size={24} color="grey" />
  </Block>
<Block style={{width:"95%"}} >
<Picker
          selectedValue={formData.category}
          onValueChange={(itemValue) => handleInputChange('category', itemValue)}
          style={{ color: 'black', height: 50, fontSize: 18 }}
        >
          <Picker.Item label="Select Category" value="" />
           <Picker.Item  label={"Personal"} value={"Personal"} />
           <Picker.Item  label={"Corporate"} value={"Corporate"} />
           {/* <Picker.Item  label={"Teacher"} value={"Teacher"} /> */}
         
          
        </Picker>
</Block>

                </Block>
            
        </Block>
          <Block style={{marginTop:20}}>
  <Block style={[ customStyle.Card1]}>
                  <TextInput
  
          variant="standard"
          
          label="Name"
          leading={(props) => <Icon name={'account'} {...props} />}
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
              
          </Block>
  
          <Block style={{marginTop:10,padding:10}}>
  <Block style={[{borderBottomWidth:1,borderColor:"grey",flexDirection:"row",alignItems:"center"}]}>
    <Block style={{width:"6%"}}>
    <MaterialCommunityIcons name="gender-male" size={24} color="grey" />
    </Block>
  <Block style={{width:"95%"}} >
  <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
            style={{ color: 'black', height: 50, fontSize: 18 }}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
  </Block>
  
                  </Block>
              
          </Block>

{
  formData.category === "Corporate" && 
  <Block style={{marginTop:20}}>
  <Block style={[ customStyle.Card1]}>
                  <TextInput
  
          variant="standard"
          label="Company Name"
          leading={(props) =>  <FontAwesome name="building-o" {...props} />}
          value={formData.companyName}
          onChangeText={(text) => handleInputChange("companyName", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
              
          </Block>
}

{
  formData.category === "Corporate" && 
   <Block style={{marginTop:20}}>
  <Block style={[ customStyle.Card1]}>
                  <TextInput
  
          variant="standard"
          label="Employee Id"
          leading={(props) =>  <Entypo name="creative-commons-attribution" {...props} />}
          value={formData.employeeId}
          onChangeText={(text) => handleInputChange("employeeId", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
              
          </Block>
}
          

         
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3]}>
                  <TextInput
  
          variant="standard"
          keyboardType="default"
          label="Height"
          leading={(props) => <MaterialCommunityIcons name="human-male-height" {...props} />}
          value={formData.height}
          onChangeText={(text) => handleInputChange("height", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3]}>
                  <TextInput
  
          variant="standard"
          keyboardType="default"
          label="Weight"
          leading={(props) => <FontAwesome5 name="weight" {...props}/>}
          value={formData.weight}
          onChangeText={(text) => handleInputChange("weight", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card2]}>
                  <TextInput
  
          variant="standard"
          keyboardType="email-address"
          label="Email"
          leading={(props) => <Icon name={'email'} {...props} />}
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3]}>
                  <TextInput
  
          variant="standard"
          keyboardType="default"
          label="Password"
          leading={(props) =>  <Feather name="lock" {...props} />}
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
  
  
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3]}>
                  <TextInput
  
          variant="standard"
          keyboardType="default"
          label="Address"
          leading={(props) =>  <FontAwesome5 name="address-book" {...props} />}
          value={formData.address}
          onChangeText={(text) => handleInputChange("address", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3]}>
          <TextInput
  
  variant="standard"
  keyboardType="default"
  label="City"
  leading={(props) => <Icon name={ 'city'} {...props} />}
  value={formData.city}
  onChangeText={(text) => handleInputChange("city", text)}
  color={ 'grey'}
  inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
  // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
  
  />
                  </Block>
          </Block>
         
  
          <Block style={[{marginTop:20},styles.Space_Between]}>
      
          <Block style={[ customStyle.Card3,{width:"48%"}]}>
                  <TextInput
  
          variant="standard"
          keyboardType="numeric"
          label="Pin Code"
          leading={(props) =>  <Ionicons name="location-outline" {...props} />}
          value={formData.pincode}
          onChangeText={(text) => handleInputChange("pincode", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
        
         
          <Block style={[ customStyle.Card3,{width:"48%"}]}>
                  <TextInput
  
          variant="standard"
          keyboardType="default"
          label="Country"
          leading={(props) => <AntDesign name="flag" {...props}  /> }
          value={formData.country}
          onChangeText={(text) => handleInputChange("country", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
         
          </Block>
  
  
          </Block>
        }
        
        {
          yogainformationshow &&  
          <Block >

<TouchableOpacity onPress={handelCategoryModelOpen} style={[{marginRight:10}]}>
          {/* <Ionicons name="add-circle-outline" size={24} color="teal" /> */}
        
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3,{flexDirection:"row",borderBottomWidth:1,borderColor:"grey"}]}>
          <MaterialIcons name="health-and-safety" size={24} color="grey" />

          <Block style={{marginLeft:10}} >
            <Text>
              {
                selectedCategories.length > 0 ? selectedCategories.map((el,index)=>{
                  return el.name+ " , "
                })
                :
                "Select Health Issues"
              }
            </Text>
          </Block>
                  </Block>
          </Block>
          </TouchableOpacity>

          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3]}>
                  <TextInput
  
          variant="standard"
          keyboardType="default"
          label="Description"
          leading={(props) => <MaterialIcons name="details" {...props} />}
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card3]}>
                  <TextInput
  
          variant="standard"
          keyboardType="default"
          label="Prior yoga experience"
          leading={(props) => <MaterialCommunityIcons  name="yoga" {...props}/>}
          value={formData.priorExperience}
          onChangeText={(text) => handleInputChange("priorExperience", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
          <Block style={{marginTop:20}}>
          <Block style={[ customStyle.Card2]}>
                  <TextInput
  
          variant="standard"
          label="How did you get to know about us"
          leading={(props) => <AntDesign name="questioncircleo" {...props} />}
          value={formData.howKnowus}
          onChangeText={(text) => handleInputChange("howKnowus", text)}
          color={ 'grey'}
          inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
          // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
          
        />
                  </Block>
          </Block>
  
  
         
  
  
          </Block>
        }

     

       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 20 }]}>
             
             {
              yogainformationshow ? 
              <Button
                  title="Submit"
                  color="#65be34"
                  style={{ width: 150, padding: 5 }}
                  onPress={handelSubmit}
                  trailing={(props) => <Icon name="send" {...props} />}
                  tintColor="#fff"
                />
                :
                <Button
                  title="Next"
                  color="#65be34"
                  style={{ width: 150, padding: 5 }}
                  onPress={ToggelNext}
                  trailing={(props) => <Icon name="send" {...props} />}
                  tintColor="#fff"
                />
             }
                
              
            </Block>
      
            <CategoryAddModel2
            modalVisible={catmodalVisible} 
            setModalVisible={setcatModalVisible} 
            categoriesData={HealthIssuesData}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
            handelComplete={handelCatSelectComplete}
            />
      
       </ScrollView>
       </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
    },
    lottie: {
      width: width * 0.9,
      height: width * 0.5,
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
