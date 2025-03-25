// __tests__/TransactionInputScreen/convertImageToBase64.test.tsx
import { convertImageToBase64 } from '../../app/screens/transactionInput';
import * as FileSystem from 'expo-file-system';

// Mock Firebase Auth
jest.mock('@react-native-firebase/auth', () => {
  const mockAuth = () => ({
    currentUser: {
      uid: 'test-uid',
      email: 'test@example.com',
      getIdToken: jest.fn(() => Promise.resolve('mock-token')),
    },
    onAuthStateChanged: jest.fn((callback) => {
      callback({ uid: 'test-uid', email: 'test@example.com' });
      return jest.fn();
    }),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
    signOut: jest.fn(() => Promise.resolve()),
  });
  return {
    __esModule: true,
    default: mockAuth,
  };
});

// Mock FileSystem
jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn(),
  EncodingType: {
    Base64: 'base64',
  },
}));

describe('convertImageToBase64', () => {
  beforeEach(() => {
    (FileSystem.readAsStringAsync as jest.Mock).mockReset();
  });

  // Test case 1: Chuyển ảnh thành base64 thành công
  const testConvertImageSuccess = async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce('base64string');
    const result = await convertImageToBase64('file://image.jpg');
    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith('file://image.jpg', { encoding: 'base64' });
    expect(result).toBe('base64string');
  };

  // Test case 2: Xử lý lỗi khi đọc file thất bại
  const testConvertImageFailure = async () => {
    const error = new Error('Failed to read file');
    (FileSystem.readAsStringAsync as jest.Mock).mockRejectedValueOnce(error);
    await expect(convertImageToBase64('file://image.jpg')).rejects.toThrow('Failed to read file');
    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith('file://image.jpg', { encoding: 'base64' });
  };

  // Gọi các test case bằng it
  it('should convert image to base64 successfully', testConvertImageSuccess);
  it('should handle error when reading file fails', testConvertImageFailure);
});