// import { Link, useRouter } from "expo-router";
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable, Image } from "react-native";
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { FIREBASE_AUTH } from "@/FirebaseConfig";
// import { Auth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

// const Login = () => {
//     const router = useRouter();
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     const [loading, setLoading] = React.useState(false);
//     const auth = FIREBASE_AUTH

//     const signIn = async () => {
//         setLoading(true);
//         try {
//             const response = await signInWithEmailAndPassword(auth, email, password);
//             router.push("/(tabs)/HomeScreen"); // Navigate to HomeScreen after login
//         } catch (error:any) {
//             console.error(error);
//             alert("Login Failed: " + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };
    
   

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <Text style={styles.header}>SpendVibe</Text>
            
//             {/* Form */}
//             <Text style={styles.label}>Email or Phone Number</Text>
//             <TextInput style={styles.input} placeholder="Enter email or phone number" placeholderTextColor={"grey"} 
//             onChangeText={(text)=> setEmail(text) }/>
            
//             <Text style={styles.label}>Password</Text>
//             <TextInput style={styles.input} placeholder="Enter password" placeholderTextColor={"grey"} secureTextEntry 
//             onChangeText={(text)=> setPassword(text)} />
            
//             {/* Button Login */}
//              <TouchableOpacity style={styles.button} onPress={() => signIn()}>
//                 <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity> 
            
//             {/* Google Login Button */}
//             <TouchableOpacity style={styles.googleButton} onPress={() => alert("Login with Google")}>  
//             <AntDesign name="google" size={24} color="black" />
//                 <Text style={styles.googleButtonText}>Login with Google</Text>  
//             </TouchableOpacity>
            
//             {/* Link to Sign Up */}
//             <View style={styles.viewToSignup}>
//                 <Text style={styles.text}>Don't have an account? </Text>
//                 <Pressable>
//                     <Link href="/screens/signup">
//                         <Text style={styles.linkText}>Sign Up</Text>
//                     </Link>
//                 </Pressable>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F8F9FA",
//         padding: 20,
//         justifyContent: "center",
//     },
//     header: {
//         fontSize: 40,
//         fontWeight: "bold",
//         color: "#4A90E2",
//         textAlign: "center",
//         marginBottom: 40,
//     },
//     label: {
//         fontSize: 16,
//         color: "#4A90E2",
//         marginBottom: 5,
//     },
//     input: {
//         borderBottomWidth: 2,
//         borderBottomColor: "#4A90E2",
//         padding: 10,
//         marginBottom: 20,
//         fontSize: 16,
//         color: "#333",
//     },
//     button: {
//         backgroundColor: "#4A90E2",
//         paddingVertical: 15,
//         borderRadius: 25,
//         alignItems: "center",
//         marginVertical: 20,
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "bold",
//     },
//     googleButton: {
//         flexDirection: "row",
//         backgroundColor: "#fff",
//         borderWidth: 1,
//         borderColor: "#ddd",
//         paddingVertical: 15,
//         borderRadius: 25,
//         alignItems: "center",
//         justifyContent: "center",
//         marginVertical: 10,
        
//     },
//     googleButtonText: {
//         color: "#333",
//         fontSize: 16,
//         fontWeight: "bold",
//         marginLeft: 10,
//     },
//     googleIcon: {
//         width: 20,
//         height: 20,
//     },
//     viewToSignup: {
//         flexDirection: "row",
//         justifyContent: "center",
//     },
//     text: {
//         fontSize: 16,
//         color: "#333",
//     },
//     linkText: {
//         fontSize: 16,
//         color: "#4A90E2",
//         textDecorationLine: "underline",
//     },
// });

// export default Login;



import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable, ActivityIndicator } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const auth = FIREBASE_AUTH;

    // Check if user is already logged in when component mounts
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is already logged in:", user);
                router.replace("/(tabs)/HomeScreen"); // Redirect to HomeScreen
            }
            setCheckingAuth(false); // Stop loading
        });

        return () => unsubscribe(); // Cleanup the listener
    }, []);

    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace("/(tabs)/HomeScreen"); // Navigate after login
        } catch (error: any) {
            console.error(error);
            alert("Login Failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>SpendVibe</Text>

            {/* Form */}
            <Text style={styles.label}>Email or Phone Number</Text>
            <TextInput style={styles.input} placeholder="Enter email or phone number" placeholderTextColor={"grey"} 
                onChangeText={(text) => setEmail(text)} />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter password" placeholderTextColor={"grey"} secureTextEntry 
                onChangeText={(text) => setPassword(text)} />

            {/* Button Login */}
            <TouchableOpacity style={styles.button} onPress={signIn}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity style={styles.googleButton} onPress={() => alert("Login with Google")}>  
                <AntDesign name="google" size={24} color="black" />
                <Text style={styles.googleButtonText}>Login with Google</Text>  
            </TouchableOpacity>

            {/* Link to Sign Up */}
            <View style={styles.viewToSignup}>
                <Text style={styles.text}>Don't have an account? </Text>
                <Pressable onPress={() => router.push("/screens/signup")}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        padding: 20,
        justifyContent: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#4A90E2",
        textAlign: "center",
        marginBottom: 40,
    },
    label: {
        fontSize: 16,
        color: "#4A90E2",
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "#4A90E2",
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#4A90E2",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    googleButton: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    googleButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    viewToSignup: {
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    linkText: {
        fontSize: 16,
        color: "#4A90E2",
        textDecorationLine: "underline",
    },
});

export default Login;
