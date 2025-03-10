import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signUp } from "../../API/authAPI";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrorUtils";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !displayName) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signUp(email, password, displayName);
      alert("Account created successfully!");
      router.push("/screens/login");
    } catch (error: any) {
      const friendlyMessage = getFirebaseErrorMessage(error.code);
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-5 justify-center">
      <Text className="text-6xl font-bold text-blue-500 text-center mb-10">SpendVibe</Text>
      {error ? <Text className="text-red-500 text-center mb-2">{error}</Text> : null}

      <Text className="text-lg text-gray-700 font-semibold">Name</Text>
      <TextInput
        className="border-b-2 border-blue-300 py-2 mb-5 text-lg text-gray-900"
        placeholder="Enter your name"
        placeholderTextColor="#555"
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />

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

      <TouchableOpacity className="bg-blue-500 py-4 rounded-full items-center mt-5" onPress={handleSignUp} disabled={loading}>
        <Text className="text-white text-lg font-bold">{loading ? "Signing up..." : "Sign Up"}</Text>
      </TouchableOpacity>

      <View className="mt-5 flex-row justify-center">
        <Text className="text-lg text-gray-700">Already have an account? </Text>
        <Link href="/screens/login" className="text-lg text-blue-500 underline">Login</Link>
      </View>
    </View>
  );
}
