import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different email.";
      case "auth/invalid-email":
        return "The email address is not valid. Please enter a valid email.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled. Please contact support.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };

  const signUp = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert("Account created successfully!");
      router.push("/screens/login");
    } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | any) {
      const friendlyMessage = getFirebaseErrorMessage(error.code);
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-5 justify-center">
      <Text className="text-4xl font-bold text-blue-500 text-center mb-10">SpendVibe</Text>
      {error ? <Text className="text-red-500 text-center mb-2">{error}</Text> : null}

      <Text className="text-lg text-gray-700 font-semibold">Email</Text>
      <TextInput
        className="border-b-2 border-blue-300 py-2 mb-5 text-lg text-gray-900"
        placeholder="Enter your email"
        placeholderTextColor="#555"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Text className="text-lg text-gray-700 font-semibold">Password</Text>
      <TextInput
        className="border-b-2 border-blue-300 py-2 mb-5 text-lg text-gray-900"
        placeholder="Enter your password"
        placeholderTextColor="#555"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity className="bg-blue-500 py-4 rounded-full items-center mt-5" onPress={signUp} disabled={loading}>
        <Text className="text-white text-lg font-bold">{loading ? "Signing up..." : "Sign Up"}</Text>
      </TouchableOpacity>

      <View className="mt-5 flex-row justify-center">
        <Text className="text-lg text-gray-700">Already have an account? </Text>
        <Link href="/screens/login" className="text-lg text-blue-500 underline">Login</Link>
      </View>
    </View>
  );
}