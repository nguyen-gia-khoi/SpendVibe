import { router, useRouter } from "expo-router";
import React from "react";
import { View, Text ,StyleSheet,TouchableOpacity, TextInput, Pressable, Button } from "react-native";


const Login = () => {
    const router = useRouter();
    return (
        // header
        
           <View style = {styles.container}>
          <Text style = {styles.header}>
            Login
          </Text>
          {/* Form */}
          <Text style = {styles.text}>Email or Phone Number</Text>
          <TextInput style = {styles.email} 
          placeholder="Nhap email hoac so dien thoai" 
          placeholderTextColor={"grey"}/>
          <Text style = {styles.text2}>Password</Text>
          <TextInput style = {styles.password} 
          placeholder="Nhap password" 
          placeholderTextColor={"grey"} />
          
          {/* Button Login */}
          <TouchableOpacity style={styles.button} onPress={() => alert("Do u sure to Login")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* Duong dan qua trang sign up */}
          <View style = {styles.viewToSignup}>
          <Text style={styles.text3}>Don't have an account? </Text>
          <Pressable>
            <Text style={styles.linkText}>Sign up now</Text>
          </Pressable>
          </View>
    
        </View>
        
      )
    }

    const styles = StyleSheet.create({
        header: {
          backgroundColor: 'rgba(251, 114, 3, 0.88)',
          textAlign: "center",
          paddingHorizontal: 20,
          fontSize: 40
        },
      
        container: {
          flex: 1, 
          backgroundColor: 'rgba(12, 11, 8, 0.92)'
        },
      
       email: {
        borderBottomWidth: 2,
        borderBottomColor: 'orange',
        paddingHorizontal: 5,
        marginHorizontal: 15
      
       },
       password: {
        borderBottomWidth: 2,
        borderBottomColor: 'orange',
        paddingHorizontal: 5,
        marginHorizontal: 15,
        marginBottom: 30
       
      
       },
         text: {
          marginTop: 200,
          paddingHorizontal: 20,
          color: "white",
          fontSize: 16
         },
          
         text2: {
          marginTop: 30,
          paddingHorizontal: 20,
          color: "white",
          fontSize: 16
         },
      
        linkText: {
          fontSize: 16,
          color: "white", 
          textDecorationLine: "underline", 
          textAlign: "center"
        },
      
        text3: {
          fontSize: 16,
          color: "white",
         textAlign: "center"
        },
      
        viewToSignup: {
          
          marginTop: 20,
        
        },
      
        button: {
          backgroundColor: "orange", 
          paddingVertical: 15, 
          paddingHorizontal: 30, 
          borderRadius: 25, 
          alignItems: "center",
          marginHorizontal: 20
        },
        buttonText: {
          color: "black", 
          fontSize: 18, 
          fontWeight: "bold", 
        },
      
      }) 
export default Login