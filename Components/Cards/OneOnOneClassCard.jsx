import { Block, Button } from 'galio-framework';
import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
export const OneOnOneClassCard = ({ title, description,onTeacherClick,book }) => {
  return (
    <View style={styles.card}>
   
   <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10}}>
    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>

    <Image style={{width:60,height:60,borderRadius:10}} source={require('../../assets/Samsra-app.jpg')} />


    <Block style={{marginLeft:10}}>
    <Text onPress={onTeacherClick} style={[styles.title]}>Pradeep Singh</Text>
    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:3}}>
  

<Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#DEFFE9",width:50,padding:5,borderRadius:15}}>
<AntDesign name="star" size={11} color="#1CBC52" />
     <Text style={{marginLeft:3,color:"#1CBC52",fontSize:12}}>4.3</Text>
</Block>

<Block style={{marginLeft:4}}>
<Text style={{fontSize:12,color:"grey",letterSpacing:1}}>98 Reviews </Text>
</Block>
    </Block>
  
    </Block>
    </Block>

   
      
    <Block>
        <TouchableOpacity onPress={onTeacherClick} style={{borderWidth:1,padding:10,borderRadius:20,width:80,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
             <Text style={{fontSize:16}}>Book</Text>
        </TouchableOpacity>
    </Block>
   </Block>
   

   
    
    <Block style={{padding:20}}>
    
    <Block style={{borderTopWidth:1,borderColor:'#D9E2F2',marginTop:-16}}>
    </Block>

    <Block style={{flexDirection:"row",marginTop:10}}>
    <FontAwesome6 name="check-double" size={16} color="#1CBC52" />
   
    <Text style={{fontSize:14,color:"grey",letterSpacing:1,marginLeft:10}}>4+ Years of Experience</Text>
    </Block>

    <Block style={{flexDirection:"row",marginTop:10}}>
    <FontAwesome6 name="check-double" size={16} color="#1CBC52" />
    {/* <Ionicons name="checkmark-done" size={20} color="#1CBC52" /> */}
    <Text style={{fontSize:14,color:"grey",letterSpacing:1,marginLeft:10}}>4+ Years of Experience</Text>
    </Block>

  
    </Block>
    
    
  </View>
  )
}
const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      borderRadius: 25,
      margin: 10,
      elevation: 2, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      padding:5,
      width:"93%",
      borderWidth:1,
      borderColor: '#D9E2F2'
    
    },
    title: {
      fontSize: 17
    },
    description: {
      fontSize: 16,
    },
  });