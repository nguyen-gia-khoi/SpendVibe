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
    fetchNotifications,
    handleMarkAsRead,
    formatNumberWithDots,
    formatDateTime,
  } from '../app/screens/notification';
  import { getUserNotifications, markNotificationAsRead } from '../API/notificationAPI';
  
  // Mock getUserNotifications và markNotificationAsRead từ notificationAPI
  jest.mock('../API/notificationAPI', () => ({
    getUserNotifications: jest.fn(),
    markNotificationAsRead: jest.fn(),
  }));
  
  // Mock console.error
  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  describe('fetchNotifications', () => {
    const setNotifications = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
      (getUserNotifications as jest.Mock).mockReset();
      setNotifications.mockReset();
      mockConsoleError.mockClear();
    });
  
    // Test case 1: Lấy thông báo thành công
    const testFetchNotificationsSuccess = async () => {
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
      ];
      (getUserNotifications as jest.Mock).mockResolvedValueOnce(mockNotifications);
      await fetchNotifications('user123', setNotifications);
  
      expect(getUserNotifications).toHaveBeenCalledWith('user123');
      expect(setNotifications).toHaveBeenCalledWith(mockNotifications);
      expect(mockConsoleError).not.toHaveBeenCalled();
    };
  
    // Test case 2: Lấy thông báo thất bại
    const testFetchNotificationsFailure = async () => {
      const error = new Error('API error');
      (getUserNotifications as jest.Mock).mockRejectedValueOnce(error);
      await fetchNotifications('user123', setNotifications);
  
      expect(getUserNotifications).toHaveBeenCalledWith('user123');
      expect(setNotifications).not.toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalledWith('Error fetching notifications:', error);
    };
  
   
    it('should fetch notifications successfully and update state', testFetchNotificationsSuccess);
    it('should handle fetch notifications failure and log error', testFetchNotificationsFailure);
  });
  
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
  
    // Test case 1: Đánh dấu thông báo là đã đọc thành công
    const testMarkAsReadSuccess = async () => {
      (markNotificationAsRead as jest.Mock).mockResolvedValueOnce(undefined);
      await handleMarkAsRead('1', setNotifications, mockNotifications);
  
      expect(markNotificationAsRead).toHaveBeenCalledWith('1');
      expect(setNotifications).toHaveBeenCalledWith([
        { ...mockNotifications[0], read: true },
        mockNotifications[1],
      ]);
      expect(mockConsoleError).not.toHaveBeenCalled();
    };
  
    // Test case 2: Đánh dấu thông báo thất bại
    const testMarkAsReadFailure = async () => {
      const error = new Error('API error');
      (markNotificationAsRead as jest.Mock).mockRejectedValueOnce(error);
      await handleMarkAsRead('1', setNotifications, mockNotifications);
  
      expect(markNotificationAsRead).toHaveBeenCalledWith('1');
      expect(setNotifications).not.toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalledWith('Error marking notification as read:', error);
    };
  
    
    it('should mark notification as read successfully and update state', testMarkAsReadSuccess);
    it('should handle mark as read failure and log error', testMarkAsReadFailure);
  });
  
  describe('formatNumberWithDots', () => {
    // Test case 1: Định dạng số nhỏ (không cần dấu chấm)
    const testFormatSmallNumber = () => {
      const result = formatNumberWithDots(123);
      expect(result).toBe('123');
    };
  
    // Test case 2: Định dạng số lớn (cần dấu chấm)
    const testFormatLargeNumber = () => {
      const result = formatNumberWithDots(1234567);
      expect(result).toBe('1.234.567');
    };
  
    // Test case 3: Định dạng số 0
    const testFormatZero = () => {
      const result = formatNumberWithDots(0);
      expect(result).toBe('0');
    };
  
    
    it('should format small number without dots', testFormatSmallNumber);
    it('should format large number with dots', testFormatLargeNumber);
    it('should format zero correctly', testFormatZero);
  });
  
  describe('formatDateTime', () => {
    // Test case 1: Định dạng ngày hợp lệ
    const testFormatValidDate = () => {
      const dateString = '2023-10-01T10:00:00Z';
      const result = formatDateTime(dateString);
      const expected = new Date(dateString).toLocaleString();
      expect(result).toBe(expected);
    };
  
    // Test case 2: Định dạng ngày không hợp lệ
    const testFormatInvalidDate = () => {
      const dateString = 'invalid-date';
      const result = formatDateTime(dateString);
      expect(result).toBe('Invalid Date');
    };
  
   
    it('should format valid date correctly', testFormatValidDate);
    it('should handle invalid date and return "Invalid Date"', testFormatInvalidDate);
  });