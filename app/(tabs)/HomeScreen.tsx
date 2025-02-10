// import React, { useState, useEffect, useLayoutEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { Eye, EyeOff } from "lucide-react-native";
// import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
// import LineChartExample from '../screens/chart';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Feather from '@expo/vector-icons/Feather';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Link, router } from 'expo-router';
// import { useLocalSearchParams } from 'expo-router';
// import auth from '@react-native-firebase/auth';

// interface TransactionData {
//   id: string; 
//   type: string; 
//   amount: number; 
//   date: string; // Format: YYYY-MM-DD
// }

// const HomeScreen = () => {
//   const { id, type, amount, date } = useLocalSearchParams();
//   const navigation = useNavigation();
//   const [isVisible, setIsVisible] = useState<boolean>(true);
//   const [ThuChi, setThuChi] = useState<TransactionData[]>([
//     { id: '1', type: 'Chi phí sinh hoạt', amount: 100, date: '2025-01-01' },
//     { id: '2', type: 'Phương tiện đi lại', amount: 200, date: '2025-02-02' },
//     { id: '3', type: 'Mua sắm cá nhân', amount: 300, date: '2025-03-03' },
//     { id: '4', type: 'Giải trí & Du lịch', amount: 100, date: '2025-01-01' },
//     { id: '5', type: 'Giáo dục', amount: 200, date: '2025-02-02' },
//     { id: '6', type: 'Sức khỏe', amount: 300, date: '2025-03-03' },
//     { id: '7', type: 'Đầu tư & Tiết kiệm', amount: 200, date: '2025-08-02' },
//     { id: '8', type: 'Khác', amount: 300, date: '2025-03-03' },
//   ]);

//   const [chartData, setChartData] = useState<number[]>(Array(12).fill(0)); // Khởi tạo dữ liệu biểu đồ

//   useEffect(() => {
//     if (id && type && amount && date) {
//       setThuChi((prevThuChi) => [
//         ...prevThuChi,
//         { id: id as string, type: type as string, amount: parseFloat(amount as string), date: date as string },
//       ]);
//     }
//   }, [id, type, amount, date]);

//   useEffect(() => {
//     // Cập nhật dữ liệu biểu đồ
//     const newChartData = Array(12).fill(0); // Reset dữ liệu
//     ThuChi.forEach((transaction) => {
//       const month = new Date(transaction.date).getMonth(); // Lấy tháng (0-11)
//       newChartData[month] += transaction.amount; // Cộng dồn số tiền theo tháng
//     });
//     setChartData(newChartData); // Cập nhật dữ liệu biểu đồ
//   }, [ThuChi]);

//   useLayoutEffect(() => {
//     navigation.setOptions({ headerShown: false, footerShown: false });
//   }, [navigation]);

//   const logout = async () => {
//     try {
//       await auth().signOut();
//       router.replace("/screens/login");
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };
//   const updateThuChi = () => {  
//     router.push("/screens/transactionInput");
//   }
//   return (
//     <View className="flex-1 bg-white">
//       {/* Header */}
//       <View className="flex-row justify-between items-center p-4 mt-5">
//         <Text className="text-2xl font-bold text-blue-600">SpendVibe</Text>
//         <View className="flex-row items-center">
//           <Text className="text-lg font-bold text-blue-600 mr-2">User</Text>
//           <FontAwesome name="user-circle-o" size={24} color="#2563EB" />
//         </View>
//       </View>
      
//       {/* Body */}
//       <View className="flex-1 px-4">

//       <View className="bg-blue-600 rounded-2xl p-3 items-center  mb-6">
//         <Text className="text-lg font-bold text-white mb-2">Số dư hiện tại</Text>
//         <View className="flex-row items-center">
//           <Text className="text-2xl font-bold text-white mr-3">
//             {isVisible ? "1.000.000.000.000.000.000" : "******"}
//           </Text>
//           <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
//             {isVisible ? <EyeOff size={24} color="white" /> : <Eye size={24} color="white" />}
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Buttons Thu nhập / Chi tiêu */}
//       <View className="flex-row justify-start gap-x-4 mb-6">
//         <TouchableOpacity className="px-4 py-2 rounded-full bg-blue-600">
//           <Text className="text-white">Thu nhập</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="px-4 py-2 rounded-full bg-blue-600">
//           <Text className="text-white">Chi tiêu</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Biểu đồ */}
//       {/* <LineChartExample /> */}
//       <LineChartExample chartData={chartData} />
//       {/* Transaction History */}
//       <Text className="text-lg font-bold text-blue-600 ml-5 mb-2 mt-4">Lịch sử thu chi</Text>
      
//       <View className="flex-1 ">
//         <FlatList
//         data={ThuChi}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View className="flex-row justify-between items-center p-4 rounded-lg bg-blue-600 mx-2 my-1">
//             <Text className="text-white">{item.type}</Text>
//             <Text className="text-white ">{item.amount} K</Text>
//             <Text className="text-white ">{item.date}</Text>
//           </View>
//         )}
//       />
//       </View>
      
//       </View>
//       {/* Số dư hiện tại */}
      

//       {/* Navbar */}
//       {/* <View className="flex-row justify-around p-4 border-t border-blue-600 items-center">
//         <TouchableOpacity>
//           <MaterialIcons name="home" size={30} color="rgb(57, 30, 191)" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Feather name="edit" size={24} color="rgb(57, 30, 191)" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Ionicons name="notifications-outline" size={24} color="rgb(57, 30, 191)" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={logout}>
//           <AntDesign name="user" size={24} color="rgb(57, 30, 191)" />
//         </TouchableOpacity>
//       </View> */}
      
//       <View className="flex-row justify-around p-4 border-t border-blue-600 items-center ">
//   {/* Nút Home */}
//   <TouchableOpacity>
//     <MaterialIcons name="home" size={30} color="rgb(57, 30, 191)" />
//   </TouchableOpacity>
//   {/* Nút Edit */}
//   <TouchableOpacity>
//     <Feather name="edit" size={30} color="rgb(57, 30, 191)" />
//   </TouchableOpacity>

//   {/* Nút tròn dấu cộng */}
//   <View className="absolute -top-8 left-1/2 ">
//     <TouchableOpacity
//       className="w-16 h-16 rounded-full bg-blue-600 justify-center items-center shadow-lg"
//       onPress={() => updateThuChi()}
//     >
//       <AntDesign name="plus" size={30} color="white" />
//     </TouchableOpacity>
//   </View>

//   {/* Nút Notifications */}
//   <TouchableOpacity>
//     <Ionicons name="notifications-outline" size={30} color="rgb(57, 30, 191)" />
//   </TouchableOpacity>
//   {/* Nút Logout */}
//   <TouchableOpacity onPress={logout}>
//     <AntDesign name="user" size={30} color="rgb(57, 30, 191)" />
//   </TouchableOpacity>
// </View>

//     </View>
//   );
// };

// export default HomeScreen;
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
  date: string; // Format: YYYY-MM-DD
}

const HomeScreen = () => {
  const { id, type, amount, date } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [activeChart, setActiveChart] = useState<"income" | "expense">("income"); // State để kiểm soát biểu đồ
  const [ThuChi, setThuChi] = useState<TransactionData[]>([
    { id: '1', type: 'Chi phí sinh hoạt', amount: -100, date: '2025-01-01' },
    { id: '2', type: 'Phương tiện đi lại', amount: -200, date: '2025-02-02' },
    { id: '3', type: 'Mua sắm cá nhân', amount: -300, date: '2025-03-03' },
    { id: '4', type: 'Giải trí & Du lịch', amount: -100, date: '2025-01-01' },
    { id: '5', type: 'Thu nhập từ lương', amount: 500, date: '2025-02-02' },
    { id: '6', type: 'Đầu tư lợi nhuận', amount: 300, date: '2025-03-03' },
    { id: '7', type: 'Đầu tư & Tiết kiệm', amount: 200, date: '2025-08-02' },
    { id: '8', type: 'Khác', amount: -300, date: '2025-03-03' },
    { id: '9', type: 'Khác', amount: 300, date: '2025-03-03' },
    { id: '10', type: 'Thu nhập từ lương', amount: 500, date: '2025-01-02' },
    { id: '11', type: 'Thu nhập từ lương', amount: 500, date: '2025-02-02' },
    { id: '12', type: 'Thu nhập từ lương', amount: 500, date: '2025-03-02' },
    { id: '13', type: 'Thu nhập từ lương', amount: 500, date: '2025-04-02' },
    { id: '14', type: 'Thu nhập từ lương', amount: 500, date: '2025-05-02' },
    { id: '15', type: 'Thu nhập từ lương', amount: 500, date: '2025-06-02' },
    { id: '16', type: 'Thu nhập từ lương', amount: 500, date: '2025-07-02' },
    { id: '17', type: 'Thu nhập từ lương', amount: 500, date: '2025-08-02' },
    { id: '18', type: 'Thu nhập từ lương', amount: 500, date: '2025-09-02' },
    { id: '19', type: 'Thu nhập từ lương', amount: 500, date: '2025-10-02' },
    { id: '20', type: 'Thu nhập từ lương', amount: 500, date: '2025-11-02' },
    // { id: '21', type: 'Thu nhập từ lương', amount: 500, date: '2025-12-02' },



  ]);
  const [selectedChart, setSelectedChart] = useState<'Thu nhập' | 'Chi tiêu'>('Thu nhập');

  const [chartData, setChartData] = useState<number[]>(Array(12).fill(0)); // Khởi tạo dữ liệu biểu đồ

  useEffect(() => {
    if (id && type && amount && date) {
      setThuChi((prevThuChi) => [
        ...prevThuChi,
        { id: id as string, type: type as string, amount: parseFloat(amount as string), date: date as string },
      ]);
    }
  }, [id, type, amount, date]);

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

  const logout = async () => {
    try {
      await auth().signOut();
      router.replace("/screens/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const updateThuChi = () => {  
    router.push("/screens/transactionInput");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 mt-5">
        <Text className="text-2xl font-bold text-blue-600">SpendVibe</Text>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-blue-600 mr-2">User</Text>
          <FontAwesome name="user-circle-o" size={24} color="#2563EB" />
        </View>
      </View>
      
      {/* Body */}
      <View className="flex-1 px-4">

        {/* Số dư hiện tại */}
        <View className="bg-blue-600 rounded-2xl p-3 items-center  mb-6">
          <Text className="text-lg font-bold text-white mb-2">Số dư hiện tại</Text>
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-white mr-3">
              {isVisible ? "1.000.000.000.000.000.000" : "******"}
            </Text>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              {isVisible ? <EyeOff size={24} color="white" /> : <Eye size={24} color="white" />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons Thu nhập / Chi tiêu */}
        <View className="flex-row justify-start gap-x-4 mb-6">
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            selectedChart === 'Thu nhập' ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          onPress={() => setSelectedChart('Thu nhập')}
        >
          <Text className="text-white">Thu nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            selectedChart === 'Chi tiêu' ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          onPress={() => setSelectedChart('Chi tiêu')}
        >
          <Text className="text-white">Chi tiêu</Text>
        </TouchableOpacity>
      </View>

        {/* Biểu đồ */}
        <LineChartExample chartData={chartData} legend={selectedChart} />

        {/* Transaction History */}
        <Text className="text-lg font-bold text-blue-600 ml-5 mb-2 mt-4">Lịch sử thu chi</Text>
        <FlatList
          data={ThuChi}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center p-4 rounded-lg bg-blue-600 mx-2 my-1">
              <Text className="text-white">{item.type}</Text>
              <Text className="text-white ">{item.amount} K</Text>
              <Text className="text-white ">{item.date}</Text>
            </View>
          )}
        />
      </View>
      
      {/* Navbar */}
      <View className="flex-row justify-around p-4 border-t border-blue-600 items-center">
        <TouchableOpacity>
          <MaterialIcons name="home" size={30} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="edit" size={30} color="rgb(57, 30, 191)" />
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
          <Ionicons name="notifications-outline" size={30} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <AntDesign name="user" size={30} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
