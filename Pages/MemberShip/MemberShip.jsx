import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  RefreshControl,
  ImageBackground,

} from "react-native";
import { ToastAndroid, ActivityIndicator } from "react-native";
const { width, height } = Dimensions.get("window");

import { useNavigation } from "@react-navigation/native";
import { Block } from "galio-framework";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";





export const Membership = () => {
  const navigation = useNavigation();
  const [update, setupdate] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };


  const handelPlanClick = ()=>{
    console.log("URl Click")
   const url = `https://samsara-web-8j4i.vercel.app/payment/${userData._id}`
   Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }


  useEffect(() => {
    const userDetailsFromStorage = async () => {
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      const ParseData = JSON.parse(Details);

      // console.log("Parse Data ===>", ParseData.data.user);
      const data = ParseData.data.user;
      setUserData(data);
    };

    userDetailsFromStorage();
  }, []);

  return (
    <View style={styles.container}>
     {isLoading ? <Block center style={{height:height*0.8,flexDirection:"row",justifyContent:"center",alignItems:"center"}}> 

<ActivityIndicator size="large" color="orange" />
</Block> 
:
<ScrollView    refreshControl={
<RefreshControl
  refreshing={refreshing}
  onRefresh={onRefresh}
/>
}>

<Block style={{ backgroundColor: "#eef3f7",padding:10 }}>
    
    <Block style={{borderWidth:1,borderRadius:20,borderColor: '#D9E2F2',marginTop:30}}>
       <Block style={{backgroundColor:"#EA6C13",padding:20,borderTopRightRadius:20,borderTopLeftRadius:20}}>
        <Block center>
        <Text style={{fontSize:24,color:"#fff"}}>INDIVIDUAL</Text>
        </Block>
         
       </Block>

       <Block style={{backgroundColor:"#FFCA6B",padding:20,height:100,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
       <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
       <Text style={{fontSize:18,color:"black",marginTop:-10}}>Rs</Text>
        <Text style={{fontSize:30,color:"black",fontWeight:500}}> 4,999 /</Text>
        <Text style={{fontSize:18,color:"black",marginTop:10}}>Month</Text>
        </Block>
       </Block>

       <Block style={{padding:10}}>
        <Block style={{marginTop:20}}>
            <Text style={{color:"grey",fontSize:17}}>Access Your Yoga Classes from anywhere in the world</Text>
        </Block>
        <Block style={{marginTop:20}}>
            <Text style={{color:"grey",fontSize:17}}>Make yoga and meditation a daily habit to improve flexibility and immune</Text>
        </Block>
        <Block style={{marginTop:20}}>
            <Text style={{color:"grey",fontSize:17}}>From a  lifelong relationship with teachers and fellow practitioners.</Text>
        </Block>
       </Block>
        
       <Block style={{marginTop:20,flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:20}}>
             <TouchableOpacity onPress={handelPlanClick}  style={{
    height: 55,
    width:"70%",
    borderRadius: 17,
    backgroundColor: '#EA6C13',
    justifyContent: 'center',
    alignItems: 'center',
  }} >
      <Text style={styles.buttonText}>Get</Text>
    </TouchableOpacity>
             </Block>

    </Block>

    <Block style={{borderWidth:1,borderRadius:20,borderColor: '#D9E2F2',marginTop:30}}>
       <Block style={{backgroundColor:"#EA6C13",padding:20,borderTopRightRadius:20,borderTopLeftRadius:20}}>
        <Block center>
        <Text style={{fontSize:24,color:"#fff"}}>INDIVIDUAL</Text>
        </Block>
         
       </Block>

       <Block style={{backgroundColor:"#FFCA6B",padding:20,height:100,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
       <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
       <Text style={{fontSize:18,color:"black",marginTop:-10}}>Rs</Text>
        <Text style={{fontSize:30,color:"black",fontWeight:500}}> 14,997 /</Text>
        <Text style={{fontSize:18,color:"black",marginTop:10}}>6 Month</Text>
        </Block>
       </Block>

       <Block style={{padding:10}}>
        <Block style={{marginTop:20}}>
            <Text style={{color:"grey",fontSize:17}}>Access Your Yoga Classes from anywhere in the world</Text>
        </Block>
        <Block style={{marginTop:20}}>
            <Text style={{color:"grey",fontSize:17}}>Make yoga and meditation a daily habit to improve flexibility and immune</Text>
        </Block>
        <Block style={{marginTop:20}}>
            <Text style={{color:"grey",fontSize:17}}>From a  lifelong relationship with teachers and fellow practitioners.</Text>
        </Block>
       </Block>
        
       <Block style={{marginTop:20,flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:20}}>
             <TouchableOpacity onPress={handelPlanClick}  style={{
    height: 55,
    width:"70%",
    borderRadius: 17,
    backgroundColor: '#EA6C13',
    justifyContent: 'center',
    alignItems: 'center',
  }} >
      <Text style={styles.buttonText}>Get</Text>
    </TouchableOpacity>
             </Block>

    </Block>
    
</Block>



</ScrollView>
}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
  },
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
  imageBackground: {
    width: '100%',
    height: height * 0.35,
    overflow: 'hidden',
  },
  imageStyle: {
   
  },
  button2: {
    height: 30, // Adjust height as needed
    width:80, // Take entire width
    borderRadius: 17, // Border radius for rounded corners
    backgroundColor: '#EA6C13', // Orange background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText2: {
    color: 'white', // Text color
    fontSize: 14, // Text font size
    // Text font weight
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
   
    height:height * 0.35
  },
  lottie: {
    width: 350,
    height: 250,
    marginBottom: -45,
  },
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  Center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  row: {
    flexDirection: "row",
    marginTop: 10, // This will create a row of items
  },
  column: {
    flex: 1, // Each column should take up equal space
    alignItems: "center", // Center items horizontally
    justifyContent: "space-between",
    // Center items vertically
  },
  gridItem: {
    width: 170,
    height: 75,
    backgroundColor: "#fff",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ea5932",
    borderRadius: 10,
  },
  itemText: {
    color: "#ea5932",
    fontSize: 17,
  },
});


const styles2 = StyleSheet.create({
  container:{
  
    

  },
  textPlayfair: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 27,
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