// Account.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import Navbar from "./navbar";
import { getUserTransactionSummary } from "../../API/authAPI";

// Hàm fetchSummary được tách ra và export
export const fetchSummary = async (
  userId: string,
  period: "day" | "month" | "year",
  setSummary: (summary: { totalIncome: number; totalSpent: number }) => void
): Promise<void> => {
  try {
    const data = await getUserTransactionSummary(userId, period);
    setSummary(data);
  } catch (error) {
    console.error("Error fetching summary:", error);
  }
};

// Hàm logout được tách ra và export
export const logout = async (
  signOut: () => Promise<void>,
  router: { replace: (path: string) => void }
): Promise<void> => {
  try {
    await signOut();
    console.log("User logged out and data erased");
    router.replace("/screens/login");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

// Hàm formatNumberWithDots được tách ra và export
export const formatNumberWithDots = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"day" | "month" | "year">("day");
  const [summary, setSummary] = useState<{ totalIncome: number; totalSpent: number }>({
    totalIncome: 0,
    totalSpent: 0,
  });

  // Lấy thông tin user
  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
    setLoading(false);
  }, []);

  // Lấy tổng chi tiêu và doanh thu qua API
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      fetchSummary(user.uid, period, setSummary);
    }
  }, [period]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-500">
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="items-center mt-10">
        <Text className="text-2xl font-bold text-blue-800 mt-4">
          {user?.displayName || "User Name"}
        </Text>
        <Text className="text-blue-600">{user?.email}</Text>
      </View>

      {/* Picker chọn khoảng thời gian */}
      <View className="flex-row justify-around mt-6">
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            period === "day" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onPress={() => setPeriod("day")}
        >
          <Text className="text-white">Ngày</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            period === "month" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onPress={() => setPeriod("month")}
        >
          <Text className="text-white">Tháng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            period === "year" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onPress={() => setPeriod("year")}
        >
          <Text className="text-white">Năm</Text>
        </TouchableOpacity>
      </View>

      {/* Tổng chi tiêu và doanh thu */}
      <View className="mt-6 bg-white rounded-xl shadow-md p-6 mx-4">
        <Text className="text-lg font-semibold text-blue-700">Tổng chi tiêu</Text>
        <Text className="text-2xl font-bold text-red-500 mt-2">
          {formatNumberWithDots(summary.totalSpent)} VND
        </Text>
      </View>

      <View className="mt-4 bg-white rounded-xl shadow-md p-6 mx-4">
        <Text className="text-lg font-semibold text-blue-700">Tổng doanh thu</Text>
        <Text className="text-2xl font-bold text-green-500 mt-2">
          {formatNumberWithDots(summary.totalIncome)} VND
        </Text>
      </View>

      {/* Nút logout */}
      <View className="mt-6 flex-1">
        <TouchableOpacity
          onPress={() => logout(auth().signOut, router as any)}
          className="mt-4 bg-blue-600 py-3 rounded-2xl items-center mx-2"
        >
          <Text className="text-white font-semibold text-2xl">Logout</Text>
        </TouchableOpacity>
      </View>

      <Navbar />
    </View>
  );
}