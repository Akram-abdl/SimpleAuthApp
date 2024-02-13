import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../services/authService"; // Adjust import as necessary
import { RootStackParamList } from "../AppNavigator"; // Adjust import as necessary
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login" | "Profile"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { name, token } = await loginUser(email, password);
      console.log(token); // For demonstration
      navigation.navigate("Profile", { email, name });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
