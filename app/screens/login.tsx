import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
            router.replace("/(tabs)/HomeScreen");
        } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | any) {
            alert('Login failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-gray-100 p-5 justify-center">
            {/* Header */}

            <Text className="text-6xl font-bold text-blue-500 text-center mb-9">SpendVibe</Text>


            {/* Form */}
            <Text className="text-lg text-blue-500 mb-2">Email or Phone Number</Text>
            <TextInput className="border-b-2 border-blue-500 p-2 mb-5 text-lg text-gray-800" 
                placeholder="Enter email or phone number" 
                placeholderTextColor="gray"
                onChangeText={setEmail} />

            <Text className="text-lg text-blue-500 mb-2">Password</Text>
            <TextInput className="border-b-2 border-blue-500 p-2 mb-5 text-lg text-gray-800" 
                placeholder="Enter password" 
                placeholderTextColor="gray" 
                secureTextEntry
                onChangeText={setPassword} />

            {/* Button Login */}
            <TouchableOpacity className="bg-blue-500 py-4 rounded-full items-center my-5 mt-7" onPress={signIn}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-lg font-bold">Login</Text>}
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity className="flex-row bg-white border border-gray-300 py-4 rounded-full items-center justify-center my-2" 
                onPress={() => alert("Login with Google")}>
                <AntDesign name="google" size={24} color="black" />
                <Text className="text-gray-800 text-lg font-bold ml-2">Login with Google</Text>
            </TouchableOpacity>

            {/* Link to Sign Up */}
            <View className="flex-row justify-center mt-5">
                <Text className="text-lg text-gray-800">Don't have an account? </Text>
                <Pressable onPress={() => router.push("/screens/signup")}>
                    <Text className="text-lg text-blue-500 underline">Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Login;
