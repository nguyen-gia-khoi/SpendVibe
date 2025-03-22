// import { router } from "expo-router";
// import React from "react";
// import { TouchableOpacity, View } from "react-native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Feather from '@expo/vector-icons/Feather';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import AntDesign from '@expo/vector-icons/AntDesign';

// export default function Navbar() {

//     const updateThuChi = () => {  
//         router.push("/screens/transactionInput");
//       };

//        const proFile = () => {  
//           router.push("/screens/account");
//         };

//         const backHome = () => {  
//             router.push("/(tabs)/HomeScreen");
//           };
//         const notiList = () =>{
//           router.push("/screens/notification")
//         }
//     return(
        
//       <View className="flex-row justify-around p-4 items-center bg-white rounded-t-3xl">
//       <TouchableOpacity onPress={() => backHome()}>
//         <MaterialIcons name="home" size={30} color="#2563EB" />
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Feather name="edit" size={30} color="#2563EB" />
//       </TouchableOpacity>
//       <View className="absolute -top-8 left-1/2">
//         <TouchableOpacity
//           className="w-16 h-16 rounded-full bg-blue-600 justify-center items-center shadow-lg"
//           onPress={() => updateThuChi()}
//         >
//           <AntDesign name="plus" size={30} color="white" />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity onPress={() => notiList()}>
//         <Ionicons name="notifications-outline" size={30} color="#2563EB" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => proFile()}>
//         <AntDesign name="user" size={24} color="#2563EB" />
//       </TouchableOpacity>
//     </View>
      
//     )
// }

import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { getUserNotifications } from "../../API/notificationAPI";

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

export default function Navbar() {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Hàm lấy số thông báo chưa đọc
  const fetchUnreadNotifications = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const notifications: NotificationData[] = await getUserNotifications(user.uid);
        const unreadNotifications = notifications.filter((notif) => !notif.read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching unread notifications:", error);
      }
    }
  };

  // Gọi API khi component mount và định kỳ
  useEffect(() => {
    fetchUnreadNotifications();

    // Cập nhật số lượng thông báo mỗi 10 giây
    const interval = setInterval(fetchUnreadNotifications, 10000);

    return () => clearInterval(interval); // Cleanup interval khi component unmount
  }, []);

  const updateThuChi = () => {
    router.push("/screens/transactionInput");
  };

  const proFile = () => {
    router.push("/screens/account");
  };

  const backHome = () => {
    router.push("/(tabs)/HomeScreen");
  };

  const notiList = () => {
    router.push("/screens/notification");
  };

  return (
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
      <TouchableOpacity onPress={() => notiList()}>
        <View className="relative">
          <Ionicons name="notifications-outline" size={30} color="#2563EB" />
          {unreadCount > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 justify-center items-center">
              <Text className="text-white text-xs font-bold">{unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => proFile()}>
        <AntDesign name="user" size={24} color="#2563EB" />
      </TouchableOpacity>
    </View>
  );
}