import { useEffect, useRef } from "react";
import { Text, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";

const IntroScreen = () => {
    const router = useRouter();
    const fadeValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeValue, {
            toValue: 1, // Fade in
            duration: 2000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            router.replace("/screens/login"); 
        }, 1000);
    }, []);

    return (
        <Animated.View style={{ opacity: fadeValue, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#1E40AF' }}>SpendVibe</Text>
        </Animated.View>
    );
};

export default IntroScreen;
