// TransactionInputScreen.tsx
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, Alert, Pressable, Modal, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import Navbar from "./navbar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { newTransaction } from "@/API/transactionAPI";

const GOOGLE_VISION_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY;
const GOOGLE_GENERATIVE_AI_KEY = process.env.EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_KEY;

const genAI = new GoogleGenerativeAI("AIzaSyBgte7Mk-wy-XcxRan_-cK82-Iei9ZKLec");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface TransactionInputData {
  type: string;
  amount: string;
  date: string; // Định dạng: DD/MM/YYYY
  category?: string;
  note?: string;
}

const transactionCategories = {
  income: [
    "Lương & Thu nhập",
    "Thu nhập phụ",
    "Đầu tư",
    "Kinh doanh",
    "Tiền thưởng & Quà tặng",
    "Tiền hoàn trả",
    "Khác",
  ],
  expense: [
    "Chi phí sinh hoạt",
    "Phương tiện đi lại",
    "Mua sắm cá nhân",
    "Giải trí & Du lịch",
    "Giáo dục",
    "Sức khỏe",
    "Đầu tư & Tiết kiệm",
    "Khác",
  ],
};

// Hàm định dạng ngày thành DD/MM/YYYY
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Hàm định dạng số với dấu chấm phân cách hàng nghìn
export const formatNumberWithDots = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, ""); // Loại bỏ tất cả ký tự không phải số
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Hàm xử lý khi nhập số tiền
export const handleAmountChange = (
  text: string,
  setTransactionData: React.Dispatch<React.SetStateAction<TransactionInputData>>,
  transactionData: TransactionInputData
) => {
  const rawValue = text.replace(/[^0-9]/g, ""); // Loại bỏ ký tự không phải số
  setTransactionData({
    ...transactionData,
    amount: rawValue, // Lưu giá trị không định dạng
  });
};

// Chuyển ảnh thành base64
export const convertImageToBase64 = async (imageUri: string): Promise<string> => {
  return await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
};

// Xử lý văn bản với Gemini
export const processTextWithGemini = async (extractedText: string) => {
  try {
    console.log("Extracted Text:", extractedText); // Log văn bản trích xuất từ OCR

    const prompt = `
      Tôi sẽ cung cấp cho bạn nội dung của một hóa đơn. Hãy trích xuất thông tin sau:
      - Tổng số tiền của hóa đơn (nếu là chi tiêu thì ghi là "-100000", nếu là thu nhập thì ghi là "100000", không dùng dấu chấm trong số tiền)
      - Danh mục chi tiêu ('Chi phí sinh hoạt', 'Phương tiện đi lại', 'Mua sắm cá nhân', 'Giải trí & Du lịch', 'Giáo dục', 'Sức khỏe', 'Đầu tư & Tiết kiệm', 'Khác')
      - Ngày của hóa đơn (định dạng DD/MM/YYYY)
      - Loại thu chi (income/expense)
      Hãy sử dụng tỷ giá hối đoái hiện tại để chuyển đổi tiền tệ sang VND từ đơn vị tiền tệ gốc được ghi trong hóa đơn (nếu không rõ đơn vị tiền tệ, giả định là VND).
      Đây là nội dung hóa đơn:
      "${extractedText}"

      Trả lời kết quả theo JSON có format:
      {
        "type": "income/expense",
        "totalAmount": "số tiền",
        "category": "danh mục",
        "date": "ngày"
      }
    `;

    const result = await model.generateContent(prompt);

    if (!result.response || !result.response.text) {
      throw new Error("Không nhận được phản hồi từ Gemini.");
    }

    let responseText = result.response.text().trim();
    console.log("Raw Gemini Response:", responseText); // Log phản hồi thô từ Gemini

    responseText = responseText
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .replace(/```/g, "")
      .trim();

    if (!responseText.startsWith("{") || !responseText.endsWith("}")) {
      throw new Error("Phản hồi từ Gemini không phải JSON hợp lệ: " + responseText);
    }

    const jsonResponse = JSON.parse(responseText);
    console.log("Parsed JSON Response:", jsonResponse); // Log JSON đã parse

    if (!jsonResponse.type || !jsonResponse.totalAmount || !jsonResponse.category || !jsonResponse.date) {
      throw new Error("JSON thiếu trường cần thiết: " + JSON.stringify(jsonResponse));
    }

    return jsonResponse;
  } catch (error) {
    console.error("Lỗi xử lý Gemini:", error);
    return null;
  }
};

// Nhận diện văn bản từ ảnh
export const recognizeText = async (
  imageUri: string,
  setTransactionData: React.Dispatch<React.SetStateAction<TransactionInputData>>,
  transactionData: TransactionInputData,
  setLoading: (value: boolean) => void
) => {
  try {
    setLoading(true);
    const base64Image = await convertImageToBase64(imageUri);

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
      {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "TEXT_DETECTION" }],
          },
        ],
      }
    );

    const textAnnotations = response.data.responses[0]?.textAnnotations;
    if (textAnnotations && textAnnotations.length > 0) {
      const extractedText = textAnnotations[0].description;
      const categorizedData = await processTextWithGemini(extractedText);

      if (categorizedData) {
        setTransactionData({
          ...transactionData,
          type: categorizedData.type,
          amount: categorizedData.totalAmount,
          category: categorizedData.category,
          date: categorizedData.date,
        });

        Alert.alert(
          "Kết quả phân loại",
          `Danh mục: ${categorizedData.type}\n ${categorizedData.category}\nTổng tiền: ${categorizedData.totalAmount}\nNgày: ${categorizedData.date}`
        );
      } else {
        Alert.alert("Không thể phân loại dữ liệu!");
      }
    } else {
      Alert.alert("Không tìm thấy văn bản!");
    }
  } catch (error) {
    console.error("Lỗi OCR:", error);
    Alert.alert("Lỗi khi nhận diện văn bản!");
  } finally {
    setLoading(false);
  }
};

// Hàm thêm giao dịch
export const handleAddTransaction = async (
  transactionData: TransactionInputData,
  setTransactionData: React.Dispatch<React.SetStateAction<TransactionInputData>>,
  router: any
) => {
  try {
    const { type, amount, date, note, category } = transactionData;
    if (!amount || !date || !category) {
      Alert.alert("Thông tin bị bỏ trống", "Vui lòng nhập đầy đủ thông tin", [{ text: "OK" }]);
      return;
    }

    await newTransaction(type, amount, date, note, category);
    router.push("/(tabs)/HomeScreen");

    setTransactionData({
      type: "",
      amount: "",
      date: "",
      category: "",
      note: "",
    });
  } catch (error) {
    console.error("Lỗi khi thêm giao dịch:", error);
    Alert.alert("Lỗi khi thêm giao dịch", "Vui lòng thử lại sau", [{ text: "OK" }]);
  }
};

const TransactionInputScreen = () => {
  const navigation = useNavigation();

  const [transactionData, setTransactionData] = useState<TransactionInputData>({
    type: "",
    amount: "",
    date: "",
    category: "",
    note: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<"income" | "expense" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      recognizeText(result.assets[0].uri, setTransactionData, transactionData, setLoading);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "amount") {
      handleAmountChange(value, setTransactionData, transactionData); // Gọi hàm xử lý riêng cho amount
    } else {
      setTransactionData({
        ...transactionData,
        [name]: value,
      });
    }
  };

  const handlePress = (type: "income" | "expense") => {
    setSelectedType(type);
    setModalVisible(true);
  };

  const resetTransactionType = () => {
    setSelectedType(null);
    setSelectedCategory(null);
    setTransactionData({ ...transactionData, type: "", category: "" });
  };

  useEffect(() => {
    setTransactionData({ ...transactionData, note });
  }, [note]);

  return (
    <View className="flex-1 bg-gray-200">
      <View className="flex-1 px-4 py-6">
        <Text className="text-5xl font-interBold text-blue-600 text-center">SpendVibe</Text>

        {!selectedCategory ? (
          <>
            <Text className="text-lg font-interBold mb-2 mt-3">Loại giao dịch:</Text>
            <View className="flex-row space-x-2">
              <Pressable className="bg-blue-600 py-2 px-4 rounded-2xl" onPress={() => handlePress("income")}>
                <Text className="font-interBold text-lg text-center text-white">Thu nhập</Text>
              </Pressable>
              <Pressable className="bg-blue-600 py-2 px-4 rounded-2xl" onPress={() => handlePress("expense")}>
                <Text className="font-interBold text-lg text-center text-white">Chi tiêu</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View className="flex-row justify-between items-center mt-3">
            <Text className="text-lg font-interBold">Loại giao dịch: {selectedCategory}</Text>
            <Pressable className="bg-red-500 py-2 px-4 rounded-md" onPress={resetTransactionType}>
              <Feather name="trash" size={24} color="white" />
            </Pressable>
          </View>
        )}

        <Text className="text-lg font-interBold mt-4 mb-2">Số tiền:</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded mb-4"
          placeholder="Nhập số tiền (VD: 100.000)"
          value={transactionData.amount ? formatNumberWithDots(transactionData.amount) : ""}
          onChangeText={(text) => handleInputChange("amount", text)}
          keyboardType="numeric"
        />

        <Text className="text-lg font-interBold mb-2">Danh mục:</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded mb-4 bg-gray-100"
          placeholder="Danh mục"
          value={transactionData.category}
          editable={false}
        />

        <View className="mt-4">
          <Text className="text-lg font-interBold mb-2">Ghi chú:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-lg"
            placeholder="Nhập ghi chú (tùy chọn)"
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>

        <Text className="text-lg font-interBold mb-2">Ngày giao dịch:</Text>
        <Pressable className="border border-gray-300 p-3 rounded mb-4 bg-gray-100" onPress={() => setShowDatePicker(true)}>
          <Text className="text-gray-700">
            {transactionData.date || "Chọn ngày"}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={transactionData.date ? new Date(transactionData.date.split("/").reverse().join("-")) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate?: Date) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const formattedDate = formatDateToDDMMYYYY(selectedDate);
                handleInputChange("date", formattedDate);
              }
            }}
          />
        )}

        <Button title="Thêm giao dịch" onPress={() => handleAddTransaction(transactionData, setTransactionData, router)} color="blue" />
        <View className="mt-4">
          <Button title="Scan bill" onPress={pickImage} color="blue" />
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-blue-100 bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-4/5 font-interBold">
            <Text className="text-2xl font-interBold mb-4">
              Chọn {selectedType === "income" ? "mục Thu nhập" : "mục Chi tiêu"}
            </Text>
            <FlatList
              data={selectedType ? transactionCategories[selectedType] : []}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  className="py-2 px-4 bg-gray-200 rounded-md mb-2"
                  onPress={() => {
                    setSelectedCategory(item);
                    setTransactionData({ ...transactionData, type: selectedType!, category: item });
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-base">{item}</Text>
                </Pressable>
              )}
            />
            <Pressable className="mt-4 bg-blue-600 py-2 px-4 rounded-md" onPress={() => setModalVisible(false)}>
              <Text className="text-white text-center font-interBold">Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <Navbar />
      </View>
    </View>
  );
};

export default TransactionInputScreen;