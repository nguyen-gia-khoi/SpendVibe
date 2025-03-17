
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff } from "lucide-react-native";
import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import LineChartExample from '../screens/chart';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import auth from "@react-native-firebase/auth";
import Navbar from '@/app/screens/navbar';
import { fetchUserInfo } from "../../API/authAPI";

interface TransactionData {
  id: string;
  type: string;
  amount: number;
  date: string; // Format: YYYY-MM-DD
}

interface UserData {
  balance: number;
  displayName: string;
}

const HomeScreen = () => {
  const { id, type, amount, date } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedChart, setSelectedChart] = useState<'Thu nhập' | 'Chi tiêu'>('Thu nhập');

  const [ThuChi, setThuChi] = useState<TransactionData[]>([
    { id: '1', type: 'Chi phí sinh hoạt', amount: -100, date: '2025-01-01' },
    { id: '2', type: 'Phương tiện đi lại', amount: -200, date: '2025-02-02' },
    { id: '3', type: 'Mua sắm cá nhân', amount: -300, date: '2025-03-03' },
    { id: '4', type: 'Giải trí & Du lịch', amount: -100, date: '2025-01-01' },
    { id: '5', type: 'Thu nhập từ lương', amount: 500, date: '2025-02-02' },
  ]);

  const [chartData, setChartData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    if (id && type && amount && date) {
      setThuChi((prevThuChi) => [
        ...prevThuChi,
        { id: id as string, type: type as string, amount: parseFloat(amount as string), date: date as string },
      ]);
    }
  }, [id, type, amount, date]);

  useEffect(() => {
    const loadUserInfo = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          setDisplayName(user.displayName);
        } catch (error) {
          console.error("Lỗi khi lấy thông tin user:", error);
        }
      }
    };

    loadUserInfo();
  }, []);

  useEffect(() => {
    const fetchUserBalance = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const data: UserData = await fetchUserInfo(user.uid);
          console.log("Dữ liệu user:", data);
          setUserData(data); // 🛠 Sửa lỗi cú pháp
        } catch (error) {
          console.error("Lỗi khi lấy số dư user:", error);
        }
      }
    };

    fetchUserBalance();
  }, []);

  useEffect(() => {
    const newChartData = Array(12).fill(0);
    ThuChi.filter(item =>
      (selectedChart === "Thu nhập" && item.amount > 0) ||
      (selectedChart === "Chi tiêu" && item.amount < 0)
    ).forEach(transaction => {
      const month = new Date(transaction.date).getMonth();
      newChartData[month] += Math.abs(transaction.amount);
    });

    setChartData(newChartData);
  }, [ThuChi, selectedChart]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false, footerShown: false });
  }, [navigation]);

  const updateThuChi = () => {
    router.push("/screens/transactionInput");
  };

  return (
    <View className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="rounded-b-3xl bg-blue-500">
        <View className="flex-row justify-between items-center p-4 mt-5">
          <Text className="text-2xl font-interBold text-white">SpendVibe</Text>
          <View className="flex-row items-center">
            <Text className="text-lg font-interBold text-white mr-2">{displayName || "User"}</Text>
            <FontAwesome name="user-circle-o" size={24} color="white" />
          </View>
        </View>

        <View className="px-4">
          <View className="bg-white p-3 items-center mb-6 rounded-3xl">
            <Text className="text-lg font-interBold text-white mr-2">
              
            </Text>
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-blue-500 mr-3">
              {isVisible ? (userData ? ` ${userData.balance}` : "Loading...") : "******"}
              </Text>
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                {isVisible ? <EyeOff size={24} color="#2563EB" /> : <Eye size={24} color="#2563EB" />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Body */}
      <View className="bg-gray-200 flex-1">
        <View className="flex-row justify-start gap-x-4 mb-4 p-3">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${selectedChart === 'Thu nhập' ? 'bg-blue-600' : 'bg-gray-300'}`}
            onPress={() => setSelectedChart('Thu nhập')}
          >
            <Text className="text-white">Thu nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${selectedChart === 'Chi tiêu' ? 'bg-blue-600' : 'bg-gray-300'}`}
            onPress={() => setSelectedChart('Chi tiêu')}
          >
            <Text className="text-white">Chi tiêu</Text>
          </TouchableOpacity>
        </View>

        <LineChartExample chartData={chartData} legend={selectedChart} />

        <Text className="text-lg font-bold text-blue-600 ml-5 mb-2 mt-4">Lịch sử thu chi</Text>
        <FlatList
          data={ThuChi}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center p-4 rounded-lg bg-blue-600 mx-2 my-1">
              <Text className="text-white">{item.type}</Text>
              <Text className="text-white">{item.amount} K</Text>
              <Text className="text-white">{item.date}</Text>
            </View>
          )}
        />
      </View>

      <Navbar />
    </View>
  );
};

export default HomeScreen;
