// __tests__/TransactionInputScreen/recognizeText-test.tsx

import { recognizeText } from '../../app/screens/transactionInput';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

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

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

// Mock processTextWithGemini directly
const mockProcessTextWithGemini = jest.fn();
jest.mock('../../app/screens/transactionInput', () => {
  const actualModule = jest.requireActual('../../app/screens/transactionInput');
  return {
    ...actualModule,
    processTextWithGemini: mockProcessTextWithGemini,
  };
});

// Mock GOOGLE_VISION_API_KEY in process.env
const originalEnv = process.env;
beforeAll(() => {
  process.env = {
    ...originalEnv,
    GOOGLE_VISION_API_KEY: 'mock-api-key',
  };
});

describe('recognizeText', () => {
  const setTransactionData = jest.fn();
  const setLoading = jest.fn();
  const transactionData = {
    type: '',
    amount: '',
    date: '',
    category: '',
    note: '',
  };

  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    (FileSystem.readAsStringAsync as jest.Mock).mockReset();
    (axios.post as jest.Mock).mockReset();
    (axios.get as jest.Mock).mockReset();
    mockProcessTextWithGemini.mockReset();
    setTransactionData.mockReset();
    setLoading.mockReset();
    mockConsoleError.mockClear();
  });

  // Test case 1: Nhận diện văn bản thành công và cập nhật transactionData
  const testRecognizeTextSuccess = async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce('base64string');
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        responses: [
          {
            textAnnotations: [
              {
                description: 'Hóa đơn: 100,000 VND, Chi phí sinh hoạt, 15/10/2023',
              },
            ],
          },
        ],
      },
    });

    // Mock processTextWithGemini
    mockProcessTextWithGemini.mockResolvedValueOnce({
      type: 'expense',
      totalAmount: '-100000',
      category: 'Chi phí sinh hoạt',
      date: '15/10/2023',
    });

    await recognizeText('file://image.jpg', setTransactionData, transactionData, setLoading);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      type: 'expense',
      amount: '-100000',
      category: 'Chi phí sinh hoạt',
      date: '15/10/2023',
    });
    expect(setLoading).toHaveBeenCalledWith(false);
  };

  // Test case 2: Xử lý lỗi khi không tìm thấy văn bản trong ảnh
  const testRecognizeTextNoText = async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce('base64string');
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        responses: [
          {
            textAnnotations: [],
          },
        ],
      },
    });

    await recognizeText('file://image.jpg', setTransactionData, transactionData, setLoading);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setTransactionData).not.toHaveBeenCalled();
    expect(setLoading).toHaveBeenCalledWith(false);
  };

  // Test case 3: Xử lý lỗi khi API Google Vision thất bại
  const testRecognizeTextAPIFailure = async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce('base64string');
    const error = new Error('API error');
    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    await recognizeText('file://image.jpg', setTransactionData, transactionData, setLoading);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(mockConsoleError).toHaveBeenCalledWith('Lỗi OCR:', error);
    expect(setTransactionData).not.toHaveBeenCalled();
    expect(setLoading).toHaveBeenCalledWith(false);
  };

  // Test case 4: Xử lý lỗi khi processTextWithGemini trả về null
  const testRecognizeTextGeminiFailure = async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce('base64string');
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        responses: [
          {
            textAnnotations: [
              {
                description: 'Hóa đơn: 100,000 VND',
              },
            ],
          },
        ],
      },
    });

    mockProcessTextWithGemini.mockResolvedValueOnce(null);

    await recognizeText('file://image.jpg', setTransactionData, transactionData, setLoading);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setTransactionData).not.toHaveBeenCalled();
    expect(setLoading).toHaveBeenCalledWith(false);
  };

  // Gọi các test case bằng it
  it('should recognize text successfully and update transactionData', testRecognizeTextSuccess);
  it('should handle no text found in image', testRecognizeTextNoText);
  it('should handle Google Vision API failure', testRecognizeTextAPIFailure);
  it('should handle failure when processTextWithGemini returns null', testRecognizeTextGeminiFailure);
});