
import { getFirebaseErrorMessage } from "@/utils/firebaseErrorUtils";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import axios from "axios"; 

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    // Cập nhật displayName cho người dùng Firebase
    await userCredential.user.updateProfile({
      displayName: displayName,
    });

    // Gọi cloud function để tạo user trong backend
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/`, {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: displayName,
    });

    return "Account created successfully!";
  } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | any) {
    console.error("Error signing up:", error);
    const friendlyMessage = getFirebaseErrorMessage(error.code);
    throw new Error(friendlyMessage);
  }
};

  