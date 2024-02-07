import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking
} from "react-native";
import { Block, Text, Input, theme,Button } from "galio-framework";

import { Ionicons } from "@expo/vector-icons";

import Modal from "react-native-modal";

import { TextInput } from "@react-native-material/core";
import { Entypo } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

export const ZoomWebView = () => {
 const navigation = useNavigation()
  const handelClose = () => {
    navigation.goBack();
    // setFormData(initalValuesForm);
  };
  return (
    <View style={[styles.centeredView]}>
    <View style={styles.modalView}>
      
      <Block >
      <WebView style={styles.webcontainer} source={{ uri: 'https://zoom-live-web.vercel.app/'  }}  originWhitelist={['*']} />
      </Block>
      
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  webcontainer: {
     width:width*0.98,
     height:height,
      // marginTop: Constants.statusBarHeight,
    },
viewHalf: {
  justifyContent: "flex-end",
  margin: 0,
},
lottie: {
  width: 250,
  height: 250,
},
content: {
  backgroundColor: "white",
  padding: 12,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  borderColor: "rgba(0, 0, 0, 0.1)",
},
contentTitle: {
  fontSize: 20,
  marginBottom: 12,
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: -50,
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  padding: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  width: width,
  height: height - 0.8,
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
},
modalText: {
  marginTop: 5,
  marginBottom: 15,
  textAlign: "center",
  fontSize: 45,
  fontWeight: "bold",
  color: "#2DA194",
},
});
