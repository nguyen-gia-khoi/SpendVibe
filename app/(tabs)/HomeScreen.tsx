import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff, } from "lucide-react-native";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import LineChartExample from '../screens/chart';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';

interface TransactionData {
  id: string; 
  type: string; 
  amount: number; 
  date: string;
}



const HomeScreen = () => {
  
  const { id, type, amount, date } = useLocalSearchParams();
  
  const logout = async () => {
    try {
        await auth().signOut // Firebase sign out
        // await AsyncStorage.clear(); // Clear AsyncStorage
        console.log("User logged out and data erased");
  
        // Redirect to login screen
        router.replace("/screens/login");
    } catch (error) {
        console.error("Logout Error:", error);
    }
  };
useEffect(() => {
  if (id && type && amount && date) {
    setThuChi((prevThuChi) => [
      ...prevThuChi,
      {
        id: id as string,
        type: type as string,
        amount: parseFloat(amount as string),
        date: date as string,
      },
    ]);
  }
}, [id, type, amount, date]);

  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false , footerShown: false});
  }, [navigation]);
  
  const [isVisible, setIsVisible] = useState<boolean>(true);
  //data thu chi
const [ThuChi, setThuChi] = useState<TransactionData[]>([  
  { id: '1', type: 'Tien an', amount: 100, date: '2025-01-01' },
  { id: '2', type: 'Tien nuoc', amount: 200, date: '2025-02-02' },
  { id: '3', type: 'Tien dien', amount: 300, date: '2025-03-03' },
  { id: '4', type: 'Tien mua sam', amount: 400, date: '2025-04-04' },
  { id: '5', type: 'Tien sua xe', amount: 500, date: '2025-05-05' },
  { id: '6', type: 'Tien an ', amount: 100, date: '2025-06-01' },
  { id: '7', type: 'Tien nuoc', amount: 200, date: '2025-07-02' },
  { id: '8', type: 'Tien dien', amount: 300, date: '2025-08-03' },
  { id: '9', type: 'Tien mua sam', amount: 400, date: '2025-09-04' },
  { id: '10', type: 'Tien trung ca cuoc', amount: 500, date: '2025-10-05' },
  { id: '11', type: 'Tien trung so', amount: 400, date: '2025-11-04' },
  { id: '12', type: 'Tien trung loto', amount: 500, date: '2025-12-05' },
]);

  function randomInterger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{
        fontSize: 30,
        fontWeight: "bold",
        color: "#4A90E2",}}>SpendVibe
        </Text>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={styles.username}>Nha nhoi</Text>
            <FontAwesome name="user-circle-o" size={24} color="#4A90E2" />
          </View> 
      </View>

      <View style={styles.taikhoan}>
  <Text style={styles.taikhoanLabel}>Số dư hiện tại</Text>
  <View style={styles.taikhoanContent}>
    <Text style={styles.taikhoanText}>
      {isVisible ? "1.000.000" : "******"}
    </Text>
    <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
      {isVisible ? <EyeOff size={24} color="black" /> : <Eye size={24} color="black" />}
    </TouchableOpacity>
  </View>
</View>

      {/* Bieu do  */}
      <View style = {{flexDirection: 'row'  }}>
        <TouchableOpacity style = {styles.buttonThuChi} onPressIn={() => {}}>
          <Text>
            Thu nhap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonThuChi} onPressIn={() => {}}>
          <Text>
            Chi tieu
          </Text>
        </TouchableOpacity>
      </View>
     
     {/* Bieu do nam o day*/}
        <LineChartExample/>
      
     
      {/* Danh sach thu chi */}
      <Text style = {{fontSize:20, color:'rgb(185, 209, 255)', marginLeft: 20}}>Transaction History</Text>
      
      <Pressable>
        <Link href="/screens/transactionInput"> {/* No params here */}
          <Text>Thêm chi tiêu</Text>
        </Link>
      </Pressable>

      <FlatList
        data={ThuChi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.type}</Text>
            <Text>{item.amount} K</Text>
            <Text>{item.date}</Text>
          </View>
        )}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      />


     

      {/* thanh cong cu  */}
      <View style={styles.navbar}>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity  onPress={() => {}}>
        <MaterialIcons name="home" size={30} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        </View>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity  onPress={() => {}}>
        <Feather name="edit" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        </View>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity onPress={() => {}}>
        <Ionicons name="notifications-outline" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        </View>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity onPress={() => logout()}>
        <AntDesign name="user" size={24} color="rgb(57, 30, 191)" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD', // Màu xanh dương nhạt
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
   
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginRight: 5,
  
  },
  taikhoan: {
    backgroundColor: "#1E88E5",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    marginBottom:25,
    marginHorizontal: 40,
  },
  taikhoanLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  taikhoanContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  taikhoanText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonThuChi: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    marginLeft:5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  historyTitle: {
    fontSize: 20,
    color: '#0D47A1',
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#BBDEFB",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  itemText: {
    flex: 1,                
    textAlign: "center",     
    color: "#0D47A1",
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#1976D2',
    bottom: 0,
    alignItems: 'center',
   
   
    
  },
  navButton: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    
  },
  navButtonText: {
    color: 'white',
  },
});

export default HomeScreen;


