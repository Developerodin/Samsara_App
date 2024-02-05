import React from 'react'
import { ScrollView, StyleSheet, View,Dimensions, ImageBackground} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export const ClassDescription = () => {
  const navigation= useNavigation()
  const handelBack = () => {
    navigation.goBack()
  };
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
            <Text style={{color:"#fff",fontSize:35,fontWeight:600}}>Hatha Yoga : Start Your Day Out Right</Text>
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

           <Block>
              <Button color='orange' size={"small"}>Share</Button>
           </Block>
           </Block>

          
              
            
          </Block>

   
      </ImageBackground>
       
          <Block style={{padding:20}}>
          <Text style={{fontSize:22,fontWeight:700}}>About Group Class</Text>

           <Block style={{backgroundColor:"#fff",borderWidth:1,borderColor:"#E4E4E4",borderRadius:5,padding:15,marginTop:10}}>
             
             <Block>
             <Text style={{fontSize:16,color:"grey",lineHeight:23}}>
              The main focus is on practicing a series of physical postures (asanas)
               that range from beginner to advanced, emphasizing strength, flexibility, 
               and balance. Breath control (pranayama) is integrated to enhance energy flow, 
               and each pose is held with mindfulness. The class concludes with relaxation poses 
               and Savasana for absorption of benefits. Closing with a brief meditation or reflection, 
               Hatha yoga caters to practitioners of all levels, promoting 
              holistic well-being through its balanced approach to physical and mental health.
                </Text>
             </Block>

             <Block style={{marginTop:20}}>
              <Block>
                <Text style={{color:"black",fontWeight:600,fontSize:16}}>Who it's for</Text>
              </Block>
              <Block  style={{marginTop:5}}>
                <Text style={{fontSize:16,color:"grey",lineHeight:23}}>
                Hatha yoga is suitable for individuals of all fitness levels, 
                ages, and body types. It is particularly beneficial for those 
                looking to improve flexibility, build strength, and enhance overall 
                physical and mental well-being. Beginners can ease into the practice
                 with its gentle introduction to foundational poses, while more advanced practitioners
                 can deepen their practice through more challenging postures.

                </Text>
              </Block>
             </Block>

             <Block style={{marginTop:20}}>
              <Block>
                <Text style={{color:"black",fontWeight:600,fontSize:16}}>How it will help you</Text>
              </Block>
              <Block  style={{marginTop:5}}>
                <Text style={{fontSize:16,color:"grey",lineHeight:23}}>
                Hatha yoga offers a holistic approach to well-being by combining physical 
                postures, breath control, and mindfulness. Through the practice of asanas,
                 individuals can enhance their flexibility, strength, and balance, leading 
                 to improved physical fitness. The emphasis on breath awareness and meditation 
                 aids in stress reduction, promoting a sense of calm and mental relaxation.
                  Regular practice cultivates a heightened mind-body connection, fostering
                   mental focus and clarity. Additionally, Hatha yoga contributes to better
                    posture and alignment, 
                making it a valuable practice for overall physical and mental health.

                </Text>
              </Block>
             </Block>
             
             <Block style={{marginTop:20}}>
              <Block>
                <Text style={{color:"black",fontWeight:600,fontSize:16}}>Who it's not for</Text>
              </Block>
              <Block  style={{marginTop:5}}>
                <Text style={{fontSize:16,color:"grey",lineHeight:23}}>
                Hatha yoga may not be suitable for individuals with specific health concerns, 
                such as severe cardiovascular issues, uncontrolled hypertension, or recent surgeries.
                 Pregnant individuals should seek guidance from a qualified prenatal yoga instructor,
                  and those with severe physical limitations or injuries may need to explore alternative 
                  forms of exercise. It's essential for anyone considering Hatha yoga to consult with
                   healthcare professionals before starting, ensuring that the practice aligns with their 
                   individual health needs. Additionally, a lack of interest or commitment to regular practice
                   may limit the full benefits of Hatha yoga, 
                as consistency and mindfulness play key roles in its effectiveness.

                </Text>
              </Block>
             </Block>

             <Block style={{marginTop:20}}>
              <Block>
                <Text style={{color:"black",fontWeight:600,fontSize:16}}>How it will not help you</Text>
              </Block>
              <Block  style={{marginTop:5}}>
                <Text style={{fontSize:16,color:"grey",lineHeight:23}}>
                Lack of commitment and mindfulness hinders Hatha yoga's potential benefits; 
                improper practice may lead to injuries.

                </Text>
              </Block>
             </Block>
              
           </Block>


             
             <Block style={{marginTop:40}}>
               <Text style={{fontSize:20,fontWeight:700}}>Fri 26th January</Text>

               <Block style={{backgroundColor:"#fff",marginTop:20,borderRadius:20,padding:20}}>
                      <Text style={{fontSize:16,fontWeight:600}}>4:30 PM IST</Text>
                      <Text style={{fontSize:14,color:"grey",marginTop:5}}>60 minute class with Shweta Jain</Text>

                      <Block center style={{marginTop:10}}>
                <Button color='orange' style={{width:300}}>Select Class</Button>
               </Block>
               </Block>

               
             </Block>

             <Block style={{marginTop:40}}>
               <Text style={{fontSize:20,fontWeight:700}}>Fri 29th January</Text>

               <Block style={{backgroundColor:"#fff",marginTop:20,borderRadius:20,padding:20}}>
                      <Text style={{fontSize:16,fontWeight:600}}>4:30 PM IST</Text>
                      <Text style={{fontSize:14,color:"grey",marginTop:5}}>60 minute class with Shweta Jain</Text>

                      <Block center style={{marginTop:10}}>
                <Button color='orange' style={{width:300}}>Select Class</Button>
               </Block>
               </Block>

               
             </Block>


             <Block style={{marginTop:40}}>
               <Text style={{fontSize:20,fontWeight:700}}>Fri 31th January</Text>

               <Block style={{backgroundColor:"#fff",marginTop:20,borderRadius:20,padding:20}}>
                      <Text style={{fontSize:16,fontWeight:600}}>4:30 PM IST</Text>
                      <Text style={{fontSize:14,color:"grey",marginTop:5}}>60 minute class with Shweta Jain</Text>

                      <Block center style={{marginTop:10}}>
                <Button color='orange' style={{width:300}}>Select Class</Button>
               </Block>
               </Block>

               
             </Block>

          </Block>
      
        
      
   
      
       </ScrollView>
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