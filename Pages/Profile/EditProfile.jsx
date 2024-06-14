import React, { useEffect, useState } from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { ProfileDetailCard } from "../../Components/Cards/ProfileDetailCard";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import CustomButton from "../../Components/Buttons/CustomButton";
import { useAppContext } from "../../Context/AppContext";

export const EditProfile = () => {
  const navigation = useNavigation()
  const [userData, setUserData] = useState(null);
  const [healthIssues, setHealthIssues] = useState([]);
  const [userDetails,setUserDetails] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    email: "",
    companyName: "",
    corporateId: "",
    mobile: "",
    dob: null,
    city: "",
    pincode: "",
    country: "",
    height: "",
    weight: "",
    healthIssues: [],
    description: "",
    Address: "",
    howyouknowus: "",
    PriorExperience: "",
  });
  const {ProfileUpdate,setProfileUpdate} = useAppContext()

  const CardData = [
    {
      icon: <MaterialCommunityIcons name="yoga" size={26} color="grey" />,
      title: "Date of Birth & Gender",
      sub1: userData && userData.dob,
      sub2: `Gender : ${userData && userData.gender}`,
      route: "/details",
    },
    {
      icon: <FontAwesome6 name="hand-holding-medical" size={23} color="grey" />,
      title: "Medical history",
      sub1: "Asthama",
      sub2: "",
      route: "/details",
    },
    {
      icon: <MaterialIcons name="sports-gymnastics" size={24} color="grey" />,
      title: "My experience with yoga",
      sub1: "INTERMEDIATE",
      sub2: "",
      route: "/details",
    },
    {
      icon: <FontAwesome5 name="calendar-alt" size={24} color="grey" />,
      title: "Preferred practice time",
      sub1: "Afternonn (12pm - 5pm)",
      sub2: "",
      route: "/details",
    },
  ];

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const  handelGoBack = ()=>{
   navigation.goBack();
  }

  const handelContinue = () => {
    console.log("Id user ==>",userDetails._id)
  //   if (selectedType === "Corporate" && (formData.companyName === "" || formData.corporateId === "")) {
  //     alert("Company Name and Corporate ID are required for Corporate type.");
  //     return;
  //   }
   
  //  for (const key in formData) {
  //     // Skip checking companyName and corporateId if selectedType is Corporate
  //     console.log("Selected type : ",selectedType)

  //     if (formData[key] === "") {
  //       if (selectedType !== "Corporate" && (key === "companyName" || key === "corporateId")) {
  //         console.log("Corporate ==>",key)
  //         continue;
  //       }
  //       else{
  //         alert(`${key} is required.`);
  //       }
        
  //       return; 
  //     }
  //   }

    const formData1 = new FormData();
    // console.log("Data of images", userimageFile1);
    const userData ={
      "name": formData.name,
      "gender": formData.sex,
      "company_name":formData.companyName,
      "corporate_id":formData.corporateId,
      "email":formData.email,
      "password": "",
      "mobile":formData.mobile,
      "dob": formData.dob,
      // "images": [userimageFile1],
      "Address":formData.Address,
      "city":formData.city,
      "pincode":formData.pincode,
      "country":formData.country,
      "height":formData.height,
      "weight":formData.weight,
      "health_issues":formData.healthIssues,
      // "howyouknowus":formData.howyouknowus,
      // "PriorExperience": formData.PriorExperience,
      "description":formData.description,
      // "dataImages":userimageFile1
    };
    
    formData1.append("name", userData.name);
    formData1.append("gender", userData.gender);
    // formData1.append("company_name", userData.company_name);
    // formData1.append("corporate_id", userData.corporate_id);
    // formData1.append("email", userData.email);
    // formData1.append("password", userData.password);
    // formData1.append("mobile", userData.mobile);
    formData1.append("dob", userData.dob);
    // userData.images.forEach((image, index) => {
    //   formData1.append('images', image);
    // });
    // userData.health_issues.forEach((el, index) => {
    //   formData1.append('health_issues', el);
    // });
    formData1.append("Address", userData.Address);
    formData1.append("city", userData.city);
    formData1.append("pincode", userData.pincode);
    formData1.append("country", userData.country);
    formData1.append("height", userData.height);
    formData1.append("weight", userData.weight);
    
    formData1.append("howyouknowus", userData.howyouknowus);
    formData1.append("PriorExperience", userData.PriorExperience);
    formData1.append("description", userData.description);
    
    axios.patch(`${Base_url}api/users/update/${userDetails._id}`, formData1,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('User Updated successfully:', response.data);
        const Data = JSON.stringify(response.data);
          AsyncStorage.setItem("userDetails", Data); 
          // Save the token in AsyncStorage or in state management (e.g., Redux)
          // AsyncStorage.setItem('token', token);
          setProfileUpdate((prev)=>prev+1)
        handelGoBack()
       
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        
        alert("Refresh and try again");
      });
  };

  const fetchUsersById = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/users/${id}`); // Replace with your actual API endpoint
      // setUsers(response.data.data.users);
      const Data= response.data.data.user
      console.log("User Data edit ==>",Data)
      if(Data){
        const formattedDate =Data.dob;
        console.log("Formated Data ===>", formattedDate)
        setFormData( {
            name:Data.name,
            sex: Data.gender,
            email: Data.email,
            companyName: Data.company_name,
            corporateId: Data.corporate_id,
            mobile: Data.mobile,
            dob: formattedDate,
            city: Data.city,
            pincode: Data.pincode,
            country: Data.country,
            height: Data.height,
            weight: Data.weight,
            healthIssues: Data.health_issues,
            description: Data.description,
            Address:Data.Address,
            howyouknowus: Data.howyouknowus,
            PriorExperience: Data.PriorExperience,
          })
         

    // Update the state with the formatted date
   
    
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(() => {
    const userDetailsFromStorage = async () => {
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      const ParseData = JSON.parse(Details);

      console.log("Parse Data users edit    ===>", ParseData.data.user);
      const data = ParseData.data.user;
      setUserDetails(data);
      fetchUsersById(data._id)
      const healthIssuesArray =
        data && data.health_issues && data.health_issues[0].split(",");

      console.log("Health issuess ==>", healthIssuesArray);
      setHealthIssues(healthIssuesArray);
    };

    userDetailsFromStorage();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Block style={{ padding: 20 }}>
          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Name</Text>
            <Input
              left
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              placeholder="My name is .."
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Gender</Text>
            <Input
              left
              value={formData.sex}
              onChangeText={(text) => handleInputChange("sex", text)}
              placeholder="Gender"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Email</Text>
            <Input
              left
              value={formData.email}
              // onChangeText={(text) => handleInputChange("email", text)}
              placeholder="Email"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Company Name</Text>
            <Input
              left
              value={formData.companyName}
              onChangeText={(text) => handleInputChange("companyName", text)}
              placeholder="Company Name"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Employee Id</Text>
            <Input
              left
              value={formData.corporateId}
              onChangeText={(text) => handleInputChange("corporateId", text)}
              placeholder="Employee Id"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Mobile</Text>
            <Input
              left
              value={formData.mobile}
              // onChangeText={(text) => handleInputChange("mobile", text)}
              placeholder="Mobile"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Dob</Text>
            <Input
              left
              value={formData.dob}
              onChangeText={(text) => handleInputChange("dob", text)}
              placeholder="Dob"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>City</Text>
            <Input
              left
              value={formData.city}
              onChangeText={(text) => handleInputChange("city", text)}
              placeholder="City"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Pincode</Text>
            <Input
              left
              value={formData.pincode}
              onChangeText={(text) => handleInputChange("pincode", text)}
              placeholder="Pincode"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Country</Text>
            <Input
              left
              value={formData.country}
              onChangeText={(text) => handleInputChange("country", text)}
              placeholder="Country"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Height</Text>
            <Input
              left
              value={formData.height}
              onChangeText={(text) => handleInputChange("height", text)}
              placeholder="Height"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Weight</Text>
            <Input
              left
              value={formData.weight}
              onChangeText={(text) => handleInputChange("weight", text)}
              placeholder="Weight"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Health Issues</Text>
            <Input
              left
              value={formData.healthIssues}
              onChangeText={(text) => handleInputChange("healthIssues", text)}
              placeholder="Health Issues"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Description</Text>
            <Input
              left
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              placeholder="Description"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Text style={{ color: "grey" }}>Address</Text>
            <Input
              left
              value={formData.Address}
              onChangeText={(text) => handleInputChange("Address", text)}
              placeholder="Address"
              style={{
                height: 60,
                backgroundColor: "#A8B6D140",
                borderColor: "#A8B6D140",
                letterSpacing: 2,
              }}
            />
          </Block>

          <Block style={{marginTop:30}}>
            <CustomButton title={"Update"} onPress={handelContinue} />
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
