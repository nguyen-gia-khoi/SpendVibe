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

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Hàm định dạng số với dấu chấm phân cách hàng nghìn
  const formatNumberWithDots = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Hàm định dạng thời gian
  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  // Lấy thông báo từ API
  const fetchNotifications = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const notificationList = await getUserNotifications(user.uid);
        setNotifications(notificationList);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchNotifications();

    // Polling để cập nhật thông báo (vì không dùng onSnapshot)
    const interval = setInterval(fetchNotifications, 10000); // Cập nhật mỗi 10 giây

    return () => clearInterval(interval); // Cleanup interval khi component unmount
  }, []);

  // Hàm đánh dấu thông báo là đã đọc
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      // Cập nhật lại danh sách thông báo
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

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
              onPress={() => handleMarkAsRead(item.id)}
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