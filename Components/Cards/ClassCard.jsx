// Card.js
import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground ,Dimensions,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Block, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import CustomButton from '../Buttons/CustomButton';
import { LinearGradient } from "expo-linear-gradient";
const Card = ({ title, description,ClassClick ,book,join,mn}) => (
  <View style={styles.card}>
      <LinearGradient
      colors={['#a9d2fe', '#000000']}
      locations={[0.3, 0.91]}
       style={[{backgroundColor:"#a9d2fe",height:"45%",borderTopRightRadius:20,borderTopLeftRadius: 20}]} >
             
             
             <Block center style={{position:"absolute",bottom:0}}>
             <Image   source={require('../../assets/Images/CardImg.png')} />
             </Block>

             <Block style={{position:"absolute",right:10,top:10}}>
               <TouchableOpacity style={{backgroundColor:"#667f99",borderRadius:20,padding:10,width:115,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
               <Feather name="bell" size={16} color="white" />
                     <Text style={{color:"#fff",fontSize:14,marginTop:-2}}>Remind Me</Text>
               </TouchableOpacity>
             </Block>

             <Block style={{padding:10,position:"absolute",bottom:0,width:"100%"}}>
              <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  
                  <Block>
                  <Text style={{fontSize:20,color:"rgba(255, 255, 255, 1)",fontWeight:600}}>Pradeep Singh</Text>
                   
                   <Block style={{marginTop:5,flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                    <Block style={{borderRadius:20,padding:6,width:65,flexDirection:"row",justifyContent:"space-around",alignItems:"center",backgroundColor:"#DEFFE9"}}>
                    <Octicons name="star-fill" size={12} color="#1CBC52" />
                    <Text style={{fontSize:14,color:"#1CBC52"}}>4.3</Text>
                    </Block>

                    <Text style={{marginLeft:10,color:"#fff",fontSize:14}}>98 Reviews</Text>
                   </Block>
                  </Block>

                  <TouchableOpacity onPress={ClassClick} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:35,width:35,borderRadius:20,backgroundColor:"#667f99"}}>
                  <Fontisto  name="angle-down" size={18} color="white" />
                  </TouchableOpacity>
              </Block>
                
             </Block>
             
      </LinearGradient>

      <Block style={{padding:10}}>
             
             <LinearGradient 
            colors={['rgba(255, 240, 229, 1)', 'rgba(254, 242, 234, 0)']}
             style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
              <Text style={{fontSize:48,color:"#EA6C13"}}>I</Text>
              <Text style={{fontSize:20,marginLeft:10}}>{title}</Text>
             </LinearGradient>

             <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                  <Block style={[{width:50,height:50,backgroundColor:"#E9ECF3",borderRadius:20},styles.Center]}>
                  <MaterialCommunityIcons name="calendar-month-outline" size={26} color="#617CB2" />
                  </Block>

                  <Block style={{marginLeft:10}}>
                    <Text style={{fontSize:16}}>Mon, Tue, Wed</Text>
                    <Text style={{color:"#787878",marginTop:3,fontSize:13}}>1:20 PM to 3:30 PM</Text>
                  </Block>
             </Block>

             <Block style={[styles.Center,{marginTop:20}]}>
             <TouchableOpacity onPress={join} style={styles.button} >
      <Text style={styles.buttonText}>Join Now</Text>
    </TouchableOpacity>
             </Block>
      </Block>
       

  </View>
);

const styles = StyleSheet.create({
  button: {
    height: 55, // Adjust height as needed
    width:"80%", // Take entire width
    borderRadius: 17, // Border radius for rounded corners
    backgroundColor: '#EA6C13', // Orange background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 19, // Text font size
    // Text font weight
  },
  bottomOpacity: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, // Adjust as needed
    backgroundColor: 'rgba(255, 255, 255, 0)', // Fully transparent
    borderBottomColor: 'rgba(255, 255, 255, 1)', // Fully opaque
    borderBottomWidth: 50, // Adjust as needed
  },
  card: {
    
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderWidth:1,
    borderColor: '#D9E2F2',
    width:"85%",
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  Center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Card;


{/* <View style={styles.card}>
   
   <Image style={{width:"100%",height:140,borderTopLeftRadius:10,borderTopRightRadius:10}} source={require('../../assets/Samsra-app.jpg')} />

  
   
   <Block style={{padding:20}}>
     <Block style={{borderWidth:1,padding:10,backgroundColor:"#FFF0E5"}}>
     <Text onPress={ClassClick} style={styles.title}>{title}</Text>
     </Block>
   
   <Block style={{flexDirection:"row",marginTop:10}}>
   <AntDesign name="retweet" size={20} color="grey" />
   <Text style={{fontSize:14,color:"grey",letterSpacing:1,marginLeft:15}}>Fri,Mon & Wed</Text>
   </Block>

   <Block style={{flexDirection:"row",marginTop:10}}>
   <AntDesign name="clockcircleo" size={20} color="grey" />
   <Text style={{fontSize:14,color:"grey",letterSpacing:1,marginLeft:15}}>04:30-5:30PM</Text>
   </Block>

   <Block center style={{marginTop:15}}>
     {
       mn ?  <Button onPress={()=>join()} style={{backgroundColor:"orange"}}>
       Join
     </Button>
     :
     <Button onPress={()=>book()} style={{backgroundColor:"orange"}}>
       Book
     </Button>
     }
    
   </Block>
   </Block>
   
   
 </View> */}