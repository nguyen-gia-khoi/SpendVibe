import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import { useRouter } from "expo-router";

const AUTO_LOGOUT_TIME = 1 * 60 * 1000; // 30 minutes

const useAutoLogout = () => {
    const [lastActive, setLastActive] = useState(Date.now());
    const router = useRouter();

    useEffect(() => {
        const checkInactivity = setInterval(async () => {
            if (Date.now() - lastActive > AUTO_LOGOUT_TIME) {
                await signOut(FIREBASE_AUTH);
                await AsyncStorage.clear();
                console.log("Auto logged out due to inactivity.");
                router.replace("/screens/login"); // Redirect to login
            }
        }, 60 * 1000); // Check every 1 minute

        return () => clearInterval(checkInactivity);
    }, [lastActive]);

    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === "active") {
                setLastActive(Date.now());
            }
        };

        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => subscription.remove();
        
    }, []);

    return { resetTimer: () => setLastActive(Date.now()) };
};

export default useAutoLogout;
