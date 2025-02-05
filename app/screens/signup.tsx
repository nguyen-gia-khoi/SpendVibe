import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";

export default function SignUp() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Sign Up</Text>
      
      {/* Form */}
      <Text style={styles.text}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor={"#555"}
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={"#555"}
      />

      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor={"#555"}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={"#555"}
        secureTextEntry
      />

      {/* Button Sign Up */}
      <TouchableOpacity style={styles.button} onPress={() => alert("Sign Up Successful!")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Link to Login */}
      <View style={styles.viewToLogin}>
        <Text style={styles.text3}>Already have an account? </Text>
        <Pressable>
          <Text style={styles.linkText}>Login</Text>
          <Link href="/screens/login"/>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#A7C7E7',
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#A7C7E7',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
    color: "#34495E",
    fontWeight: "600",
  },
  linkText: {
    fontSize: 16,
    color: "#5D9CEC",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  text3: {
    fontSize: 16,
    color: "#34495E",
    textAlign: "center",
  },
  viewToLogin: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#5D9CEC",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
