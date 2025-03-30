// __tests__/TransactionInputScreen.test.tsx

import { handleAddTransaction, handleAmountChange, formatDateToDDMMYYYY } from '../../app/screens/transactionInput';
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

describe('testHandleAddTransaction', () => {
  const setTransactionData = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const transactionData = {
    type: 'expense',
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
//th1
  it('should successfully add a transaction with all fields', async () => {
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
  });
//th2
  it('should successfully add a transaction with empty note', async () => {
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
  });
//th3
  it('should not add transaction when amount is missing', async () => {
    const incompleteData = { ...transactionData, amount: '' };
    await handleAddTransaction(incompleteData, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();
  });
//th4
  it('should not add transaction when date is missing', async () => {
    const incompleteData = { ...transactionData, date: '' };
    await handleAddTransaction(incompleteData, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();
  });
//th5
  it('should not add transaction when category is missing', async () => {
    const incompleteData = { ...transactionData, category: '' };
    await handleAddTransaction(incompleteData, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();
  });
//th6
  it('should not add transaction when multiple required fields are missing', async () => {
    const incompleteData = { ...transactionData, amount: '', date: '', category: '' };
    await handleAddTransaction(incompleteData, setTransactionData, mockRouter);

    expect(newTransaction).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setTransactionData).not.toHaveBeenCalled();
  });
//th7
  it('should handle error when amount is zero', async () => {
    const zeroAmountData = { ...transactionData, amount: '00' };
    const error = new Error('Amount cannot be zero');
    (newTransaction as jest.Mock).mockRejectedValueOnce(error);
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
    expect(mockConsoleError).toHaveBeenCalledWith('Lỗi khi thêm giao dịch:', error);
  });
//th8
  it('should handle API error when adding transaction', async () => {
    const error = new Error('API Error');
    (newTransaction as jest.Mock).mockRejectedValueOnce(error);
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
    expect(mockConsoleError).toHaveBeenCalledWith('Lỗi khi thêm giao dịch:', error);
  });
});

describe('testHandleAmountChange', () => {
  const setTransactionData = jest.fn();
  const transactionData = {
    type: 'expense',
    amount: '',
    date: '15/10/2023',
    category: 'Chi phí sinh hoạt',
    note: 'Ghi chú',
  };

  beforeEach(() => {
    setTransactionData.mockReset();
  });

  it('should handle negative amount input', () => {
    handleAmountChange('-100000', setTransactionData, transactionData);
    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      amount: '100000',
    });
  });

  it('should handle amount exceeding 1 billion', () => {
    handleAmountChange('20000000000', setTransactionData, transactionData);
    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      amount: '10000000000',
    });
  });

  it('should handle non-numeric input', () => {
    handleAmountChange('abc', setTransactionData, transactionData);
    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      amount: '0',
    });
  });

  it('should handle mixed numeric and non-numeric input', () => {
    handleAmountChange('100abc000', setTransactionData, transactionData);
    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      amount: '100000',
    });
  });
});

describe('testDateValidation', () => {
  const setTransactionData = jest.fn();
  const transactionData = {
    type: 'expense',
    amount: '100000',
    date: '',
    category: 'Chi phí sinh hoạt',
    note: 'Ghi chú',
  };

  beforeEach(() => {
    setTransactionData.mockReset();
  });

  it('should not allow future dates', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = formatDateToDDMMYYYY(futureDate);
    
    setTransactionData({
      ...transactionData,
      date: futureDateString,
    });

    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      date: futureDateString,
    });
  });

  it('should allow current date', () => {
    const currentDate = new Date();
    const currentDateString = formatDateToDDMMYYYY(currentDate);
    
    setTransactionData({
      ...transactionData,
      date: currentDateString,
    });

    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      date: currentDateString,
    });
  });

  it('should allow past dates', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = formatDateToDDMMYYYY(pastDate);
    
    setTransactionData({
      ...transactionData,
      date: pastDateString,
    });

    expect(setTransactionData).toHaveBeenCalledWith({
      ...transactionData,
      date: pastDateString,
    });
  });
});