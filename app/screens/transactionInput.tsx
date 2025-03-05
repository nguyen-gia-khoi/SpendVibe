import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Pressable, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Navbar from './navbar';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_VISION_API_KEY = 'AIzaSyA6AjixXUNl-y2egUortvsH8H6G8w0azpg';


const genAI = new GoogleGenerativeAI("AIzaSyBgte7Mk-wy-XcxRan_-cK82-Iei9ZKLec");

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });




interface TransactionInputData {
  type: string;
  amount: string;
  date: string;
}

const transactionCategories = {
  income: [
    'Lương & Thu nhập ',
    'Thu nhập phụ',
    'Đầu tư',
    'Kinh doanh',
    'Tiền thưởng & Quà tặng',
    'Tiền hoàn trả',
    'Khác',
  ],
  expense: [
    'Chi phí sinh hoạt',
    'Phương tiện đi lại',
    'Mua sắm cá nhân',
    'Giải trí & Du lịch',
    'Giáo dục',
    'Sức khỏe',
    'Đầu tư & Tiết kiệm',
    'Khác',
  ],
};

const TransactionInputScreen = () => {
  const navigation = useNavigation();

  const [transactionData, setTransactionData] = useState<TransactionInputData>({
    type: '',
    amount: '',
    date: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<'income' | 'expense' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  
    // 🖼️ Chọn ảnh từ thư viện
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        recognizeText(result.assets[0].uri);
      }
    };
  
    // 🔄 Chuyển ảnh thành base64
    const convertImageToBase64 = async (imageUri: string): Promise<string> => {
      return await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
    };
  
    // 🧠 Gửi ảnh lên Google Vision API để lấy văn bản
    const recognizeText = async (imageUri: string) => {
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
        console.log("OCR Response:", response.data.responses[0]);
        if (textAnnotations && textAnnotations.length > 0) {
          const extractedText = textAnnotations[0].description;
          console.log("OCR Result:", extractedText);
          
          // Tìm tổng tiền từ hóa đơn
          const totalAmount = extractTotalAmount(extractedText);
          if (totalAmount) {
            setTransactionData({ ...transactionData, amount: totalAmount });
            Alert.alert("Tổng tiền:", `Đã nhận diện được số tiền: ${totalAmount}`);
          } else {
            Alert.alert("Không tìm thấy tổng tiền trong hóa đơn!");
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
  
    // 🔎 Tìm tổng tiền trong văn bản OCR
    // const extractTotalAmount = (text: string): string | null => {
    //   // const regex = /(?:Tổng cộng|Tổng tiền|Total|Amount|Grand Total)[:\s]*([\d,.]+)/i;
    //   const regex = /(?:Tổng cộng|Tổng tiền|Total|Amount|Grand Total)[^\d]*([\d,.]+)/i;
    //   const match = text.match(regex);
    //   return match ? match[1].replace(/,/g, '') : null;
    // };
  
    const extractTotalAmount = (text: string): string | null => {
      const regex = /(?:Tổng cộng|Tổng tiền|Tổng:|Total|Amount|Grand Total)[^\d]*([\d,.]+)/i;
      const match = text.match(regex);
      console.log("Regex Match:", match); // Kiểm tra xem regex có tìm thấy kết quả không
      return match ? match[1].replace(/,/g, '') : null;
    };

  const handleInputChange = (name: string, value: string) => {
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  const handleAddTransaction = () => {
    const { type, amount, date } = transactionData;
    if (!type || !amount || !date) {
      Alert.alert('Thông tin bị bỏ trống', 'Vui lòng nhập đầy đủ thông tin', [{ text: 'OK' }]);
      return;
    }
    router.push('/(tabs)/HomeScreen');
  };

  const handlePress = (type: 'income' | 'expense') => {
    setSelectedType(type);
    setModalVisible(true);
  };

  const resetTransactionType = () => {
    setSelectedType(null);
    setSelectedCategory(null);
    setTransactionData({ ...transactionData, type: '' });
  };

  return (
    <View className="flex-1">
      <View className="flex-1 px-4 py-6">
        <Text className="text-5xl font-interBold text-blue-600 text-center">SpendVibe</Text>

        {!selectedCategory ? (
          <>
            <Text className="text-lg font-interBold mb-2 mt-3">Loại giao dịch:</Text>
            <View className="flex-row space-x-2 ">
              <Pressable className="bg-blue-600 py-2 px-4 rounded-2xl " onPress={() => handlePress('income')}>
                <Text className="font-interBold text-lg text-center text-white">Thu nhập</Text>
              </Pressable>
              <Pressable className="bg-blue-600 py-2 px-4 rounded-2xl" onPress={() => handlePress('expense')}>
                <Text className="font-interBold text-lg text-center text-white">Chi tiêu</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View className="flex-row justify-between items-center mt-3 ">
            <Text className="text-lg font-interBold">Loại giao dịch: {selectedCategory}</Text>
            <Pressable className="bg-red-500 py-2 px-4 rounded-md" onPress={resetTransactionType}>
            <Feather name="trash" size={24} color="white" />
            </Pressable>
          </View>
        )}

        <Text className="text-lg font-interBold mt-4 mb-2">Số tiền:</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded mb-4"
          placeholder="Nhập số tiền (VD: 100000)"
          value={transactionData.amount}
          onChangeText={(text) => handleInputChange('amount', text)}
          keyboardType="numeric"
        />

        <Text className="text-lg font-interBold mb-2">Ngày giao dịch:</Text>
        <Pressable className="border border-gray-300 p-3 rounded mb-4 bg-gray-100" onPress={() => setShowDatePicker(true)}>
          <Text className="text-gray-700">{transactionData.date ? transactionData.date.toString() : 'Chọn ngày'}</Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={transactionData.date ? new Date(transactionData.date) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate?: Date) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleInputChange('date', selectedDate.toISOString().split('T')[0]);
              }
            }}
          />
        )}

        <Button title="Thêm giao dịch" onPress={handleAddTransaction} color="blue" />

        <View className="mt-4">
          <Button title="Scan bill" onPress={pickImage} color="blue" />
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-blue-100 bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-4/5 font-interBold">
            <Text className="text-2xl font-interBold mb-4">
              Chọn {selectedType === 'income' ? 'mục Thu nhập' : 'mục Chi tiêu'}
            </Text>
            <FlatList
              data={selectedType ? transactionCategories[selectedType] : []}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  className="py-2 px-4 bg-gray-200 rounded-md mb-2"
                  onPress={() => {
                    setSelectedCategory(item);
                    setTransactionData({ ...transactionData, type: selectedType! });
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



// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";
// import { MediaTypeOptions } from '../../node_modules/expo-image-picker/build/ImagePicker.types';

// const GOOGLE_VISION_API_KEY = "AIzaSyA6AjixXUNl-y2egUortvsH8H6G8w0azpg"; // 🔑 Nhập API Key của bạn

// const OCRScan = () => {
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [textResult, setTextResult] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // 🖼️ Chọn ảnh từ thư viện
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//       recognizeText(result.assets[0].uri);
//     }
//   };

//   // 🧠 Gửi ảnh lên Google Cloud Vision API để nhận diện văn bản
//   const recognizeText = async (imageUri: string) => {
//     try {
//       setLoading(true);
//       setTextResult(null);

//       // Chuyển ảnh thành base64
//       const base64Image = await convertImageToBase64(imageUri);

//       const response = await axios.post(
//         `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
//         {
//           requests: [
//             {
//               image: { content: base64Image },
//               features: [{ type: "TEXT_DETECTION" }],
//             },
//           ],
//         }
//       );

//       const textAnnotations = response.data.responses[0].textAnnotations;
//       if (textAnnotations && textAnnotations.length > 0) {
//         setTextResult(textAnnotations[0].description);
//       } else {
//         setTextResult("Không tìm thấy văn bản nào!");
//       }
//     } catch (error) {
//       console.error("Lỗi OCR:", error);
//       setTextResult("Lỗi khi nhận diện văn bản.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔄 Chuyển ảnh thành base64 để gửi lên API
//   const convertImageToBase64 = async (imageUri: string): Promise<string> => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = reader.result?.toString().split(",")[1];
//         resolve(base64data || "");
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

// console.log(textResult);

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
//       <TouchableOpacity onPress={pickImage} style={{ backgroundColor: "#007AFF", padding: 15, borderRadius: 10 }}>
//         <Text style={{ color: "white", fontWeight: "bold" }}>📷 Chọn Ảnh</Text>
//       </TouchableOpacity>{imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}

//       {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

//       {textResult && (
//         <ScrollView style={{ marginTop: 20, maxHeight: 300, width: "100%", backgroundColor: "#f0f0f0", padding: 10, borderRadius: 10 }}>
//           <Text>{textResult}</Text>
//         </ScrollView>
//       )}
//     </View>
//   );
// };


// export default OCRScan;



// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, Alert, Pressable, Modal, FlatList, Image, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import axios from 'axios';

// const GOOGLE_VISION_API_KEY = "AIzaSyA6AjixXUNl-y2egUortvsH8H6G8w0azpg"; // 🔑 Thay bằng API Key của bạn

// const TransactionInputScreen = () => {
//   const [transactionData, setTransactionData] = useState({ type: '', amount: '', date: '' });
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   // 🖼️ Chọn ảnh từ thư viện
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//       recognizeText(result.assets[0].uri);
//     }
//   };

//   // 🔄 Chuyển ảnh thành base64
//   const convertImageToBase64 = async (imageUri: string): Promise<string> => {
//     return await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
//   };

//   // 🧠 Gửi ảnh lên Google Vision API để lấy văn bản
//   const recognizeText = async (imageUri: string) => {
//     try {
//       setLoading(true);
//       const base64Image = await convertImageToBase64(imageUri);

//       const response = await axios.post(
//         `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
//         {
//           requests: [
//             {
//               image: { content: base64Image },
//               features: [{ type: "TEXT_DETECTION" }],
//             },
//           ],
//         }
//       );

//       const textAnnotations = response.data.responses[0]?.textAnnotations;
//       console.log("OCR Response:", response.data.responses[0]);
//       if (textAnnotations && textAnnotations.length > 0) {
//         const extractedText = textAnnotations[0].description;
//         console.log("OCR Result:", extractedText);
        
//         // Tìm tổng tiền từ hóa đơn
//         const totalAmount = extractTotalAmount(extractedText);
//         if (totalAmount) {
//           setTransactionData({ ...transactionData, amount: totalAmount });
//           Alert.alert("Tổng tiền:", `Đã nhận diện được số tiền: ${totalAmount}`);
//         } else {
//           Alert.alert("Không tìm thấy tổng tiền trong hóa đơn!");
//         }
//       } else {
//         Alert.alert("Không tìm thấy văn bản!");
//       }
//     } catch (error) {
//       console.error("Lỗi OCR:", error);
//       Alert.alert("Lỗi khi nhận diện văn bản!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔎 Tìm tổng tiền trong văn bản OCR
//   // const extractTotalAmount = (text: string): string | null => {
//   //   // const regex = /(?:Tổng cộng|Tổng tiền|Total|Amount|Grand Total)[:\s]*([\d,.]+)/i;
//   //   const regex = /(?:Tổng cộng|Tổng tiền|Total|Amount|Grand Total)[^\d]*([\d,.]+)/i;
//   //   const match = text.match(regex);
//   //   return match ? match[1].replace(/,/g, '') : null;
//   // };

//   const extractTotalAmount = (text: string): string | null => {
//     const regex = /(?:Tổng cộng|Tổng tiền|Tổng|Total|Amount|Grand Total)[^\d]*([\d,.]+)/i;
//     const match = text.match(regex);
//     console.log("Regex Match:", match); // Kiểm tra xem regex có tìm thấy kết quả không
//     return match ? match[1].replace(/,/g, '') : null;
//   };
  
//   return (
//     <View className="flex-1 px-4 py-6">
//       <Text className="text-5xl font-interBold text-blue-600 text-center">SpendVibe</Text>

//       <Text className="text-lg font-interBold mt-4 mb-2">Số tiền:</Text>
//       <TextInput
//         className="border border-gray-300 p-3 rounded mb-4"
//         placeholder="Nhập số tiền (VD: 100000)"
//         value={transactionData.amount}
//         onChangeText={(text) => setTransactionData({ ...transactionData, amount: text })}
//         keyboardType="numeric"
//       />

//       {/* Nút Scan Bill */}
//       <Pressable className="bg-blue-600 py-2 px-4 rounded-2xl mt-2" onPress={pickImage}>
//         <Text className="font-interBold text-lg text-center text-white">📷 Scan Bill</Text>
//       </Pressable>

//       {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

//       {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
//     </View>
//   );
// };

// export default TransactionInputScreen;
