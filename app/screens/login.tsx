// Login.tsx
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Hàm signIn được tách ra nhưng vẫn trong Login.tsx
export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | any) {
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Hàm handleSignIn được tách ra và export
export const handleSignIn = async (
  email: string,
  password: string,
  router: ReturnType<typeof useRouter>,
  setLoading: (value: boolean) => void
): Promise<void> => {
  setLoading(true);
  try {
    await signIn(email, password); // Gọi hàm signIn đã tách
    router.replace("/(tabs)/HomeScreen");
  } catch (error: any) {
    alert('Login failed: ' + error.message);
  } finally {
    setLoading(false);
  }
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1 bg-gray-100 p-5 justify-center">
      <Text className="text-6xl font-bold text-blue-500 text-center mb-9">SpendVibe</Text>
      <Text className="text-lg text-blue-500 mb-2">Email or Phone Number</Text>
      <TextInput
        className="border-b-2 border-blue-500 p-2 mb-5 text-lg text-gray-800"
        placeholder="Enter email or phone number"
        placeholderTextColor="gray"
        onChangeText={setEmail}
      />
      <Text className="text-lg text-blue-500 mb-2">Password</Text>
      <TextInput
        className="border-b-2 border-blue-500 p-2 mb-5 text-lg text-gray-800"
        placeholder="Enter password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className="bg-blue-500 py-4 rounded-full items-center my-5 mt-7"
        onPress={() => handleSignIn(email, password, router, setLoading)}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-lg font-bold">Login</Text>}
      </TouchableOpacity>
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