// NotificationScreen.test.tsx

// Mock Firebase Auth
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signOut: jest.fn(),
    currentUser: {
      uid: 'test-user-id'
    }
  });
});

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import {
    handleMarkAsRead,
    
  } from '../app/screens/notification';
import {  markNotificationAsRead } from '../API/notificationAPI';

// Mock getUserNotifications và markNotificationAsRead từ notificationAPI
jest.mock('../API/notificationAPI', () => ({
  getUserNotifications: jest.fn(),
  markNotificationAsRead: jest.fn(),
}));

// Mock console.error
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('handleMarkAsRead', () => {
  const setNotifications = jest.fn();
  const mockNotifications = [
    {
      id: '1',
      transactionId: 'trans1',
      type: 'income' as const,
      amount: 1000000,
      category: 'Salary',
      message: 'Received 1,000,000 VND from Salary',
      createdAt: '2023-10-01T10:00:00Z',
      read: false,
    },
    {
      id: '2',
      transactionId: 'trans2',
      type: 'expense' as const,
      amount: 500000,
      category: 'Food',
      message: 'Spent 500,000 VND on Food',
      createdAt: '2023-10-02T10:00:00Z',
      read: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (markNotificationAsRead as jest.Mock).mockReset();
    setNotifications.mockReset();
    mockConsoleError.mockClear();
  });

  // Hàm testHandleMarkAsRead 
  const testHandleMarkAsRead = async () => {
    // Trường hợp 1: Đánh dấu thông báo là đã đọc thành công
    (markNotificationAsRead as jest.Mock).mockResolvedValueOnce(undefined);
    await handleMarkAsRead('1', setNotifications, mockNotifications);

    expect(markNotificationAsRead).toHaveBeenCalledWith('1');
    expect(setNotifications).toHaveBeenCalledWith([
      { ...mockNotifications[0], read: true },
      mockNotifications[1],
    ]);
    expect(mockConsoleError).not.toHaveBeenCalled();

    // Reset các mock trước khi kiểm tra trường hợp 2
    jest.clearAllMocks();
    (markNotificationAsRead as jest.Mock).mockReset();
    setNotifications.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 2: Đánh dấu thông báo thất bại
    const error = new Error('API error');
    (markNotificationAsRead as jest.Mock).mockRejectedValueOnce(error);
    await handleMarkAsRead('1', setNotifications, mockNotifications);

    expect(markNotificationAsRead).toHaveBeenCalledWith('1');
    expect(setNotifications).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('Error marking notification as read:', error);
  };

  // Gọi hàm testHandleMarkAsRead trong it
  it('should handle all mark as read scenarios', testHandleMarkAsRead);
});