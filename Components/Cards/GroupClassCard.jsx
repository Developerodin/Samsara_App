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
const GroupClassCard = ({ title, description,ClassClick ,book,join,mn,time}) => (
  <View style={styles.card}>
     

      <Block style={{padding:15}}>
             <Block>
                <Text style={{color:"#EA6C13",fontSize:16}}>Class Title</Text>
                <Text style={{fontSize:20,marginTop:5}}>
                    {title}
                </Text>
             </Block>

             <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:20}}>

             </Block>

             <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}> 
                <Block>
                    <Text style={{fontSize:20}}>Mon, Tue, Wed</Text>
                    <Text style={{fontSize:15,color:"#4F4F4F",marginTop:3}}>{time} (IST)</Text>
                </Block>

                <TouchableOpacity onPress={join}>
                <Image   source={require('../../assets/Images/view group class details.png')} />
                </TouchableOpacity>
             </Block>

             <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:20}}>

             </Block>

             <Block style={{marginTop:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  
                <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                <Image style={{width:45,height:45,borderRadius:10}} source={require('../../assets/Samsra-app.jpg')} />
                
                <Block style={{marginLeft:10}}>
                    <Text style={{color:"#787878",fontSize:13}}>Instructor</Text>
                    <Text style={{fontSize:16}}>Pradeep Singh</Text>
                </Block>
                
                
                </Block>



             <Block style={{borderRadius:18,padding:6,width:65,flexDirection:"row",justifyContent:"space-around",alignItems:"center",backgroundColor:"#DEFFE9"}}>
                    <Octicons name="star-fill" size={12} color="#1CBC52" />
                    <Text style={{fontSize:14,color:"#1CBC52"}}>4.3</Text>
                    </Block>
             </Block>


              <Block style={[styles.Center,{marginTop:30}]}>
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
    width:"90%", // Take entire width
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
    
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  
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

export default GroupClassCard;


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