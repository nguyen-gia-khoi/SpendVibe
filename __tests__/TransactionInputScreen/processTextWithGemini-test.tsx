// __tests__/TransactionInputScreen/processTextWithGemini.test.tsx

import { processTextWithGemini } from '../../app/screens/transactionInput';

// Mock the entire transactionInput module
jest.mock('../../app/screens/transactionInput', () => ({
  processTextWithGemini: jest.fn(),
}));

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

// Mock GoogleGenerativeAI và model
jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn();
  const mockGetGenerativeModel = jest.fn(() => ({
    generateContent: mockGenerateContent,
  }));
  return {
    GoogleGenerativeAI: jest.fn(() => ({
      getGenerativeModel: mockGetGenerativeModel,
    })),
  };
});

describe('processTextWithGemini', () => {
  const mockGenerateContent = jest.fn();
  const mockGetGenerativeModel = jest.fn(() => ({
    generateContent: mockGenerateContent,
  }));
  const mockGoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;
  mockGoogleGenerativeAI.mockImplementation(() => ({
    getGenerativeModel: mockGetGenerativeModel,
  }));

  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateContent.mockReset();
    mockConsoleError.mockClear();
    mockConsoleLog.mockClear();
  });

  // Test case 1: Xử lý văn bản thành công và trả về JSON hợp lệ
  const testProcessTextSuccess = async () => {
    const expectedResult = {
      type: 'expense',
      totalAmount: '-100000',
      category: 'Chi phí sinh hoạt',
      date: '15/10/2023',
    };
    
    (processTextWithGemini as jest.Mock).mockResolvedValueOnce(expectedResult);
    
    const extractedText = 'Hóa đơn: 100,000 VND, Chi phí sinh hoạt, 15/10/2023';
    const result = await processTextWithGemini(extractedText);
    
    expect(result).toEqual(expectedResult);
    expect(processTextWithGemini).toHaveBeenCalledWith(extractedText);
  };

  // Test case 2: Xử lý lỗi khi Gemini trả về phản hồi không phải JSON
  const testInvalidJsonResponse = async () => {
    (processTextWithGemini as jest.Mock).mockResolvedValueOnce(null);
    
    const extractedText = 'Hóa đơn: 100,000 VND';
    const result = await processTextWithGemini(extractedText);
    
    expect(result).toBeNull();
    expect(processTextWithGemini).toHaveBeenCalledWith(extractedText);
  };

  // Test case 3: Xử lý lỗi khi JSON thiếu trường cần thiết
  const testMissingRequiredFields = async () => {
    (processTextWithGemini as jest.Mock).mockResolvedValueOnce(null);
    
    const extractedText = 'Hóa đơn: 100,000 VND';
    const result = await processTextWithGemini(extractedText);
    
    expect(result).toBeNull();
    expect(processTextWithGemini).toHaveBeenCalledWith(extractedText);
  };

  // Test case 4: Xử lý lỗi khi không nhận được phản hồi từ Gemini
  const testNoResponseFromGemini = async () => {
    (processTextWithGemini as jest.Mock).mockResolvedValueOnce(null);
    
    const extractedText = 'Hóa đơn: 100,000 VND';
    const result = await processTextWithGemini(extractedText);
    
    expect(result).toBeNull();
    expect(processTextWithGemini).toHaveBeenCalledWith(extractedText);
  };

  // Gọi các test case bằng it
  it('should process text successfully and return valid JSON', testProcessTextSuccess);
  it('should handle invalid JSON response from Gemini', testInvalidJsonResponse);
  it('should handle JSON response missing required fields', testMissingRequiredFields);
  it('should handle no response from Gemini', testNoResponseFromGemini);
});