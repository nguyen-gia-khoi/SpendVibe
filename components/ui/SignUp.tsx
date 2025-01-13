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
        placeholderTextColor={"grey"}
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={"grey"}
      />

      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor={"grey"}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={"grey"}
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
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(251, 114, 3, 0.88)',
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(12, 11, 8, 0.92)',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
    paddingHorizontal: 5,
    marginHorizontal: 15,
    marginBottom: 30,
    color: "white",
  },
  text: {
    marginTop: 30,
    paddingHorizontal: 20,
    color: "white",
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    color: "white",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  text3: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  viewToLogin: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

