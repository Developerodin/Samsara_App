import React, { useDebugValue, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View,Dimensions, ImageBackground, TouchableOpacity, ToastAndroid, Image} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export const ClassDescription = () => {
  const navigation= useNavigation();
    const route = useRoute();
    const [classData,setClassData] = useState(null);
    const [teacherData,setTeacherData] = useState(null)
    const [userData, setUserData] = useState(null);
  const { value } = route.params;
  const handelBack = () => {
    navigation.goBack()
  };
  const [selectedClasses, setSelectedClasses] = useState([]);

  const classes = [
    { id: 1, date: 'Fri 26th January', time: '4:30 PM IST', instructor: 'Shweta Jain' },
    { id: 2, date: 'Fri 29th January', time: '4:30 PM IST', instructor: 'Shweta Jain' },
    { id: 3, date: 'Fri 31th January', time: '4:30 PM IST', instructor: 'Shweta Jain' },
    // Add more classes as needed
  ];

  const handleClassSelection = (classId) => {
    const isSelected = selectedClasses.includes(classId);

    if (isSelected) {
      // If the class is already selected, remove it from the selectedClasses array
      setSelectedClasses(selectedClasses.filter((id) => id !== classId));
    } else {
      // If the class is not selected, add it to the selectedClasses array
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  const getClasse = async (id) => {
    // setIsLoading(true);
    try {
      const response = await axios.get(`${Base_url}api/classes/${id}`); // Update the API endpoint accordingly

      const Data = response.data.data;
      // setIsLoading(false);
      if (Data) {
       console.log("Data ==>",Data)
        
        setClassData(Data);
        setTeacherData(Data.teacher);
      }
    } catch (error) {
      // setIsLoading(false);
      console.error("Error fetching classes:", error.message);
    }
  };

  const handelWebZommClassClick = () => {
    console.log("Data details =====>");
    const ZoomMeetingNumber = {
      number: classData.meeting_number,
      pass: classData.password,
      userName: userData && userData.name,
      email: userData && userData.email,
    };

    if (classData.meeting_number) {
      navigation.navigate("ZoomWebView", { ZoomMeetingNumber });
      return;
    }

    ToastAndroid.show("Class Not Available", ToastAndroid.SHORT);
  };

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


  useEffect(()=>{
      console.log("Id",value)
      getClasse(value);
  },[])
 
  return (
    <View style={styles.container}>
    {/* <StatusBar style="dark" /> */}
  
        <ScrollView>
        <ImageBackground
      source={require('../../assets/samsara-app2.jpg')} // Replace 'your_background_image_url' with the actual image URL
      style={{opacity: 0.7,flex: 1, resizeMode: 'cover', alignItems: 'left', marginTop: 15, width: width, height: height * 0.4}}
    >
       
         
        
         <Block style={{backgroundColor: 'rgba(0, 0, 0, 0.7)',flex:1,padding:20 }}>
           
           <Block>
           <AntDesign
                onPress={handelBack}
                name="arrowleft"
                size={30}
                color="#fff"
                
              />
           </Block>


           <Block style={{marginTop:20}}>
            <Text style={{color:"#fff",fontSize:35,fontWeight:600}}>{classData && classData.title}</Text>
           </Block>

           <Block style={{flexDirection:"row",alignItems:"center",marginTop:20}}>
             
             <Block style={{width:100,borderRadius:10,backgroundColor:"#fff",flexDirection:"row",alignItems:"center",padding:5,justifyContent:"center"}}>
             <MaterialCommunityIcons name="yoga" size={20} color="black" />
             <Text style={{fontSize:16,fontWeight:600,marginLeft:5}}>Hatha</Text>
             </Block>

             <Block style={{width:160,borderRadius:10,backgroundColor:"#fff",flexDirection:"row",alignItems:"center",padding:5,justifyContent:"center",marginLeft:20}}>
             <Entypo name="bar-graph" size={20} color="black" />
             <Text style={{fontSize:16,fontWeight:600,marginLeft:5}}>Intermediate</Text>
             </Block>

           </Block>

           <Block style={{marginTop:20,flexDirection:"row",alignItems:"center",justifyContent:"space-between",alignItems:"center"}}>
           <Block >
            <Block>
              <Block style={{flexDirection:"row",alignItems:"center"}}>
              <FontAwesome name="star" size={24} color="green" />
              <FontAwesome name="star" size={24} color="green" style={{marginLeft:5}}/>
              <FontAwesome name="star" size={24} color="green" style={{marginLeft:5}}/>
              <FontAwesome name="star" size={24} color="green" style={{marginLeft:5}}/>
              <FontAwesome name="star" size={24} color="green" style={{marginLeft:5}}/>
              </Block>
            </Block>

            <Block>
              <Text style={{color:"#fff",marginTop:10,fontWeight:700}}>4.9 from 1574 reviews</Text>
            </Block>
           </Block>

           {/* <Block>
              <Button color='orange' size={"small"}>Share</Button>
           </Block> */}
           </Block>

          
              
            
          </Block>

   
      </ImageBackground>
       
          <Block style={{padding:20}}>
          <Text style={{fontSize:22,fontWeight:700}}>About Group Class</Text>

           <Block style={{backgroundColor:"#fff",borderWidth:1,borderColor:"#E4E4E4",borderRadius:5,padding:15,marginTop:10}}>
             
             <Block>
             <Text style={{fontSize:16,color:"grey",lineHeight:23}}>
             {classData && classData.description}
                </Text>
             </Block>

              
           </Block>


             
       

            

          </Block>

          <Block style={{padding:20}}>
          <Text style={{fontSize:22,fontWeight:700}}>About {teacherData && teacherData.name}</Text>

           <Block style={{marginTop:10}}>
            
             <Block style={{marginTop:10}}>
             <Text style={{fontSize:16,color:"grey",lineHeight:23}}>
             {teacherData && teacherData.description}
                </Text>
             </Block>

             <Block style={{borderWidth:1,backgroundColor:"#fff",borderColor: '#D9E2F2',borderRadius:20,marginTop:30}}>
     <LinearGradient 
            colors={['rgba(255, 240, 229, 1)', 'rgba(254, 242, 234, 0)']}
             style={{flexDirection:"row",justifyContent:"left",alignItems:"center",padding:20,borderRadius:20}}>
              <Image
                    source={require("../../assets/Images/healthicons_exercise-yoga-outline.png")}
                    
                  />
              <Text style={{fontSize:24,marginLeft:10}}>Experience</Text>
             </LinearGradient>

            
       <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",padding:10,marginBottom:10}}>
    

    
      <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginLeft:10}}>
        <Block >
          <Text style={{fontSize:40,color:"#EA6C13"}}> {teacherData && teacherData.teachingExperience}</Text>
        </Block>
        <Block style={{marginLeft:6}}>
          <Text style={{color:"#787878",fontSize:14}}>Years</Text>
          <Text style={{fontSize:18}}>Teaching Yoga</Text>
        </Block>
      </Block>

      

        </Block>


       </Block>
  
  <Block style={{borderWidth:1,backgroundColor:"#fff",marginTop:30,borderColor: '#D9E2F2',borderRadius:22 }}>
           
  <LinearGradient 
            colors={['rgba(255, 240, 229, 1)', 'rgba(254, 242, 234, 0)']}
             style={{flexDirection:"row",justifyContent:"left",alignItems:"center",padding:20,borderRadius:20}}>
              <Ionicons name="trophy-outline" size={24} color="#EA6C13" />
              <Text style={{fontSize:24,marginLeft:10}}>Certifications</Text>
             </LinearGradient>

    <Block style={{padding:20,paddingTop:0}}>

        <Block >
          {
            teacherData && teacherData.qualification && teacherData.qualification.map((el,key)=>{
              if(el.label === "Courses" || el.label === "Course"){
                return <Block style={[{marginTop:20,flexDirection:"row",alignItems:"center"}]}>
               

                <Block style={{marginRight:20}} >
                <MaterialCommunityIcons name="certificate-outline" size={26} color="#EA6C13" /> 
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontSize:14}}>{el.value}</Text>
                </Block>
      
                </Block>
              }
             
            })
          }
          {
            teacherData && teacherData.additional_courses && teacherData.additional_courses.map((el,key)=>{
              if(el.label === "Courses" || el.label === "Course"  ){
                return <Block style={[{marginTop:20,flexDirection:"row",alignItems:"center"}]}>
               

                <Block style={{marginRight:20}} >
                <MaterialCommunityIcons name="certificate-outline" size={26} color="#EA6C13" /> 
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontSize:14}}>{el.value}</Text>
                </Block>
      
                </Block>
              }
             
            })
          }
          

         
           
        </Block>

    </Block>

       

      </Block>




      

    

         <Block style={{borderWidth:1,backgroundColor:"#fff",marginTop:30,borderColor: '#D9E2F2',borderRadius:22,padding:20}}> 
          <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
              
              <Block>
              <FontAwesome5 name="chalkboard-teacher" size={20} color="#586B90" />
              </Block>
              
               <Block style={{marginLeft:20}}>
                <Text style={{fontSize:19,color:"#586B90"}}>Teaching Styles(s)</Text>
               </Block>
          </Block>


          <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",flexWrap:"wrap",gap:20,marginTop:30}}>
            
          {teacherData && teacherData.expertise && teacherData.expertise.map((el,index)=>{
              return  <Block key={index} style={{borderWidth:1,backgroundColor:"#eff2f7",borderColor: '#D9E2F2',borderRadius:15,padding:15}}>
              <Text style={{color:"#586B90",fontSize:17}}>{el}</Text>
          </Block>
          })
        }

            

         

          </Block>

         </Block>

              
           </Block>


             
       

            

          </Block>
      
        
      
   
      
       </ScrollView>
 <Block style={[styles.Center,{height:120,backgroundColor:"#fff"}]}>
  <Block center >
           <Button onPress={handelWebZommClassClick}  style={{width:width*0.9,backgroundColor:"#FC6736",height:50}}>
             <Text style={{letterSpacing:1,color:"#fff",fontWeight:600,fontSize:17}}>Join Class</Text>
             
             </Button>
          </Block>
</Block>

       
       </View>
  )
}
 

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#f1f1f1"
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