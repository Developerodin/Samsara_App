import React, { useState } from "react";
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
export const Teacher = () => {
  const navigation = useNavigation();
  const stars = Array.from({ length: 5 }, (v, i) => (
    <AntDesign key={i} name="star" size={18} color="green" />
  ));
  const youtubeVideoUrl = 'https://youtu.be/QkYmX6FQOn4?feature=shared';
  return (
    <View style={styles.container}>
      <ScrollView>
        <Block>
        

          <Block
            style={{
              backgroundColor: "#fff",
              borderColor: "#E4E4E4",
              borderRadius: 5,
              padding: 15,
              marginTop: 10,
            }}
          >

            <Block
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
               
                padding:0,
                marginBottom:20,
                
              }}
            >
              <Block>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={require("../../assets/Samsra-app.jpg")}
                />
                
                <Block style={{marginTop:20}}>
                <Text style={{fontWeight:600,fontSize:20,letterSpacing:1}}>Mansi Dwivedi</Text>
                <Text style={{fontWeight:600,fontSize:13,color:"grey",marginTop:2}}>Available for a session today</Text>
                </Block>

                <Block style={{marginTop:10}} >
           <Button  style={{backgroundColor:"#FC6736",height:50,margin:0}}>
             <Text style={{letterSpacing:1,color:"#fff",fontWeight:600,fontSize:17}}>Book Session</Text>
             
             </Button>
          </Block>
                
              </Block>

              <Block>
              <Block
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green",
                    width: 50,
                    padding: 5,
                    borderRadius: 7,
                  }}
                >
                  <AntDesign name="star" size={16} color="#fff" />
                  <Text style={{ marginLeft: 3, color: "#fff" }}>4.9</Text>
                </Block>
                <Text style={{ fontSize: 12, color: "grey", letterSpacing: 1, marginTop:10 }}>
                  from 97 Reviews{" "}
                </Text>

               
              </Block>

              <Block></Block>
            </Block>



          <Block style={{height:200,borderWidth:1,borderColor: "#E4E4E4",}}>
          <YoutubePlayer videoUrl={youtubeVideoUrl} />
            </Block>

          


          </Block>
        </Block>
        
        <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>

              <Block>
                <Text style={{ color: "black", fontWeight: 600, fontSize: 14 }}>
                 I help my students:
                </Text>
              </Block>


              <Block style={{ marginTop: 5 }}>
                <Block style={[{marginTop:10,flexDirection:"row",alignItems:"center"}]}>
                     

                <Block style={{marginRight:10}} >
                <AntDesign name="checkcircle" size={24} color="#FC6736" />
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontWeight:600}}>Heal from a medical condition like pain or injury</Text>
                </Block>

                </Block>

                <Block style={[{marginTop:10,flexDirection:"row",alignItems:"center"}]}>
                     

                <Block style={{marginRight:10}} >
                <AntDesign name="checkcircle" size={24} color="#FC6736" />
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontWeight:600}}>Increase strength and flexibility</Text>
                </Block>

                </Block>

                <Block style={[{marginTop:10,flexDirection:"row",alignItems:"center"}]}>
                     

                <Block style={{marginRight:10}} >
                <AntDesign name="checkcircle" size={24} color="#FC6736" />
                </Block>
                <Block style={{width:"90%"}}>
                     <Text style={{fontWeight:600}}>Ease stress and boost mental health</Text>
                </Block>

                </Block>
                 
              </Block>

            </Block>

            <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>

             <Block>
                <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                <FontAwesome name="user-circle" size={24} style={{color:"#C499F3"}} />
                <Text style={{marginLeft:10,fontWeight:600}}>About Me</Text>
                </Block>
             </Block>

             <Block>
              <Block style={{marginTop:10}}>
                <Text style={{color:"#FC6736",fontWeight:600}}>Friendly and always happy to help</Text>
              </Block>

              <Block center style={{marginTop:10}}>
                <Text style={{letterSpacing:1,lineHeight:20}}>With over three years of dedicated practice and expertise in the transformative realm of yoga, I am a passionate and experienced yoga teacher committed to guiding individuals on their wellness journey. My journey into the world of yoga began with a deep personal exploration, and it has evolved into a mission to share the profound benefits with others.
           participating in numerous workshops that have enriched my understanding of various yoga....</Text>
              </Block>
             </Block>

            </Block>

            <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>

             <Block>
                <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
               
                <MaterialIcons name="sports-gymnastics" size={28} style={{color:"#C499F3"}} />
                <Text style={{marginLeft:10,fontWeight:600}}>Yoga Experience</Text>
                </Block>
             </Block>

             <Block style={{marginTop:15,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
              
              <Block center style={{padding:15,backgroundColor:"#f1f1f1",borderRadius:10}}>
                   <Text style={{fontSize:16,fontWeight:600}}>3 Years</Text>
                   <Text>Teaching Yoga</Text>
              </Block>
                 
              <Block center style={{padding:15,backgroundColor:"#f1f1f1",borderRadius:10}}>
                   <Text style={{fontSize:16,fontWeight:600}}>4 Years</Text>
                   <Text>Practicing Yoga</Text>
              </Block>
              
             </Block>

            </Block>

            <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>

             <Block>
                <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                <MaterialCommunityIcons name="flower" size={28} style={{color:"#C499F3"}} />
              
                <Text style={{marginLeft:10,fontWeight:600}}>Teaching Styles</Text>
                </Block>

                <Block style={{marginTop:10}}>
                  <Block style={{marginTop:5,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:14,fontWeight:600}}>Gentle</Text>
                    <Text style={{fontSize:14,fontWeight:600}}>Vinyasa</Text>
                  </Block>

                  <Block  style={{marginTop:5,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:14,fontWeight:600}}>Power yoga</Text>
                    <Text style={{fontSize:14,fontWeight:600}}>Hatha / hatha flow</Text>
                  </Block>

                  <Block style={{marginTop:5,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:14,fontWeight:600}}>Ashtanga</Text>
                    <Text style={{fontSize:14,fontWeight:600}}>Iyenger</Text>
                  </Block>

                  <Block style={{marginTop:5,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:14,fontWeight:600}}>Meditation</Text>
                    <Text style={{fontSize:14,fontWeight:600}}>Pranayama (Breathing)</Text>
                  </Block>

                  <Block style={{marginTop:5,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:14,fontWeight:600}}>Kids yoga</Text>
                    <Text style={{fontSize:14,fontWeight:600}}></Text>
                  </Block>
                </Block>
             </Block>

              <Block>
                 
              </Block>

            </Block>

            <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>

             <Block>
                <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                
                <FontAwesome5 name="trophy" size={22} style={{color:"#C499F3"}} />
                <Text style={{marginLeft:10,fontWeight:600}}>Certifications</Text>
                </Block>
               

               <Block>
                <Text style={{fontSize:14,color:"grey",marginTop:10}}>200 Hours International Certification from Yoga with Srinatha Mysore</Text>
                
                <Text style={{fontSize:14,color:"grey",marginTop:10}}>B.S.C in Yoga Science from University of Patanjali</Text>

                <Text style={{fontSize:14,color:"grey",marginTop:10}}>Master Of Science in Yoga from Himalayan Garhwal University</Text>
               </Block>
                   
             </Block>

              <Block>
                 
              </Block>

            </Block>
             
             <Block>
             <Block style={{padding:20}}>
                <Text style={{fontSize:18,fontWeight:600}}>Rating & Reviews</Text>
            </Block>

            <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>
            <Image style={{width:50,height:50,borderRadius:100}} source={require('../../assets/Samsra-app.jpg')} />
              <Text style={{fontSize:16,fontWeight:600,marginTop:10}}>Sailaja</Text>
              <Text style={{color:"grey",fontSize:13,marginTop:5}}>Excellent</Text>
              <Text style={{color:"grey",fontSize:13,marginTop:10}}>Dec 22 2023</Text>
              <Block style={{flexDirection:"row",marginTop:10}}>
                {stars}
              </Block>
            </Block>

            <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>
            <Image style={{width:50,height:50,borderRadius:100}} source={require('../../assets/Samsra-app.jpg')} />
              <Text style={{fontSize:16,fontWeight:600,marginTop:10}}>Senait</Text>
              <Text style={{color:"grey",fontSize:13,marginTop:5}}>Excellent class love it</Text>
              <Text style={{color:"grey",fontSize:13,marginTop:10}}>Dec 15 2023</Text>
              <Block style={{flexDirection:"row",marginTop:10}}>
                {stars}
              </Block>
            </Block>

            <Block style={{padding:20,backgroundColor:"#fff",margin:15 }}>
            <Image style={{width:50,height:50,borderRadius:100}} source={require('../../assets/Samsra-app.jpg')} />
              <Text style={{fontSize:16,fontWeight:600,marginTop:10}}>Bharti</Text>
              <Text style={{color:"grey",fontSize:13,marginTop:5}}>knowledgeable and understand the problem</Text>
              <Text style={{color:"grey",fontSize:13,marginTop:10}}>Oct 18 2023</Text>
              <Block style={{flexDirection:"row",marginTop:10}}>
                {stars}
              </Block>
            </Block>

             </Block>
           

      </ScrollView>
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
