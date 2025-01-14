import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

import { Dimensions } from 'react-native';

const HomeScreen = () => {
  
const ThuChi = [
    { id: '1', type: 'Income', amount: 500, date: '2025-01-01' },
    { id: '2', type: 'Expense', amount: 200, date: '2025-01-02' },
    { id: '3', type: 'Income', amount: 800, date: '2025-01-05' },
    { id: '4', type: 'Expense', amount: 400, date: '2025-01-10' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button title="Back to Login" onPress={() => {}} />
        <Text style={styles.username}>Nha nhoi</Text>
      </View>

      {/* Bieu do  */}
      <View style = {{flexDirection: 'row'}}>
        <Button title='Thu nhập '/>
        <Button title='Chi tiêu'/>
      </View>
      <View>
       <Text style = {{borderWidth: 5,
        borderRadius: 5,
        height:200,
        marginBottom: 30
       }}>Bieu do nam o day</Text>
      </View>

      {/* Danh sach thu chi */}
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
      />

     

      {/* thanh cong cu  */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => {}}>
          <Text>Import File</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => {}}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => {}}>
          <Text>List of expenses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(251, 251, 251)'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 5,
    borderColor: 'rgb(196, 217, 255)',
    borderRadius: 20
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgb(196, 217, 255)',
  
  },
  navButton: {
    padding: 10,
    backgroundColor: 'rgb(197, 186, 255)',
    borderRadius: 5
  }
});

export default HomeScreen;
