import { Link, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const Login = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>SpendVibe</Text>
            
            {/* Form */}
            <Text style={styles.label}>Email or Phone Number</Text>
            <TextInput style={styles.input} placeholder="Enter email or phone number" placeholderTextColor={"grey"} />
            
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter password" placeholderTextColor={"grey"} secureTextEntry />
            
            {/* Button Login */}
            <TouchableOpacity style={styles.button} onPressIn={() => {}}>
                <Link href="/(tabs)/HomeScreen">
                    <Text style={styles.buttonText}>Login</Text>
                </Link>
            </TouchableOpacity>
            
            {/* Google Login Button */}
            <TouchableOpacity style={styles.googleButton} onPress={() => alert("Login with Google")}>  
            <AntDesign name="google" size={24} color="black" />
                <Text style={styles.googleButtonText}>Login with Google</Text>  
            </TouchableOpacity>
            
            {/* Link to Sign Up */}
            <View style={styles.viewToSignup}>
                <Text style={styles.text}>Don't have an account? </Text>
                <Pressable>
                    <Link href="/screens/signup">
                        <Text style={styles.linkText}>Sign Up</Text>
                    </Link>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        padding: 20,
        justifyContent: "center",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#4A90E2",
        textAlign: "center",
        marginBottom: 40,
    },
    label: {
        fontSize: 16,
        color: "#4A90E2",
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "#4A90E2",
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#4A90E2",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    googleButton: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        
    },
    googleButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    viewToSignup: {
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    linkText: {
        fontSize: 16,
        color: "#4A90E2",
        textDecorationLine: "underline",
    },
});

export default Login;
