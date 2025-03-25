// Account.test.tsx

import { fetchSummary, logout, formatNumberWithDots } from '../app/screens/account';
import { getUserTransactionSummary } from '../API/authAPI';

// Mock Firebase Auth
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signOut: jest.fn(),
    currentUser: {
      uid: 'test-user-id'
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

describe('logout', () => {
  const signOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    signOut.mockReset();
    mockRouter.replace.mockReset();
    mockRouter.replace.mockClear();
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
  });

  // Hàm testLogout 
  const testLogout = async () => {
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

  // Gọi hàm testLogout trong it
  it('should handle all logout scenarios', testLogout);
});