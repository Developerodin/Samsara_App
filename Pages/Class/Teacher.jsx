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
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import YoutubePlayer from "../../Components/VideoPlayer/YoutubePlayer";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import CustomButton from "../../Components/Buttons/CustomButton";
import { MemberShipModel } from "../../Components/Model/MemberShipModel";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
export const Teacher = ({ route }) => {
  const { teacherId } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const stars = Array.from({ length: 5 }, (v, i) => (
    <AntDesign key={i} name="star" size={18} color="green" />
  ));
  const youtubeVideoUrl = 'https://youtu.be/QkYmX6FQOn4?feature=shared';
  const handelComplete = () => {};

  const handelMembershipModel = () => {
    setModalVisible(true);
  };
  const handelBookSession = ()=>{
    navigation.navigate("Book Session", { teacherId: teacherData._id })
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_url}api/teacher/${teacherId}`);

      if (response.status === 200) {
        setTeacherData(response.data.data.teacher);
      } else {
        console.error('Error fetching data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
   
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
     <Block style={{padding:15}}>

          
          <Block>

            <Block >
                 
            <LinearGradient
      colors={['#a9d2fe', '#000000']}
      locations={[0.3, 0.91]}
       style={[{backgroundColor:"#a9d2fe",height:200,borderRadius:20}]} >
             
             
             <Block center style={{position:"absolute",bottom:0}}>
             <Image   source={require('../../assets/Images/CardImg.png')} />
             </Block>

          

             <Block style={{padding:10,position:"absolute",bottom:0,width:"100%"}}>
              <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  
                  <Block>
                  <Text style={{fontSize:20,color:"rgba(255, 255, 255, 1)",fontWeight:600}}> {teacherData && teacherData.name}</Text>
                   
                   <Block style={{marginTop:5,flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                    <Block style={{borderRadius:20,padding:6,width:65,flexDirection:"row",justifyContent:"space-around",alignItems:"center",backgroundColor:"#DEFFE9"}}>
                    <Octicons name="star-fill" size={12} color="#1CBC52" />
                    <Text style={{fontSize:14,color:"#1CBC52"}}>4.3</Text>
                    </Block>

                    <Text style={{marginLeft:10,color:"#fff",fontSize:14}}>98 Reviews</Text>
                   </Block>
                  </Block>

                  <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:20,backgroundColor:"#667f99",padding:6,borderColor:"#667f99",borderWidth:1}}>
                  <Octicons name="star-fill" size={16} color="#fff" />
                   <Text style={{marginLeft:5,color:"#fff"}}>Feedback</Text>
                  </Block>
              </Block>
                
             </Block>
             
      </LinearGradient>

            </Block>
             
             <Block style={{padding:5,marginTop:20}}>
            
              <Text style={{fontSize:15,color:"#787878"}}>
              Meet Sarah, a passionate yoga teacher dedicated to guiding students on their journey 
              to wellness and self-discovery.
            
              </Text>
              <Text style={{fontSize:15,color:"#787878",marginTop:10}}>
              With years of experience 
              and a nurturing approach, Sarah creates a supportive environment where students can
               explore the transformative power of yoga.
              </Text>

              <Text style={{fontSize:15,color:"#787878",marginTop:10}}>
              Join her for classes that inspire, empower, 
               and uplift.
              </Text>
             </Block>
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

            
       <Block style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",padding:10,marginBottom:10}}>
    

    
      <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
        <Block >
          <Text style={{fontSize:40,color:"#EA6C13"}}>3</Text>
        </Block>
        <Block style={{marginLeft:6}}>
          <Text style={{color:"#787878",fontSize:14}}>Years</Text>
          <Text style={{fontSize:18}}>Teaching Yoga</Text>
        </Block>
      </Block>

      <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
        <Block >
          <Text style={{fontSize:40,color:"#EA6C13"}}>4</Text>
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

    <Block style={{padding:20}}>

        <Block >
          <Block style={[{marginTop:10,flexDirection:"row",alignItems:"center"}]}>
               

          <Block style={{marginRight:20}} >
          <MaterialCommunityIcons name="certificate-outline" size={26} color="#EA6C13" /> 
          </Block>
          <Block style={{width:"90%"}}>
               <Text style={{fontSize:14}}>200 Hours of Yoga Training at Simartha College of Arts ,Pune</Text>
          </Block>

          </Block>

          <Block style={[{marginTop:20,flexDirection:"row",alignItems:"center"}]}>
               

          <Block style={{marginRight:20}} >
          <MaterialCommunityIcons name="certificate-outline" size={26} color="#EA6C13" /> 
          </Block>
          <Block style={{width:"90%"}}>
          <Text style={{fontSize:14}}>200 Hours of Yoga Training at Simartha College of Arts ,Pune</Text>
          </Block>

          </Block>

          <Block style={[{marginTop:20,flexDirection:"row",alignItems:"center"}]}>
               

          <Block style={{marginRight:20}} >
          <MaterialCommunityIcons name="certificate-outline" size={26} color="#EA6C13" /> 
          </Block>
          <Block style={{width:"90%"}}>
          <Text style={{fontSize:14}}>200 Hours of Yoga Training at Simartha College of Arts ,Pune</Text>
          </Block>

          </Block>

          <Block style={[{marginTop:20,flexDirection:"row",alignItems:"center"}]}>
               

          <Block style={{marginRight:20}} >
          <MaterialCommunityIcons name="certificate-outline" size={26} color="#EA6C13" /> 
          </Block>
          <Block style={{width:"90%"}}>
          <Text style={{fontSize:14}}>200 Hours of Yoga Training at Simartha College of Arts ,Pune</Text>
          </Block>

          </Block>
           
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
            
            <Block style={{borderWidth:1,backgroundColor:"#eff2f7",borderColor: '#D9E2F2',borderRadius:15,padding:15}}>
                <Text style={{color:"#586B90",fontSize:17}}>Gentle</Text>
            </Block>

            <Block style={{borderWidth:1,backgroundColor:"#eff2f7",borderColor: '#D9E2F2',borderRadius:15,padding:15}}>
                <Text style={{color:"#586B90",fontSize:17}}>Power Yoga</Text>
            </Block>


            <Block style={{borderWidth:1,backgroundColor:"#eff2f7",borderColor: '#D9E2F2',borderRadius:15,padding:15}}>
                <Text style={{color:"#586B90",fontSize:17}}>Calisthenic Yoga</Text>
            </Block>

            <Block style={{borderWidth:1,backgroundColor:"#eff2f7",borderColor: '#D9E2F2',borderRadius:15,padding:15}}>
                <Text style={{color:"#586B90",fontSize:17}}>Meditative Yoga</Text>
            </Block>

            <Block style={{borderWidth:1,backgroundColor:"#eff2f7",borderColor: '#D9E2F2',borderRadius:15,padding:15}}>
                <Text style={{color:"#586B90",fontSize:17}}>Normal</Text>
            </Block>
          

          </Block>

         </Block>

   
       
        {/* <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10,marginTop:20}}>
              
             
                <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                  
                <AntDesign name="star" size={24} color="#EA6C13" />
                   <Text style={{fontSize:20,marginLeft:20}}>Feedbacks</Text>
                </Block>

                <Block >
                  <Text style={{color:"#b2bbcc",fontSize:13}}>98 Reviews</Text>
                </Block>
             

        </Block>
        

        <Block style={{borderWidth:1,backgroundColor:"#fff",marginTop:30,borderColor: '#D9E2F2',borderRadius:22,padding:20}}>
               <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  <Block>
                    <Text style={{fontSize:18,color:"#586B90"}}>Aadil Khan</Text>
                    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:3}}>
                    <AntDesign name="star" size={18}  color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#d9e2f2" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#d9e2f2" />
                    </Block>
                  </Block>

                  <Block>
                  <Text style={{fontSize:14,color:"#586B90"}}>12 Dec 2024</Text>
                  <Block right>
                    <Text style={{fontSize:12,color:"#586B90"}}>Wednesday</Text>
                  </Block>
                  </Block>
               </Block>

               <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:16}}>
    </Block>

               <Block style={{marginTop:10}}>
                <Text style={{marginTop:10 ,color:"#586B90",fontSize:16}}>
                  hii, I have joined mr Pulkket's class on yesterday and it has been a wonderful experience.
                </Text>
                <Text style={{color:"#586B90",fontSize:16}}>
                  I got to know various asspects of my own body , which i was like completely unaware of
                </Text>
               </Block>
        </Block>

        <Block style={{borderWidth:1,backgroundColor:"#fff",marginTop:30,borderColor: '#D9E2F2',borderRadius:22,padding:20}}>
               <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  <Block>
                    <Text style={{fontSize:18,color:"#586B90"}}>Aadil Khan</Text>
                    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:3}}>
                    <AntDesign name="star" size={18}  color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#d9e2f2" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#d9e2f2" />
                    </Block>
                  </Block>

                  <Block>
                  <Text style={{fontSize:14,color:"#586B90"}}>12 Dec 2024</Text>
                  <Block right>
                    <Text style={{fontSize:12,color:"#586B90"}}>Wednesday</Text>
                  </Block>
                  </Block>
               </Block>

               <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:16}}>
    </Block>

               <Block style={{marginTop:10}}>
                <Text style={{marginTop:10 ,color:"#586B90",fontSize:16}}>
                  hii, I have joined mr Pulkket's class on yesterday and it has been a wonderful experience.
                </Text>
                <Text style={{color:"#586B90",fontSize:16}}>
                  I got to know various asspects of my own body , which i was like completely unaware of
                </Text>
               </Block>
        </Block>

        <Block style={{borderWidth:1,backgroundColor:"#fff",marginTop:30,borderColor: '#D9E2F2',borderRadius:22,padding:20}}>
               <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  <Block>
                    <Text style={{fontSize:18,color:"#586B90"}}>Aadil Khan</Text>
                    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:3}}>
                    <AntDesign name="star" size={18}  color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#EA6C13" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#d9e2f2" />
                    <AntDesign name="star" size={18} style={{marginLeft:3}} color="#d9e2f2" />
                    </Block>
                  </Block>

                  <Block>
                  <Text style={{fontSize:14,color:"#586B90"}}>12 Dec 2024</Text>
                  <Block right>
                    <Text style={{fontSize:12,color:"#586B90"}}>Wednesday</Text>
                  </Block>
                  </Block>
               </Block>

               <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:16}}>
    </Block>

               <Block style={{marginTop:10}}>
                <Text style={{marginTop:10 ,color:"#586B90",fontSize:16}}>
                  hii, I have joined mr Pulkket's class on yesterday and it has been a wonderful experience.
                </Text>
                <Text style={{color:"#586B90",fontSize:16}}>
                  I got to know various asspects of my own body , which i was like completely unaware of
                </Text>
               </Block>
        </Block> */}

     </Block>
    
           

      </ScrollView>

      <Block style={{height:80,backgroundColor:"#fff",flexDirection:"row",alignItems:"center",justifyContent:"center",padding:20}}>
         <Block>
         <TouchableOpacity onPress={handelBookSession} style={{height:55, width:160,borderRadius: 20,backgroundColor: '#EA6C13',justifyContent: 'center',alignItems: 'center',}} >
      <Text style={{fontSize:16,color:"white"}}>Book Session</Text>
    </TouchableOpacity>
         </Block>

         {/* <Block>
          <TouchableOpacity style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <AntDesign name="message1" size={18} color="#EA6C13" />
            <Text style={{color:"#EA6C13",marginLeft:5,fontSize:17}}>Message</Text>
          </TouchableOpacity>
         </Block> */}
      </Block>

      <MemberShipModel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handelComplete={handelComplete}
        />
    </View>
  );
};

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
