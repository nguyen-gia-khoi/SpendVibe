import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff } from "lucide-react-native";
import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import LineChartExample from '../screens/chart';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import auth from '@react-native-firebase/auth';

interface TransactionData {
  id: string; 
  type: string; 
  amount: number; 
  date: string;
}

const HomeScreen = () => {
  const { id, type, amount, date } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [ThuChi, setThuChi] = useState<TransactionData[]>([
    { id: '1', type: 'Tien an', amount: 100, date: '2025-01-01' },
    { id: '2', type: 'Tien nuoc', amount: 200, date: '2025-02-02' },
    { id: '3', type: 'Tien dien', amount: 300, date: '2025-03-03' },
  ]);

  useEffect(() => {
    if (id && type && amount && date) {
      setThuChi((prevThuChi) => [
        ...prevThuChi,
        { id: id as string, type: type as string, amount: parseFloat(amount as string), date: date as string },
      ]);
    }
  }, [id, type, amount, date]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false, footerShown: false });
  }, [navigation]);

  const logout = async () => {
    try {
      await auth().signOut();
      console.log("User logged out and data erased");
      router.replace("/screens/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View className="flex-1 bg-blue-100">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 mt-5">
        <Text className="text-2xl font-bold text-blue-600">SpendVibe</Text>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-blue-900 mr-2">User</Text>
          <FontAwesome name="user-circle-o" size={24} color="#4A90E2" />
        </View>
      </View>

      {/* Số dư hiện tại */}
      <View className="bg-blue-500 rounded-2xl p-4 items-center mx-10 mb-6">
        <Text className="text-lg font-bold text-white mb-2">Số dư hiện tại</Text>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-white mr-3">
            {isVisible ? "1.000.000" : "******"}
          </Text>
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            {isVisible ? <EyeOff size={24} color="white" /> : <Eye size={24} color="white" />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons Thu nhập / Chi tiêu */}
      <View className="flex-row justify-center space-x-4 mb-6">
        <TouchableOpacity className="px-4 py-2 rounded-full bg-blue-600">
          <Text className="text-white">Thu nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 rounded-full bg-blue-600">
          <Text className="text-white">Chi tiêu</Text>
        </TouchableOpacity>
      </View>

      {/* Biểu đồ */}
      <LineChartExample />

      {/* Transaction History */}
      <Text className="text-lg text-blue-300 ml-5 mb-2">Transaction History</Text>
      <Pressable>
        <Link href="/screens/transactionInput">
          <Text>Thêm chi tiêu</Text>
        </Link>
      </Pressable>

      <FlatList
        data={ThuChi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center p-4 rounded-lg bg-blue-300 mx-2 my-1">
            <Text className="text-blue-900">{item.type}</Text>
            <Text className="text-blue-900">{item.amount} K</Text>
            <Text className="text-blue-900">{item.date}</Text>
          </View>
        )}
      />

      {/* Navbar */}
      <View className="flex-row justify-around p-4 border-t border-blue-600 items-center">
        <TouchableOpacity>
          <MaterialIcons name="home" size={30} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <AntDesign name="user" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
