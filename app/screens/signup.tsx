// // import { Link, useRouter } from "expo-router";
// // import React, { useState } from "react";
// // import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
// // import auth from '@react-native-firebase/auth';
// // import {FirebaseAuthTypes} from "@react-native-firebase/auth";
// // const Login = () => {
// // export default function SignUp() {
  
// //   const signIn = async () => {
// //     const router = useRouter();
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState("")
// //     const signUp = async () => {
// //     setLoading(true);
// //     try {
// //         await auth().createUserWithEmailAndPassword(email, password);
// //         alert("Logged in successfully");

// //     } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | any) {
// //       alert('Login failed: ' + error.message);
        
// //     }
// //     setLoading(false);
// // }
// //   return (
// //     <View style={styles.container}>
// //     {/* Header */}
// //     <Text style={styles.header}>SpendVibe</Text>

// //     {/* Hiển thị thông báo lỗi nếu có */}
// //     {error ? <Text style={styles.errorText}>{error}</Text> : null}

// //     <Text style={styles.text}>Email</Text>
// //     <TextInput
// //       style={styles.input}
// //       placeholder="Enter your email"
// //       placeholderTextColor={"#555"}
// //       onChangeText={(text) => setEmail(text)}
// //     />

// //     <Text style={styles.text}>Password</Text>
// //     <TextInput
// //       style={styles.input}
// //       placeholder="Enter your password"
// //       placeholderTextColor={"#555"}
// //       secureTextEntry
// //       onChangeText={(text) => setPassword(text)}
// //     />

// //     {/* Button Sign Up */}
// //     <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
// //       <Text style={styles.buttonText}>{loading ? "Đang đăng ký..." : "Sign Up"}</Text>
// //     </TouchableOpacity>

// //     {/* Link to Login */}
// //     <View style={styles.viewToLogin}>
// //       <Text style={styles.text3}>Already have an account? </Text>
// //       <Pressable>
// //         <Text style={styles.linkText}>Login</Text>
// //         <Link href="/screens/login" />
// //       </Pressable>
// //     </View>
// //   </View>
// // );
// // }

// // const styles = StyleSheet.create({
// //   header: {
// //     backgroundColor: '#A7C7E7',
// //     textAlign: "center",
// //     paddingVertical: 20,
// //     fontSize: 32,
// //     fontWeight: "bold",
// //     color: "#2C3E50",
// //   },
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F0F4F8',
// //     padding: 20,
// //   },
// //   input: {
// //     borderBottomWidth: 2,
// //     borderBottomColor: '#A7C7E7',
// //     paddingVertical: 10,
// //     marginBottom: 20,
// //     fontSize: 16,
// //     color: "#333",
// //   },
// //   text: {
// //     marginBottom: 5,
// //     fontSize: 16,
// //     color: "#34495E",
// //     fontWeight: "600",
// //   },
// //   linkText: {
// //     fontSize: 16,
// //     color: "#5D9CEC",
// //     textDecorationLine: "underline",
// //     textAlign: "center",
// //   },
// //   text3: {
// //     fontSize: 16,
// //     color: "#34495E",
// //     textAlign: "center",
// //   },
// //   viewToLogin: {
// //     marginTop: 20,
// //     flexDirection: "row",
// //     justifyContent: "center",
// //   },
// //   button: {
// //     backgroundColor: "#5D9CEC",
// //     paddingVertical: 15,
// //     borderRadius: 25,
// //     alignItems: "center",
// //     marginTop: 20,
// //   },
// //   buttonText: {
// //     color: "#FFF",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// // });
// // function setLoading(arg0: boolean) {
// //   throw new Error("Function not implemented.");
// // }

// // function auth() {
// //   throw new Error("Function not implemented.");
// // }

// import { Link, useRouter } from "expo-router";
// import React, { useState } from "react";
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
// import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// export default function SignUp() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const signUp = async () => {
//     if (!email || !password) {
//       setError("Email and password are required.");
//       return;
//     }
//     setError(""); // Clear previous errors
//     setLoading(true);

//     try {
//       await auth().createUserWithEmailAndPassword(email, password);
//       alert("Account created successfully!");
//       router.push("/screens/login"); // Navigate to login page after successful signup
//     } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | any) {
//       setError(error.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>SpendVibe</Text>

//       {/* Display error message if any */}
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}

//       {/* Email Input */}
//       <Text style={styles.text}>Email</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         placeholderTextColor="#555"
//         autoCapitalize="none"
//         keyboardType="email-address"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//       />

//       {/* Password Input */}
//       <Text style={styles.text}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your password"
//         placeholderTextColor="#555"
//         secureTextEntry
//         onChangeText={(text) => setPassword(text)}
//         value={password}
//       />

//       {/* Sign Up Button */}
//       <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
//         <Text style={styles.buttonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
//       </TouchableOpacity>

//       {/* Link to Login */}
//       <View style={styles.viewToLogin}>
//         <Text style={styles.text3}>Already have an account? </Text>
//         <Link href="/screens/login" style={styles.linkText}>
//           Login
//         </Link>
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
//         backgroundColor: "#F8F9FA",
//         padding: 20,
//         justifyContent: "center",
//   },
//   input: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#A7C7E7",
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
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//     fontSize: 14,
//     textAlign: "center",
//   },
// });
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to map Firebase error codes to user-friendly messages
  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different email.";
      case "auth/invalid-email":
        return "The email address is not valid. Please enter a valid email.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled. Please contact support.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };

  const signUp = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError(""); // Clear previous errors
    setLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert("Account created successfully!");
      router.push("/screens/login"); // Navigate to login page
    } catch (error: FirebaseAuthTypes.NativeFirebaseAuthError | any) {
      const friendlyMessage = getFirebaseErrorMessage(error.code);
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>SpendVibe</Text>

      {/* Display error message if any */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Email Input */}
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#555"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      {/* Password Input */}
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#555"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
      </TouchableOpacity>

      {/* Link to Login */}
      <View style={styles.viewToLogin}>
        <Text style={styles.text3}>Already have an account? </Text>
        <Link href="/screens/login" style={styles.linkText}>
          Login
        </Link>
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
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
