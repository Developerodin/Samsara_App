import { Block, Button } from 'galio-framework';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const OneOnOneClassCard = ({ title, description,onTeacherClick,book }) => {
  return (
    <View style={styles.card}>
   
   <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10}}>
    <Block>
    <Image style={{width:130,height:130,borderRadius:100}} source={require('../../assets/Samsra-app.jpg')} />
    </Block>

    <Block>
    <Text style={{fontSize:12,color:"grey",letterSpacing:1}}>from 97 Reviews </Text>

<Block style={{marginTop:10,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"green",width:50,padding:5,borderRadius:7}}>
<AntDesign name="star" size={16} color="#fff" />
     <Text style={{marginLeft:3,color:"#fff"}}>4.9</Text>
</Block>
    </Block>
      
    <Block>

    </Block>
   </Block>
   

   
    
    <Block style={{padding:20}}>
    <Text onPress={onTeacherClick} style={[styles.title]}>Pravin Bharadwaj <AntDesign name="right" size={16} style={{marginTop:3}} color="orange" /></Text>
    <Block style={{flexDirection:"row",marginTop:10}}>
   
    <AntDesign name="check" size={20} color="orange" />
    <Text style={{fontSize:14,color:"grey",letterSpacing:1,marginLeft:15}}>Friendly and always happy to help</Text>
    </Block>

    <Block style={{flexDirection:"row",marginTop:10}}>
    <AntDesign name="check" size={20} color="orange" />
    <Text style={{fontSize:14,color:"grey",letterSpacing:1,marginLeft:15}}>4 years teaching experience</Text>
    </Block>

    <Block center style={{marginTop:20}}>
      <Button onPress={()=>book()} style={{backgroundColor:"orange"}}>
        Book
      </Button>
    </Block>
    </Block>
    
    
  </View>
  )
}
const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      borderRadius: 20,
      margin: 10,
      elevation: 3, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      height:"95%",
      width:"93%"
    
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
    },
  });