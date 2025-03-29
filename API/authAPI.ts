
import { getFirebaseErrorMessage } from "@/utils/firebaseErrorUtils";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import axios from "axios"; 

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    console.log("Bắt đầu đăng ký tài khoản...");

    // Đăng ký tài khoản trên Firebase Auth
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log("Đăng ký thành công trên Firebase:", userCredential.user.uid);

    // Cập nhật displayName cho user
    await userCredential.user.updateProfile({ displayName });
    console.log("Cập nhật displayName thành công:", displayName);

    // Kiểm tra API URL
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/v1/customer/save-user`;
    console.log("Gửi dữ liệu đến backend:", apiUrl);

    // Gửi dữ liệu lên backend API
    const response = await axios.post(apiUrl, {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: displayName,
    });

    console.log("Phản hồi từ backend:", response.data);

    return "Account created successfully!";
  } catch (error: any) {
    console.error("Lỗi trong quá trình đăng ký:", error);

    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else if (error.request) {
      console.error("Không nhận được phản hồi từ server:", error.request);
    } else {
      console.error("Lỗi không xác định:", error.message);
    }

    throw new Error(error.message);
  }
};  
export const fetchUserInfo = async (uid: string) => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/v1/customer/${uid}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy user:", error);
    return null;
  }
};

export const getUserTransactionSummary = async (
  uid: string,
  period: "day" | "month" | "year"
): Promise<{ totalIncome: number; totalSpent: number }> => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/v1/customer/transaction/sum`, {
      params: { uid, period },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    // if (error.response) {
    //   console.error("Response data:", error.response.data);
    //   console.error("Response status:", error.response.status);
    // }
    throw error;
  }
};