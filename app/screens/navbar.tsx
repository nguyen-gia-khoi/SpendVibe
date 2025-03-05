import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Navbar() {

    const updateThuChi = () => {  
        router.push("/screens/transactionInput");
      };

       const proFile = () => {  
          router.push("/screens/account");
        };

        const backHome = () => {  
            router.push("/(tabs)/HomeScreen");
          };
    return(
        
      <View className="flex-row justify-around p-4 items-center bg-white rounded-t-3xl">
      <TouchableOpacity onPress={() => backHome()}>
        <MaterialIcons name="home" size={30} color="#2563EB" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="edit" size={30} color="#2563EB" />
      </TouchableOpacity>
      <View className="absolute -top-8 left-1/2">
        <TouchableOpacity
          className="w-16 h-16 rounded-full bg-blue-600 justify-center items-center shadow-lg"
          onPress={() => updateThuChi()}
        >
          <AntDesign name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={30} color="#2563EB" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => proFile()}>
        <AntDesign name="user" size={24} color="#2563EB" />
      </TouchableOpacity>
    </View>
      
    )
}