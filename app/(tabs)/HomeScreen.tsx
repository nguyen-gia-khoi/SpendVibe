import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Eye, EyeOff } from "lucide-react-native";
import { View, Text, FlatList, TouchableOpacity, Modal, Pressable } from "react-native";
import LineChartExample from "../screens/chart";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import auth from "@react-native-firebase/auth";
import Navbar from "@/app/screens/navbar";
import { fetchUserInfo } from "../../API/authAPI";
import { getUserTransaction } from "../../API/transactionAPI";

interface TransactionData {
  id: string;
  type: string; // "expense" hoặc "income"
  amount: number;
  date: string; // Format: DD/MM/YYYY từ API, sẽ chuyển thành YYYY-MM-DD
  category: string;
  note: string;
  createdAt: string;
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
  const [selectedChart, setSelectedChart] = useState<"Thu nhập" | "Chi tiêu">("Thu nhập");
  const [ThuChi, setThuChi] = useState<TransactionData[]>([]);
  const [chartData, setChartData] = useState<number[]>(Array(12).fill(0));
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Hàm định dạng số với dấu chấm phân cách hàng nghìn
  const formatNumberWithDots = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Hàm lấy dữ liệu giao dịch từ API
  const fetchTransactionsFromAPI = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const transactions = await getUserTransaction(user.uid);
        // console.log("Dữ liệu giao dịch từ API:", transactions);

        const formattedTransactions = transactions
          .map((transaction: TransactionData) => {
            if (!transaction.date || typeof transaction.date !== "string") {
              console.warn("Giao dịch có ngày không hợp lệ:", transaction);
              return null;
            }

            const dateParts = transaction.date.split("/");
            if (dateParts.length !== 3) {
              console.warn("Định dạng ngày không đúng (DD/MM/YYYY):", transaction.date);
              return null;
            }

            const [day, month, year] = dateParts;
            if (!day || !month || !year) {
              console.warn("Phần ngày bị thiếu:", transaction.date);
              return null;
            }

            const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            return {
              ...transaction,
              date: formattedDate,
              category: transaction.category || "Không xác định", // Chỉ cập nhật category, không ghi đè type
            };
          })
          .filter(Boolean);

        setThuChi(formattedTransactions);
      } catch (error) {
        console.error("Lỗi khi lấy giao dịch từ API:", error);
      }
    }
  };

  useEffect(() => {
    fetchTransactionsFromAPI();
  }, []);

  useEffect(() => {
    if (id && type && amount && date) {
      setThuChi((prevThuChi) => [
        ...prevThuChi,
        {
          id: id as string,
          type: type as string, // Giữ nguyên type từ local params
          amount: parseFloat(amount as string),
          date: date as string,
          category: type as string, // Sử dụng type làm category (có thể cần điều chỉnh nếu category khác)
          note: "",
          createdAt: new Date().toISOString(),
        },
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
          setUserData(data);
        } catch (error) {
          console.error("Lỗi khi lấy số dư user:", error);
        }
      }
    };
    fetchUserBalance();
  }, []);

  useEffect(() => {
    const newChartData = Array(12).fill(0);
    ThuChi.filter((item) =>
      (selectedChart === "Thu nhập" && item.amount > 0) || (selectedChart === "Chi tiêu" && item.amount < 0)
    ).forEach((transaction) => {
      const month = new Date(transaction.date).getMonth();
      newChartData[month] += Math.abs(transaction.amount) / 1000;
    });
    setChartData(newChartData);
  }, [ThuChi, selectedChart]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false, footerShown: false });
  }, [navigation]);

  const updateThuChi = () => {
    router.push("/screens/transactionInput");
  };

  // Hàm định dạng ngày từ YYYY-MM-DD về DD/MM/YYYY để hiển thị
  const formatDateToDDMMYYYY = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Lọc dữ liệu cho FlatList dựa trên selectedChart
  const filteredTransactions = ThuChi.filter((item) =>
    selectedChart === "Thu nhập" ? item.amount > 0 : item.amount < 0
  );

  // Hàm xử lý khi bấm vào một giao dịch
  const handleTransactionPress = (transaction: TransactionData) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  // Hàm định dạng type để hiển thị
  const formatType = (type: string): string => {
    return type === "income" ? "Thu nhập" : type === "expense" ? "Chi tiêu" : "Không xác định";
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
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-blue-500 mr-3">
                {isVisible
                  ? userData
                    ? formatNumberWithDots(userData.balance)
                    : "Loading..."
                  : "******"}
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
            className={`px-4 py-2 rounded-full ${selectedChart === "Thu nhập" ? "bg-blue-600" : "bg-gray-300"}`}
            onPress={() => setSelectedChart("Thu nhập")}
          >
            <Text className="text-white">Thu nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${selectedChart === "Chi tiêu" ? "bg-blue-600" : "bg-gray-300"}`}
            onPress={() => setSelectedChart("Chi tiêu")}
          >
            <Text className="text-white">Chi tiêu</Text>
          </TouchableOpacity>
        </View>

        <LineChartExample chartData={chartData} legend={selectedChart} />

        <Text className="text-lg font-bold text-blue-600 ml-5 mb-2 mt-4">Lịch sử thu chi</Text>
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleTransactionPress(item)}
              className="flex-row justify-between items-center p-4 rounded-lg bg-blue-600 mx-4 my-1"
            >
              {/* Cột 1: Category */}
              <Text
                className="text-white font-interRegular text-base"
                style={{ width: "40%", textAlign: "left" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.category}
              </Text>
              {/* Cột 2: Amount */}
              <Text
                className="text-white font-interRegular text-base"
                style={{ width: "30%", textAlign: "center" }}
              >
                {item.amount / 1000} K
              </Text>
              {/* Cột 3: Date */}
              <Text
                className="text-white font-interRegular text-base"
                style={{ width: "30%", textAlign: "right" }}
              >
                {formatDateToDDMMYYYY(item.date)}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text className="text-center text-gray-500 mt-4">Không có giao dịch nào</Text>}
        />
      </View>

      {/* Modal hiển thị chi tiết giao dịch */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-300 bg-opacity-20">
          <View className="bg-white p-6 rounded-lg w-4/5 shadow-lg">
            <Text className="text-2xl font-interBold mb-4 text-blue-600">Chi tiết giao dịch</Text>
            {selectedTransaction && (
              <>
                <View className="mb-3">
                  <Text className="text-lg font-interBold text-gray-700">Loại giao dịch:</Text>
                  <Text className="text-base font-interRegular">{formatType(selectedTransaction.type)}</Text>
                </View>
                <View className="mb-3">
                  <Text className="text-lg font-interBold text-gray-700">Danh mục:</Text>
                  <Text className="text-base font-interRegular">{selectedTransaction.category}</Text>
                </View>
                <View className="mb-3">
                  <Text className="text-lg font-interBold text-gray-700">Số tiền:</Text>
                  <Text className="text-base font-interRegular">
                    {formatNumberWithDots(selectedTransaction.amount)} VND
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-lg font-interBold text-gray-700">Ngày giao dịch:</Text>
                  <Text className="text-base font-interRegular">
                    {formatDateToDDMMYYYY(selectedTransaction.date)}
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-lg font-interBold text-gray-700">Ghi chú:</Text>
                  <Text className="text-base font-interRegular">
                    {selectedTransaction.note || "Không có ghi chú"}
                  </Text>
                </View>
                <View className="mb-3">
                  <Text className="text-lg font-interBold text-gray-700">Ngày tạo:</Text>
                  <Text className="text-base font-interRegular">
                    {new Date(selectedTransaction.createdAt).toLocaleString()}
                  </Text>
                </View>
              </>
            )}
            <Pressable
              className="mt-4 bg-blue-600 py-2 px-4 rounded-md"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center font-interBold">Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Navbar />
    </View>
  );
};

export default HomeScreen;