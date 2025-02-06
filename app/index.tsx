


import { View, Text ,StyleSheet,TouchableOpacity, TextInput, Pressable, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Login from "./screens/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}






// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from "./screens/login";
// import useAutoLogout from "@/hooks/useAutoLogout";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//       </Stack.Navigator>
//   );  
// }


// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from "./screens/login";
// import HomeScreen from "./(tabs)/HomeScreen"
// import { useEffect, useState } from "react";
// import { FIREBASE_AUTH } from "@/FirebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import useAutoLogout from "@/hooks/useAutoLogout";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [user, setUser] = useState(null);
//   const { resetTimer } = useAutoLogout();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
//       setUser(authUser);
//     });

//     return unsubscribe; // Cleanup on unmount
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           <Stack.Screen 
//             name="HomeScreen" 
//             component={HomeScreen} 
//             options={{ headerShown: false }} 
//           />
//         ) : (
//           <Stack.Screen 
//             name="Login" 
//             component={Login} 
//             options={{ headerShown: false }} 
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from "./screens/login";
// import HomeScreen from "./(tabs)/HomeScreen";
// import { useEffect, useState } from "react";
// import { FIREBASE_AUTH } from "@/FirebaseConfig";
// import { onAuthStateChanged, User } from "firebase/auth"; // Import User from firebase/auth
// import useAutoLogout from "@/hooks/useAutoLogout";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [user, setUser] = useState<User | null>(null); // Specify the type of user
//   const { resetTimer } = useAutoLogout();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
//       setUser(authUser); // Now TypeScript understands that `user` is a User object or null
//     });

//     return unsubscribe; // Cleanup on unmount
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           <Stack.Screen
//             name="HomeScreen"
//             component={HomeScreen}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{ headerShown: false }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from "./screens/login";
// import HomeScreen from "./(tabs)/HomeScreen";
// import { useEffect, useState } from "react";
// import { FIREBASE_AUTH } from "@/FirebaseConfig";
// import { onAuthStateChanged, User } from "firebase/auth"; // Import User from firebase/auth
// import useAutoLogout from "@/hooks/useAutoLogout";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [user, setUser] = useState<User | null>(null); // Specify the type of user
//   const { resetTimer } = useAutoLogout();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
//       setUser(authUser); // Now TypeScript understands that `user` is a User object or null
//     });

//     return unsubscribe; // Cleanup on unmount
//   }, []);

//   return (
//     <NavigationContainer> {/* Only here, at the root level */}
//       <Stack.Navigator>
//         {user ? (
//           <Stack.Screen
//             name="HomeScreen"
//             component={HomeScreen}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{ headerShown: false }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
