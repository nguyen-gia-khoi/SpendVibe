import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

interface TransactionInputData {
    type: string;
    amount: string;
    date: string;
}

const TransactionInputScreen = () => {
  const navigation = useNavigation();

  const [transactionData, setTransactionData] = useState<TransactionInputData>({
      type: '',
      amount: '',
      date: '',
  })

  const handleInputChange = (name: string, value: string) => {
      setTransactionData({
          ...transactionData,
          [name]: value,
      })
  }

  const handleAddTransaction = () => {
    const { type, amount, date } = transactionData;
  
    if (!type || !amount || !date) {
      Alert.alert('Thông tin bị bỏ trống', 'Vui lòng nhập đầy đủ thông tin', [
        { text: 'OK' },
      ]);
      return;
    }
  
    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      date,
    };
  
    
    const queryString = new URLSearchParams({
      id: newTransaction.id,
      type: newTransaction.type,
      amount: newTransaction.amount.toString(),
      date: newTransaction.date,
    }).toString();
  
 
    router.push('/(tabs)/HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Loại giao dịch:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập loại giao dịch (VD: Tiền ăn)"
        value={transactionData.type}
        onChangeText={(text) => handleInputChange('type', text)}
      />

      <Text style={styles.label}>Số tiền:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số tiền (VD: 100000)"
        value={transactionData.amount}
        onChangeText={(text) => handleInputChange('amount', text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ngày giao dịch:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập ngày (VD: 2025-02-05)"
        value={transactionData.date}
        onChangeText={(text) => handleInputChange('date', text)}
      />

      <Button title="Thêm giao dịch" onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F2FD',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default TransactionInputScreen;