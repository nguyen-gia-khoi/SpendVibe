import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, router } from "expo-router";
import { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function Account() {
const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
    setLoading(false);
  }, []);

  const logout = async () => {
      try {
        await auth().signOut();
        console.log("User logged out and data erased");
        router.replace("/screens/login");
      } catch (error) {
        console.error("Logout Error:", error);
      }
    };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-500">
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return(
    <View className="flex-1">
        
        <View className="items-center mt-10">
        <Text className="text-2xl font-bold text-blue-800 mt-4">
          {user?.displayName || "User Name"}
        </Text>
        <Text className="text-blue-600">{user?.email}</Text>
      </View>

      {/* tong so tien da chi tieu */}
      <View className="mt-8 bg-white rounded-xl shadow-md p-6">
        <Text className="text-lg font-semibold text-blue-700">Total Spent</Text>
        <Text className="text-2xl font-bold text-blue-500 mt-2">$1,250.00</Text>
      </View>

      {/* nut logout */}
      <View className="mt-6 flex-1">

        <TouchableOpacity
          onPress={logout}
          className="mt-4 bg-blue-500 py-3 rounded-2xl items-center mx-2"
        >
          <Text className="text-white font-semibold text-2xl">Logout</Text>
        </TouchableOpacity>
      </View>

        <View className="flex-row justify-around p-4 border-t border-blue-600 items-center ">
        <TouchableOpacity>
          <MaterialIcons name="home" size={30} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="user" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
      </View>
    </View>
  )
}