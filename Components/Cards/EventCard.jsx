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
const EventCard = ({ title, description,ClassClick ,book,join,mn,time,date}) => (
  <View style={styles.card}>
      <LinearGradient
      colors={['#a9d2fe', '#000000']}
      locations={[0.3, 0.91]}
       style={[{backgroundColor:"#a9d2fe",height:"45%",borderTopRightRadius:20,borderTopLeftRadius: 20}]} >
             
             
             <Block center style={{position:"absolute",bottom:0}}>
             <Image   source={require('../../assets/Images/CardImg.png')} />
             </Block>

             {/* <Block style={{position:"absolute",right:10,top:10}}>
               <TouchableOpacity style={{backgroundColor:"#667f99",borderRadius:20,padding:10,width:115,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
               <Feather name="bell" size={16} color="white" />
                     <Text style={{color:"#fff",fontSize:14,marginTop:-2}}>Remind Me</Text>
               </TouchableOpacity>
             </Block> */}

             <Block style={{padding:10,position:"absolute",bottom:0,width:"100%"}}>
              <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  
                  <Block>
                  <Text style={{fontSize:20,color:"rgba(255, 255, 255, 1)",fontWeight:600}}>{title && title}</Text>
                   
                   <Block style={{marginTop:5,flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                    <Block style={{borderRadius:20,padding:6,width:65,flexDirection:"row",justifyContent:"space-around",alignItems:"center",backgroundColor:"#DEFFE9"}}>
                    <Octicons name="star-fill" size={12} color="#1CBC52" />
                    <Text style={{fontSize:14,color:"#1CBC52"}}>4.3</Text>
                    </Block>

                    <Text style={{marginLeft:10,color:"#fff",fontSize:14}}>98 Reviews</Text>
                   </Block>
                  </Block>

                  <TouchableOpacity  style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:35,width:35,borderRadius:20,backgroundColor:"#667f99"}}>
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
              <Text style={{fontSize:20,marginLeft:10}}>{description === "inPerson" ? "In Person" : "Virtual Event"}</Text>
             </LinearGradient>

             <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                  <Block style={[{width:50,height:50,backgroundColor:"#E9ECF3",borderRadius:20},styles.Center]}>
                  <MaterialCommunityIcons name="calendar-month-outline" size={26} color="#617CB2" />
                  </Block>

                  <Block style={{marginLeft:10}}>
                    <Text style={{fontSize:16}}>{date} ( {time} )</Text>
                    {/* <Text style={{color:"#787878",marginTop:3,fontSize:13}}>{time}</Text> */}
                  </Block>
             </Block>

             <Block style={[styles.Center,{marginTop:20}]}>
             <TouchableOpacity onPress={join} style={styles.button} >
      <Text style={styles.buttonText}>Register now</Text>
    </TouchableOpacity>
             </Block>
      </Block>
       

  </View>
);

const styles = StyleSheet.create({
  button: {
    height: 55, // Adjust height as needed
    width:"70%", // Take entire width
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
    width:"70%",
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

export default EventCard;
