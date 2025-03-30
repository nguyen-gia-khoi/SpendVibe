// Account.test.tsx

import { fetchSummary, logout, formatNumberWithDots } from '../app/screens/account';
import { getUserTransactionSummary } from '../API/authAPI';

// Mock Firebase Auth
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signOut: jest.fn(),
    currentUser: {
      uid: 'test-user-id',
      displayName: 'Test User',
      email: 'test@example.com'
    }
  });
});

// Mock getUserTransactionSummary từ authAPI
jest.mock('../API/authAPI', () => ({
  getUserTransactionSummary: jest.fn(),
}));

// Mock console.error và console.log
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Định nghĩa kiểu Router
interface Router {
  replace: jest.Mock;
  push: jest.Mock;
  navigate: jest.Mock;
  back: jest.Mock;
  canGoBack: jest.Mock;
  setParams: jest.Mock;
  dismiss: jest.Mock;
  dismissAll: jest.Mock;
  canDismiss: jest.Mock;
}

// Định nghĩa mockRouter với kiểu Router
const mockRouter: Router = {
  replace: jest.fn() as jest.Mock,
  push: jest.fn() as jest.Mock,
  navigate: jest.fn() as jest.Mock,
  back: jest.fn() as jest.Mock,
  canGoBack: jest.fn().mockReturnValue(false) as jest.Mock,
  setParams: jest.fn() as jest.Mock,
  dismiss: jest.fn() as jest.Mock,
  dismissAll: jest.fn() as jest.Mock,
  canDismiss: jest.fn().mockReturnValue(false) as jest.Mock,
};

describe('Account Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleError.mockClear();
    mockConsoleLog.mockClear();
  });

  // Hàm testUserInfo
  const testUserInfo = () => {
    const auth = require('@react-native-firebase/auth')();
    expect(auth.currentUser.displayName).toBe('Test User');
    expect(auth.currentUser.email).toBe('test@example.com');
    expect(auth.currentUser.uid).toBe('test-user-id');
  };

  // Hàm testTransactionSummary
  const testTransactionSummary = async () => {
    const mockSetSummary = jest.fn();
    const mockSummaryData = {
      totalIncome: 1000000,
      totalSpent: 500000
    };

    // Test daily summary
    (getUserTransactionSummary as jest.Mock).mockResolvedValueOnce(mockSummaryData);
    await fetchSummary('test-user-id', 'day', mockSetSummary);
    expect(getUserTransactionSummary).toHaveBeenCalledWith('test-user-id', 'day');
    expect(mockSetSummary).toHaveBeenCalledWith(mockSummaryData);

    // Reset mocks
    jest.clearAllMocks();
    mockSetSummary.mockClear();

    // Test monthly summary
    (getUserTransactionSummary as jest.Mock).mockResolvedValueOnce(mockSummaryData);
    await fetchSummary('test-user-id', 'month', mockSetSummary);
    expect(getUserTransactionSummary).toHaveBeenCalledWith('test-user-id', 'month');
    expect(mockSetSummary).toHaveBeenCalledWith(mockSummaryData);

    // Reset mocks
    jest.clearAllMocks();
    mockSetSummary.mockClear();

    // Test yearly summary
    (getUserTransactionSummary as jest.Mock).mockResolvedValueOnce(mockSummaryData);
    await fetchSummary('test-user-id', 'year', mockSetSummary);
    expect(getUserTransactionSummary).toHaveBeenCalledWith('test-user-id', 'year');
    expect(mockSetSummary).toHaveBeenCalledWith(mockSummaryData);

    // Reset mocks
    jest.clearAllMocks();
    mockSetSummary.mockClear();

    // Test error case
    const error = new Error('Failed to fetch summary');
    (getUserTransactionSummary as jest.Mock).mockRejectedValueOnce(error);
    await fetchSummary('test-user-id', 'day', mockSetSummary);
    expect(getUserTransactionSummary).toHaveBeenCalledWith('test-user-id', 'day');
    expect(mockSetSummary).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('Error fetching summary:', error);
  };

  // Hàm testNumberFormatting
  const testNumberFormatting = () => {
    expect(formatNumberWithDots(1000000)).toBe('1.000.000');
    expect(formatNumberWithDots(500000)).toBe('500.000');
    expect(formatNumberWithDots(1000)).toBe('1.000');
    expect(formatNumberWithDots(100)).toBe('100');
  };

  // Hàm testLogout 
  const testLogout = async () => {
    const signOut = jest.fn();

    // Trường hợp 1: Đăng xuất thành công
    signOut.mockResolvedValueOnce(undefined);
    await logout(signOut, mockRouter);

    expect(signOut).toHaveBeenCalled();
    expect(mockRouter.replace).toHaveBeenCalledWith('/screens/login');
    expect(mockConsoleLog).toHaveBeenCalledWith('User logged out and data erased');
    expect(mockConsoleError).not.toHaveBeenCalled();

    // Reset các mock trước khi kiểm tra trường hợp 2
    jest.clearAllMocks();
    signOut.mockReset();
    mockRouter.replace.mockReset();
    mockRouter.replace.mockClear();
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();

    // Trường hợp 2: Đăng xuất thất bại
    const error = new Error('Logout failed');
    signOut.mockRejectedValueOnce(error);
    await logout(signOut, mockRouter);

    expect(signOut).toHaveBeenCalled();
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockConsoleLog).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('Logout Error:', error);
  };

  // Gọi các hàm test trong các it block
  it('should display correct user information', testUserInfo);
  it('should handle all transaction summary scenarios', testTransactionSummary);
  it('should format numbers with dots correctly', testNumberFormatting);
  it('should handle all logout scenarios', testLogout);
});