import AsyncStorage from "@react-native-async-storage/async-storage";

const generateFakeToken = () =>
  `fake-jwt-token-${Math.random().toString(36).substr(2, 9)}`;

export const signUpUser = async (
  email: string,
  password: string,
  name: string
): Promise<string> => {
  const userData = JSON.stringify({
    email,
    password,
    name,
    token: generateFakeToken(),
  });
  await AsyncStorage.setItem(email, userData);
  return JSON.parse(userData).token;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ name: string; token: string }> => {
  const userDataString = await AsyncStorage.getItem(email);
  if (!userDataString) {
    throw new Error("User not found. Please sign up.");
  }
  const userData = JSON.parse(userDataString);
  if (userData.password !== password) {
    throw new Error("Incorrect password.");
  }
  return { name: userData.name, token: userData.token };
};
