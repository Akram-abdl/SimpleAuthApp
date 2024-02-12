import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUpUser = async (
  email: string,
  password: string,
  name: string
): Promise<void> => {
  const userData = JSON.stringify({ email, password, name });
  await AsyncStorage.setItem(email, userData);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const userDataString = await AsyncStorage.getItem(email);
  if (!userDataString) {
    throw new Error("User not found. Please sign up.");
  }
  const userData = JSON.parse(userDataString);
  if (userData.password !== password) {
    throw new Error("Incorrect password.");
  }
  return userData.name; // Return the user's name on successful login
};
