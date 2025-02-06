// import { Link, useRouter } from "expo-router";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import React from "react";
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
// import { FIREBASE_AUTH } from "@/FirebaseConfig";

// export default function SignUp() {


//   const router = useRouter();
//       const [email, setEmail] = React.useState("");
//       const [password, setPassword] = React.useState("");
//       const [loading, setLoading] = React.useState(false);
//       const auth = FIREBASE_AUTH;

//   const signUp =async()=>{
//           setLoading(true);
//           try{
//               const response = await createUserWithEmailAndPassword(auth,email, password);
//               console.log(response);
//               router.push("/screens/login");
//           }catch(error){
//               console.error(error);
//           }finally{
//               setLoading(false);
//           }
//       }
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>SpendVibe</Text>
      
      

//       <Text style={styles.text}>Email</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         placeholderTextColor={"#555"}
//         onChangeText={(text)=> setEmail(text) }
//       />

//       <Text style={styles.text}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your password"
//         placeholderTextColor={"#555"}
//         secureTextEntry
//         onChangeText={(text)=> setPassword(text)}
//       />

//       {/* Button Sign Up */}
//       <TouchableOpacity style={styles.button} onPress={() => signUp()}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       {/* Link to Login */}
//       <View style={styles.viewToLogin}>
//         <Text style={styles.text3}>Already have an account? </Text>
//         <Pressable>
//           <Text style={styles.linkText}>Login</Text>
//           <Link href="/screens/login"/>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 40,
//     fontWeight: "bold",
//     color: "#4A90E2",
//     textAlign: "center",
//     marginBottom: 40,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#F0F4F8',
//     padding: 20,
//   },
//   input: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#A7C7E7',
//     paddingVertical: 10,
//     marginBottom: 20,
//     fontSize: 16,
//     color: "#333",
//   },
//   text: {
//     marginBottom: 5,
//     fontSize: 16,
//     color: "#34495E",
//     fontWeight: "600",
//   },
//   linkText: {
//     fontSize: 16,
//     color: "#5D9CEC",
//     textDecorationLine: "underline",
//     textAlign: "center",
//   },
//   text3: {
//     fontSize: 16,
//     color: "#34495E",
//     textAlign: "center",
//   },
//   viewToLogin: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   button: {
//     backgroundColor: "#5D9CEC",
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
// function setLoading(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }

import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Thêm state để lưu lỗi
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    setError(""); // Reset lỗi trước khi đăng ký

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      router.push("/screens/login");
    } catch (error: any) {
      console.error(error);

      // Kiểm tra lỗi từ Firebase và đặt thông báo lỗi phù hợp
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email này đã được đăng ký. Vui lòng sử dụng email khác.");
          break;
        case "auth/invalid-email":
          setError("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
          break;
        case "auth/weak-password":
          setError("Mật khẩu quá yếu. Hãy sử dụng mật khẩu mạnh hơn.");
          break;
        default:
          setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>SpendVibe</Text>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={"#555"}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={"#555"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      {/* Button Sign Up */}
      <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Đang đăng ký..." : "Sign Up"}</Text>
      </TouchableOpacity>

      {/* Link to Login */}
      <View style={styles.viewToLogin}>
        <Text style={styles.text3}>Already have an account? </Text>
        <Pressable>
          <Text style={styles.linkText}>Login</Text>
          <Link href="/screens/login" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#A7C7E7",
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
    color: "#34495E",
    fontWeight: "600",
  },
  linkText: {
    fontSize: 16,
    color: "#5D9CEC",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  text3: {
    fontSize: 16,
    color: "#34495E",
    textAlign: "center",
  },
  viewToLogin: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#5D9CEC",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
