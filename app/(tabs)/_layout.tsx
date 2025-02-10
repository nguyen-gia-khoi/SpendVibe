// app/tabs/_layout.tsx
import { Tabs } from "expo-router";
import "../../global.css";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          tabBarStyle: { display: "none" }}}
      />
      <Tabs.Screen name="TransactionInputScreen" options={{ title: "Add Transaction" }} />
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
