// __tests__/SignUp-test.tsx

import { handleSignUp } from '@/app/screens/signup';
import { signUp } from '@/API/authAPI';
import { Router } from 'expo-router';

// Mock signUp từ authAPI
jest.mock('@/API/authAPI', () => ({
  signUp: jest.fn(),
}));

// Mock alert
global.alert = jest.fn();

describe('handleSignUp function', () => {
  let mockRouter: Partial<Router>;
  let mockSignUp: jest.Mock;

  // Hàm testSignUp 
  const testSignUp = async () => {
    mockRouter = { push: jest.fn() };
    mockSignUp = signUp as jest.Mock;

    // TC01: DisplayName hợp lệ → Hợp lệ
    jest.clearAllMocks();
    mockSignUp.mockResolvedValueOnce({});
    let setError = jest.fn();
    let setLoading = jest.fn();
    await handleSignUp('test1@email.com', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test1@email.com', 'password123', 'Test User');
    expect(global.alert).toHaveBeenCalledWith('Account created successfully!');
    expect(mockRouter.push).toHaveBeenCalledWith('/screens/login');
    expect(setError).toHaveBeenCalledWith('');
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC02: DisplayName trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', 'password123', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC03: Email hợp lệ → Hợp lệ
    jest.clearAllMocks();
    mockSignUp.mockResolvedValueOnce({});
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test1@email.com', 'password123', 'Test User');
    expect(global.alert).toHaveBeenCalledWith('Account created successfully!');
    expect(mockRouter.push).toHaveBeenCalledWith('/screens/login');
    expect(setError).toHaveBeenCalledWith('');
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC04: Email sai format → Báo lỗi "The email address is not valid. Please enter a valid email."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('password123', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('password123', 'password123', 'Test User');
    expect(setError).toHaveBeenCalledWith('');
    expect(setError).toHaveBeenCalledWith('The email address is not valid. Please enter a valid email.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC05: Email đã tồn tại → Báo lỗi "This email is already in use. Please use a different email."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test@gmail.com', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test@gmail.com', 'password123', 'Test User');
    expect(setError).toHaveBeenCalledWith('');
    expect(setError).toHaveBeenCalledWith('This email is already in use. Please use a different email.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC06: Email trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC07: Password hợp lệ → Hợp lệ
    jest.clearAllMocks();
    mockSignUp.mockResolvedValueOnce({});
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test1@email.com', 'password123', 'Test User');
    expect(global.alert).toHaveBeenCalledWith('Account created successfully!');
    expect(mockRouter.push).toHaveBeenCalledWith('/screens/login');
    expect(setError).toHaveBeenCalledWith('');
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC08: Password quá yếu → Báo lỗi "The password is too weak. Please choose a stronger password."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/weak-password' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', '123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test1@email.com', '123', 'Test User');
    expect(setError).toHaveBeenCalledWith('');
    expect(setError).toHaveBeenCalledWith('The password is too weak. Please choose a stronger password.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC09: Password trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', '', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC10: DisplayName hợp lệ, Email hợp lệ, Password hợp lệ → Hợp lệ
    jest.clearAllMocks();
    mockSignUp.mockResolvedValueOnce({});
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test1@email.com', 'password123', 'Test User');
    expect(global.alert).toHaveBeenCalledWith('Account created successfully!');
    expect(mockRouter.push).toHaveBeenCalledWith('/screens/login');
    expect(setError).toHaveBeenCalledWith('');
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC11: DisplayName trống, Email hợp lệ, Password hợp lệ → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', 'password123', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC12: DisplayName hợp lệ, Email trống, Password hợp lệ → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC13: DisplayName hợp lệ, Email hợp lệ, Password trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', '', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC14: DisplayName trống, Email trống, Password hợp lệ → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('', 'password123', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC15: DisplayName trống, Email hợp lệ, Password trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', '', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC16: DisplayName hợp lệ, Email trống, Password trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('', '', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC17: DisplayName trống, Email trống, Password trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('', '', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC18: DisplayName hợp lệ, Email sai format, Password hợp lệ → Báo lỗi "The email address is not valid. Please enter a valid email."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('password123', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('password123', 'password123', 'Test User');
    expect(setError).toHaveBeenCalledWith('');
    expect(setError).toHaveBeenCalledWith('The email address is not valid. Please enter a valid email.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC19: DisplayName hợp lệ, Email đã tồn tại, Password hợp lệ → Báo lỗi "This email is already in use. Please use a different email."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test@gmail.com', 'password123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test@gmail.com', 'password123', 'Test User');
    expect(setError).toHaveBeenCalledWith('');
    expect(setError).toHaveBeenCalledWith('This email is already in use. Please use a different email.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC20: DisplayName hợp lệ, Email hợp lệ, Password quá yếu → Báo lỗi "The password is too weak. Please choose a stronger password."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/weak-password' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test1@email.com', '123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test1@email.com', '123', 'Test User');
    expect(setError).toHaveBeenCalledWith('');
    expect(setError).toHaveBeenCalledWith('The password is too weak. Please choose a stronger password.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC21: DisplayName trống, Email đã tồn tại, Password hợp lệ → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test@gmail.com', 'password123', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC22: DisplayName hợp lệ, Email đã tồn tại, Password quá yếu → Báo lỗi "This email is already in use. Please use a different email."
    jest.clearAllMocks();
    mockSignUp.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test@gmail.com', '123', 'Test User', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).toHaveBeenCalledWith('test@gmail.com', '123', 'Test User');
    expect(setError).toHaveBeenCalledWith('');
    expect(setError).toHaveBeenCalledWith('This email is already in use. Please use a different email.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading.mock.calls).toEqual([[true], [false]]);

    // TC23: DisplayName trống, Email sai format, Password trống → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('password123', '', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();

    // TC24: DisplayName trống, Email đã tồn tại, Password quá yếu → Báo lỗi "All fields are required."
    jest.clearAllMocks();
    setError = jest.fn();
    setLoading = jest.fn();
    await handleSignUp('test@gmail.com', '123', '', setError, setLoading, mockRouter as Router);

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith('All fields are required.');
    expect(global.alert).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();
  };

  // Gọi hàm testSignUp trong it
  it('should handle all signup scenarios', testSignUp);
});