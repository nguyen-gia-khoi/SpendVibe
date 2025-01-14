// app/tabs/_layout.tsx
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="HomeScreen"
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="Login"
        options={{ title: "Login" }}
      />
      <Tabs.Screen
        name="SignUp"
        options={{ title: "Sign Up" }}
      />
    </Tabs>
  );
}
