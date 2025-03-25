// __tests__/TransactionInputScreen.test.tsx

import { handleAddTransaction } from '../../app/screens/transactionInput';
import { newTransaction } from '@/API/transactionAPI';

// Mock Firebase auth
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    currentUser: { uid: 'test-user-id' },
  }),
}));

// Mock newTransaction
jest.mock('@/API/transactionAPI', () => ({
  newTransaction: jest.fn(),
}));

describe('handleAddTransaction - Add Expense', () => {
  const setTransactionData = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const transactionData = {
    type: 'expense', // Tập trung vào chi tiêu
    amount: '100000',
    date: '15/10/2023',
    category: 'Chi phí sinh hoạt',
    note: 'Ghi chú',
  };

  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();
  });

  // Hàm testHandleAddTransaction duy nhất, kiểm tra tất cả 8 trường hợp
  const testHandleAddTransaction = async () => {
    // Trường hợp 1: Thêm chi tiêu thành công
    (newTransaction as jest.Mock).mockResolvedValueOnce({ success: true });
    await handleAddTransaction(transactionData, setTransactionData, mockRouter);

    expect(newTransaction).toHaveBeenCalledWith(
      transactionData.type,
      transactionData.amount,
      transactionData.date,
      transactionData.note,
      transactionData.category
    );
    expect(mockRouter.push).toHaveBeenCalledWith('/(tabs)/HomeScreen');
    expect(setTransactionData).toHaveBeenCalledWith({
      type: '',
      amount: '',
      date: '',
      category: '',
      note: '',
    });

    // Reset các mock trước khi kiểm tra trường hợp 2
    jest.clearAllMocks();
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 2: Thêm chi tiêu thành công khi note rỗng
    const dataWithEmptyNote = { ...transactionData, note: '' };
    (newTransaction as jest.Mock).mockResolvedValueOnce({ success: true });
    await handleAddTransaction(dataWithEmptyNote, setTransactionData, mockRouter);

    expect(newTransaction).toHaveBeenCalledWith(
      dataWithEmptyNote.type,
      dataWithEmptyNote.amount,
      dataWithEmptyNote.date,
      dataWithEmptyNote.note,
      dataWithEmptyNote.category
    );
    expect(mockRouter.push).toHaveBeenCalledWith('/(tabs)/HomeScreen');
    expect(setTransactionData).toHaveBeenCalledWith({
      type: '',
      amount: '',
      date: '',
      category: '',
      note: '',
    });

    // Reset các mock trước khi kiểm tra trường hợp 3
    jest.clearAllMocks();
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 3: Thiếu trường amount
    const incompleteData1 = { ...transactionData, amount: '' };
    await handleAddTransaction(incompleteData1, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();

    // Reset các mock trước khi kiểm tra trường hợp 4
    jest.clearAllMocks();
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 4: Thiếu trường date
    const incompleteData2 = { ...transactionData, date: '' };
    await handleAddTransaction(incompleteData2, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();

    // Reset các mock trước khi kiểm tra trường hợp 5
    jest.clearAllMocks();
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 5: Thiếu trường category
    const incompleteData3 = { ...transactionData, category: '' };
    await handleAddTransaction(incompleteData3, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();

    // Reset các mock trước khi kiểm tra trường hợp 6
    jest.clearAllMocks();
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 6: Thiếu nhiều trường bắt buộc
    const incompleteData4 = { ...transactionData, amount: '', date: '', category: '' };
    await handleAddTransaction(incompleteData4, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();

    // Reset các mock trước khi kiểm tra trường hợp 7
    jest.clearAllMocks();
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 7: Hàm newTransaction thất bại
    const error1 = new Error('API error');
    (newTransaction as jest.Mock).mockRejectedValueOnce(error1);
    await handleAddTransaction(transactionData, setTransactionData, mockRouter);

    expect(newTransaction).toHaveBeenCalledWith(
      transactionData.type,
      transactionData.amount,
      transactionData.date,
      transactionData.note,
      transactionData.category
    );
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('Lỗi khi thêm giao dịch:', error1);

    // Reset các mock trước khi kiểm tra trường hợp 8
    jest.clearAllMocks();
    (newTransaction as jest.Mock).mockReset();
    setTransactionData.mockReset();
    mockRouter.push.mockReset();
    mockConsoleError.mockClear();

    // Trường hợp 8: Nhập amount toàn số 0
    const zeroAmountData = { ...transactionData, amount: '0000' };
    const error2 = new Error('Amount cannot be zero');
    (newTransaction as jest.Mock).mockRejectedValueOnce(error2);
    await handleAddTransaction(zeroAmountData, setTransactionData, mockRouter);

    expect(newTransaction).toHaveBeenCalledWith(
      zeroAmountData.type,
      zeroAmountData.amount,
      zeroAmountData.date,
      zeroAmountData.note,
      zeroAmountData.category
    );
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('Lỗi khi thêm giao dịch:', error2);
  };

  // Gọi hàm testHandleAddTransaction trong it
  it('should handle all add transaction scenarios', testHandleAddTransaction);
});