// Card.js
import { Block, Button } from 'galio-framework';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Card = ({ title, description,ClassClick ,book,join,mn}) => (
  <View style={styles.card}>
   
    <Image style={{width:"100%",height:140,borderTopLeftRadius:10,borderTopRightRadius:10}} source={require('../../assets/Samsra-app.jpg')} />

   
    
    <Block style={{padding:20}}>
    <Text onPress={ClassClick} style={styles.title}>{title} : {description}</Text>
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
    
    
  </View>
);

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

export default Card;
