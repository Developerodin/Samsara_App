import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { ProfileDetailCard } from "../../Components/Cards/ProfileDetailCard";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = () => {

  const [userData,setUserData] = useState(null)
  const [healthIssues,setHealthIssues] = useState([])

  const CardData =[
    {"icon": <MaterialCommunityIcons name="yoga" size={26} color="grey" />,"title":"Date of Birth & Gender","sub1":userData && userData.dob,"sub2":`Gender : ${userData && userData.gender}`,"route":"/details"},
    {"icon": <FontAwesome6 name="hand-holding-medical" size={23} color="grey" />,"title":"Medical history","sub1":"Asthama","sub2":"","route":"/details"},
    {"icon": <MaterialIcons name="sports-gymnastics" size={24} color="grey" />,"title":"My experience with yoga","sub1":"INTERMEDIATE","sub2":"","route":"/details"},
    {"icon": <FontAwesome5 name="calendar-alt" size={24} color="grey" />,"title":"Preferred practice time","sub1":"Afternonn (12pm - 5pm)","sub2":"","route":"/details"}
  ]

  useEffect(()=>{
    const userDetailsFromStorage = async()=>{
      const Details = await AsyncStorage.getItem('userDetails') || null;
      const ParseData = JSON.parse(Details);

      console.log("Parse Data users    ===>",ParseData.data.user)
      const data = ParseData.data.user
      setUserData(data)
      const healthIssuesArray = data && data.health_issues[0].split(',');

      console.log("Health issuess ==>", healthIssuesArray)
      setHealthIssues(healthIssuesArray)

    }
    
    userDetailsFromStorage()
  },[])
  return (
    <View style={styles.container}>
        <ScrollView>
          
          <Block style={{padding:20}}>
              
          <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}} >
            <Block center style={{width:70,height:70}}>
     
                      <Image
                      style={{width:"100%",height:"100%"}}
                    source={require("../../assets/Images/Rectangle 5.png")}
                    
                  />
                   
            </Block>
            <Block style={{marginLeft:20}}>
              <Text style={{fontSize:25}}>{userData && userData.name}</Text>
              <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
              <Feather name="phone" size={20} color="black" />
               <Text style={{color:"#4F4F4F",marginLeft:3}}>+91 {userData && userData.mobile}</Text>
              </Block>
            </Block>
          </Block>

          <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={{fontSize:17,color:"#4F4F4F"}}>Personal Information</Text>

              <TouchableOpacity style={{backgroundColor:"#EDF1F9",borderWidth:1, borderColor: '#D9E2F2',padding:10,width:80,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <Feather name="edit-2" size={14} color="#3F5162" />
                  <Text style={{color:"#3F5162",fontSize:17,marginLeft:3}}>Edit</Text>
              </TouchableOpacity> 
            </Block>

            <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>

            <Block style={{marginTop:25,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
               <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                
               <Image
                      
                    source={require("../../assets/Images/Vector.png")}
                    
                  />
                    <Text style={{fontSize:16,color:"#3E5072",marginLeft:10}}>My Gender</Text>
               </Block>

               <Block left style={{width:"50%"}}>
                 <Text style={{fontSize:20,color:"#3E5072"}}>{userData && userData.gender}</Text>
               </Block>
            </Block>
             
            <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>
             

            <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
               <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                
               <Image
                      
                    source={require("../../assets/Images/guidance_guest-height-limit.png")}
                    
                  />
                    <Text style={{fontSize:16,color:"#3E5072",marginLeft:10}}>My Height</Text>
               </Block>

               <Block style={{width:"50%"}}>
                 <Text style={{fontSize:20,color:"#3E5072"}}>{userData && userData.height}</Text>
               </Block>
            </Block>

            <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>
             

             <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                 
                <Image
                       
                     source={require("../../assets/Images/icon-park-outline_weight.png")}
                     
                   />
                     <Text style={{fontSize:16,color:"#3E5072",marginLeft:10}}>My Weight</Text>
                </Block>
 
                <Block style={{width:"50%"}}>
                  <Text style={{fontSize:20,color:"#3E5072"}}>{userData && userData.weight } Kg</Text>
                </Block>
             </Block>


             <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>
             

             <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                 
                <Image
                       
                     source={require("../../assets/Images/ph_baby-thin.png")}
                     
                   />
                     <Text style={{fontSize:16,color:"#3E5072",marginLeft:10}}>My DOB</Text>
                </Block>
 
                <Block style={{width:"50%"}}>
                  <Text style={{fontSize:20,color:"#3E5072"}}>{userData && userData.dob}</Text>
                </Block>
             </Block>


             <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>
             

             <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"70%"}}>
                <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                 
                <Image
                       
                     source={require("../../assets/Images/material-symbols-light_mail-outline.png")}
                     
                   />
                   <Block>
                   <Text style={{fontSize:14,color:"#3E5072",marginLeft:10}}>Email</Text>
                   <Text style={{fontSize:15,color:"#3E5072",marginLeft:10}}>{userData && userData.email}</Text>
                   </Block>
                    
                </Block>
 
            
             </Block>

             <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>
             

             <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"70%"}}>
                <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                 
                <Image
                       
                     source={require("../../assets/Images/fa-regular_building.png")}
                     
                   />
                   <Block>
                   <Text style={{fontSize:14,color:"#3E5072",marginLeft:10}}>Company Name</Text>
                   <Text style={{fontSize:15,color:"#3E5072",marginLeft:10}}>{userData && userData.company_name && userData.company_name.companyName}</Text>
                   </Block>
                    
                </Block>
 
             
             </Block>

             <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>
             

             <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"70%"}}>
                <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                 
                <Image
                       
                     source={require("../../assets/Images/solar_user-id-outline.png")}
                     
                   />
                   <Block>

                   <Text style={{fontSize:14,color:"#3E5072",marginLeft:10}}>Corporate ID</Text>
                   <Text style={{fontSize:15,color:"#3E5072",marginLeft:10}}>{userData && userData.corporate_id}</Text>
                   </Block>
                   
                </Block>
 
                
             </Block>
         

             <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:10}}></Block>

          </Block>



          <Block style={{marginTop:30}}>

            <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
            <Image
                      
                    source={require("../../assets/Images/solar_health-outline.png")}
                    
                  />

                  <Text style={{fontSize:18,color:"#3E5072",marginLeft:10}}>Health Issues</Text>
            </Block>


            <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",flexWrap:"wrap",gap:20,marginTop:30}}>
                
              {
                healthIssues && healthIssues.map((el,index)=>{
                  return   <Block key={index} style={{borderWidth:1,backgroundColor:"#eff2f7",borderColor: '#D9E2F2',borderRadius:5,padding:7}}>
                  <Text style={{color:"#586B90",fontSize:15}}>{el}</Text>
              </Block>
                })
              }


           

           
          

          </Block>




          </Block>


          <Block style={{marginTop:30}}>
          <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
           

                  <Text style={{fontSize:18,color:"#3E5072"}}>Medical History</Text>
            </Block>

            <Block style={{marginTop:5}}>
              <Text style={{fontSize:14,color:"#3E5072"}}>{userData && userData.description}</Text>
            </Block>
          </Block>

          <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:30}}></Block>
              
              <Block style={{marginTop:30}}>
              <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
          
              <FontAwesome6 name="address-book" size={20} color="#3E5072" />
                  <Text style={{fontSize:18,color:"#3E5072",marginLeft:10}}>Address</Text>
            </Block>


            <Block>
              
              <Block style={{padding:15,borderWidth:1,marginTop:20,borderColor:"#D9E2F2",borderRadius:10}}>
                <Text style={{color:"#3E5072"}}>{userData && userData.Address}</Text>
              </Block>

              <Block style={{padding:15,borderWidth:1,marginTop:10,borderColor:"#D9E2F2",borderRadius:10}}>
                <Text style={{color:"#3E5072"}}>Address Line 2</Text>
              </Block>
              
              <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                   
              <Block style={{width:"45%",padding:15,borderWidth:1,marginTop:10,borderColor:"#D9E2F2",borderRadius:10}}>
                <Text style={{color:"#3E5072"}}>{userData && userData.city}</Text>
              </Block>

              <Block style={{width:"45%",padding:15,borderWidth:1,marginTop:10,borderColor:"#D9E2F2",borderRadius:10}}>
                <Text style={{color:"#3E5072"}}>{userData && userData.country}</Text>
              </Block>


              </Block>


              <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                   
              <Block style={{padding:15,borderWidth:1,marginTop:10,borderColor:"#D9E2F2",borderRadius:10,width:"45%"}}>
                <Text style={{color:"#3E5072"}}>{userData && userData.pincode}</Text>
              </Block>

              <Block style={{padding:15,marginTop:10,borderColor:"#D9E2F2",borderRadius:10,width:"45%"}}>
                
              </Block>


              </Block>
                 
              

              
              

            </Block>
              </Block>
       

          </Block>
         
          
       
       
        </ScrollView>
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