import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Pressable, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Navbar from './navbar';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';

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
          <Button title="Scan bill" onPress={() => {}} color="blue" />
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