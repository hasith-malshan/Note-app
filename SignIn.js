import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StatusBar,
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from "react-native";

export function SignInUi({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={styles.headerText}> MyNotes </Text>

      <Image source={require("./assets/logo.png")} style={styles.logo} />
    

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        onChangeText={setMobile}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
 <View style={styles.buttonBox}>
      <Button title="Sign In" color="green" onPress={handleSignIn} />
      </View>
      <Pressable onPress={goToSignUp}>
        <Text style={styles.link}>Don't have an account? Create one</Text>
      </Pressable>
    </SafeAreaView>
  );

  async function handleSignIn() {

    if (!mobile || !password) {
      Alert.alert("Error", "Please enter both mobile number and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.100/my_notes/SignInProcess.php",
        {
          method: "POST",
          body: JSON.stringify({ mobile, password }),
        }
      );

      const text = await response.text();

      var splitResponse = text.split("+");
      Alert.alert("Message", splitResponse[0]);

      if (splitResponse[1]) {
        var userDetails = splitResponse[1].split(",");

        if (splitResponse[0] === "Success") {
          await AsyncStorage.setItem("id", userDetails[0]);
          await AsyncStorage.setItem("firstName", userDetails[1]);
          await AsyncStorage.setItem("lastName", userDetails[2]);
          await AsyncStorage.setItem("password", userDetails[3]);
          await AsyncStorage.setItem("user_type_id", userDetails[4]);

          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  function goToSignUp() {
    navigation.navigate("SignUp");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 40,
    marginBottom: 30,
    color: "green",
    
  }, buttonBox: {
    width: 340,
    margin: 20,
  },
  input: {
    height: 40,
    width: 350,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
  },
  link: {
    color: "green",
    marginTop: 10,
  },
});
