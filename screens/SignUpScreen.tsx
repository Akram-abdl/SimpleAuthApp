import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signUpUser } from "../services/authService"; // Adjust import as necessary
import { RootStackParamList } from "../AppNavigator"; // Adjust import as necessary
import { StackNavigationProp } from "@react-navigation/stack";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login" | "Profile"
>;

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      const token = await signUpUser(email, password, name);
      console.log(token); // For demonstration
      navigation.navigate("Login"); // Navigate to login after successful sign-up
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("Sign Up Failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%", // Ensure input fields span the full width
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignUpScreen;
