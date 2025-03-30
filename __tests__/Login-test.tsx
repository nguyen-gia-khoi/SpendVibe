// __tests__/Login.test.tsx

import { handleSignIn } from '../app/screens/login';
import auth from '@react-native-firebase/auth';

// Mock Firebase auth
jest.mock('@react-native-firebase/auth', () => {
  const signInWithEmailAndPassword = jest.fn();
  return () => ({
    signInWithEmailAndPassword,
  });
});

// Mock global.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

// Mock router
const mockRouter = {
  replace: jest.fn(),
  push: jest.fn(),
  navigate: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn().mockReturnValue(false),
  setParams: jest.fn(),
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
  canDismiss: jest.fn().mockReturnValue(false),
  dismissTo: jest.fn(),
  reload: jest.fn(),
};

describe('testLogin', () => {
  const mockSignInWithEmailAndPassword = auth().signInWithEmailAndPassword as jest.Mock;
  const setLoading = jest.fn();

  beforeEach(() => {
    mockSignInWithEmailAndPassword.mockReset();
    mockRouter.replace.mockReset();
    setLoading.mockReset();
    mockAlert.mockReset();
  });

  // Trường hợp 1: Đăng nhập thành công (không có alert)
  it('handles successful login', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '123' } });
    await handleSignIn('test@gmail.com', 'test123', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('test@gmail.com', 'test123');
    expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)/HomeScreen');
    expect(mockAlert).not.toHaveBeenCalled();
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 2: Lỗi invalid-email
  it('handles invalid-email error', async () => {
    const invalidEmailError = { code: 'auth/invalid-email', message: 'The email address is badly formatted.' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(invalidEmailError);
    await handleSignIn('invalid-email', 'test123', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('invalid-email', 'test123');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: The email address is badly formatted.');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 3: Lỗi invalid-credential
  it('handles invalid-credential error', async () => {
    const invalidCredentialError = { code: 'auth/invalid-credential', message: 'The supplied auth credential is incorrect, malformed or has expired.' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(invalidCredentialError);
    await handleSignIn('test@gmail.com', 'wrongpass', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('test@gmail.com', 'wrongpass');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: The supplied auth credential is incorrect, malformed or has expired.');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 4: Lỗi user-not-found
  it('handles user-not-found error', async () => {
    const userNotFoundError = { code: 'auth/invalid-credential', message: 'The supplied auth credential is incorrect, malformed or has expired.' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(userNotFoundError);
    await handleSignIn('notfound@example.com', 'test123', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('notfound@example.com', 'test123');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: The supplied auth credential is incorrect, malformed or has expired.');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 5: Lỗi mạng (network-request-failed)
  it('handles network-request-failed error', async () => {
    const networkError = { code: 'auth/network-request-failed', message: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(networkError);
    await handleSignIn('test@gmail.com', 'test123', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('test@gmail.com', 'test123');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: A network error (such as timeout, interrupted connection or unreachable host) has occurred.');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 6: Lỗi quá nhiều yêu cầu (too-many-requests)
  it('handles too-many-requests error', async () => {
    const tooManyRequestsError = { code: 'auth/too-many-requests', message: 'Too many requests have been sent.' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(tooManyRequestsError);
    await handleSignIn('test@gmail.com', 'password123', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('test@gmail.com', 'password123');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: Too many requests have been sent.');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 7: Lỗi bỏ trống email
  it('handles empty email error', async () => {
    const emptyEmailError = { code: 'auth/empty-email', message: 'Cannot read property "code" of undefined' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(emptyEmailError);
    await handleSignIn('', 'test123', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('', 'test123');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: Cannot read property "code" of undefined');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 8: Lỗi bỏ trống password
  it('handles empty password error', async () => {
    const emptyPasswordError = { code: 'auth/empty-password', message: 'Cannot read property "code" of undefined' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(emptyPasswordError);
    await handleSignIn('test@gmail.com', '', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('test@gmail.com', '');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: Cannot read property "code" of undefined');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });

  // Trường hợp 9: Lỗi bỏ trống cả email và password
  it('handles empty email and password error', async () => {
    const emptyEmailAndPasswordError = { code: 'auth/empty-email-and-password', message: 'Cannot read property "code" of undefined' };
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(emptyEmailAndPasswordError);
    await handleSignIn('', '', mockRouter, setLoading);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('', '');
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Login failed: Cannot read property "code" of undefined');
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
  });
});