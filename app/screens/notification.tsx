// NotificationScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import Navbar from "@/app/screens/navbar";
import { getUserNotifications, markNotificationAsRead } from "../../API/notificationAPI";

interface NotificationData {
  id: string;
  transactionId: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// Hàm fetchNotifications được tách ra và export
export const fetchNotifications = async (
  userId: string,
  setNotifications: (notifications: NotificationData[]) => void
): Promise<void> => {
  try {
    const notificationList = await getUserNotifications(userId);
    setNotifications(notificationList);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

// Hàm handleMarkAsRead được tách ra và export
export const handleMarkAsRead = async (
  notificationId: string,
  setNotifications: React.Dispatch<React.SetStateAction<NotificationData[]>>,
  prevNotifications: NotificationData[]
): Promise<void> => {
  try {
    await markNotificationAsRead(notificationId);
    // Cập nhật lại danh sách thông báo
    setNotifications(
      prevNotifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

// Hàm formatNumberWithDots được tách ra và export
export const formatNumberWithDots = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Hàm formatDateTime được tách ra và export
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Gọi API khi component mount
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      fetchNotifications(user.uid, setNotifications);
    }

    // Polling để cập nhật thông báo (vì không dùng onSnapshot)
    const interval = setInterval(() => {
      const user = auth().currentUser;
      if (user) {
        fetchNotifications(user.uid, setNotifications);
      }
    }, 10000); // Cập nhật mỗi 10 giây

    return () => clearInterval(interval); // Cleanup interval khi component unmount
  }, []);

  return (
    <View className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="rounded-b-3xl bg-blue-500 p-4">
        <Text className="text-2xl font-interBold text-white text-center">Thông báo</Text>
      </View>

      {/* Danh sách thông báo */}
      <View className="flex-1 p-4">
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleMarkAsRead(item.id, setNotifications, notifications)}
              className={`p-4 rounded-lg mb-2 ${
                item.read ? "bg-gray-300" : "bg-blue-100"
              }`}
            >
              <Text className="text-base font-interRegular text-gray-800">
                {item.message}
              </Text>
              <Text className="text-sm font-interRegular text-gray-600 mt-1">
                {formatDateTime(item.createdAt)}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              Không có thông báo nào
            </Text>
          }
        />
      </View>

      <Navbar />
    </View>
  );
};

export default NotificationScreen;