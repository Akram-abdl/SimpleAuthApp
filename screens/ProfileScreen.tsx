import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../AppNavigator";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;
type ProfileNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

type Props = {
  route: ProfileScreenRouteProp;
};

const ProfileScreen: React.FC<Props> = ({ route }) => {
  const { email, name } = route.params;
  const navigation = useNavigation<ProfileNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Button title="Log Out" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

export default ProfileScreen;
