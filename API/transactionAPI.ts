import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import axios from "axios"; 

const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/v1/transaction`;

export const newTransaction = async ( type : string,amount: string,date: string,note?: string,category?: string ) => {
 try {
    const currentUser = auth().currentUser;
    console.log("Current user:", currentUser);
    if (!currentUser) {
      throw new Error("User is not authenticated");
    }
    console.log("API URL:", apiUrl);

    const response = await axios.post(apiUrl, {
        uid: currentUser.uid,
        type,
        amount: parseFloat(amount),
        date,
        category: category || "Khác",
        note: note || "",
      });
  
      console.log("Transaction saved:", response.data);
      return { success: true, message: response.data.message };
    
 } catch (error) {
    console.error("Error saving transaction:", error);
    
 }
}
export const getUserTransaction = async(uid: string) =>{
  try {
    console.log(apiUrl);
    const response = await axios.get(apiUrl, {
      params: { uid },
    });
    return response.data.transactions;
  } catch (error) {
    console.error("Lỗi khi lấy giao dịch:", error);
    return [];
  }
}