import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { UserDropDownUI } from "./UserDropDown";

export function SignUpUi({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userValue, setUserValue] = useState("");
  const [password, setPassword] = useState("");

  const handleUserValueChange = (newValue) => {
    setUserValue(newValue);
  };

  const handleSignUp = async () => {
    const mobileRegex = /\d{10}/;

    if (!mobile) {
      Alert.alert("Error", "Please enter a mobile number.");
    } else if (!mobileRegex.test(mobile)) {
      Alert.alert("Error", "Please enter a valid mobile number.");
    } else if (!userValue) {
      Alert.alert("Error", "Please select a user type.");
    } else if (!firstName) {
      Alert.alert("Error", "Please enter your first name.");
    } else if (!lastName) {
      Alert.alert("Error", "Please enter your last name.");
    } else if (!password) {
      Alert.alert("Error", "Please enter a password.");
    } else if (password.length < 4) {
      Alert.alert("Error", "Password should be at least 4 characters.");
    } else {
      var signUpData = {
        mobile: mobile,
        firstName: firstName,
        lastName: lastName,
        userTypeValue: userValue,
        password: password,
      };

      try {
        const response = await fetch(
          "http://192.168.1.100/my_notes/SignUpProcess.php",
          {
            method: "POST",
            body: JSON.stringify(signUpData),
          }
        );

        const text = await response.text();

        Alert.alert("Message", text);

        if (text === "Success") {
          setMobile("");
          setFirstName("");
          setLastName("");
          setPassword("");
          goToSignIn();
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.headerText}>Create MyNotes Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
      />
      <UserDropDownUI
        style={styles.dropdown}
        onValueChange={handleUserValueChange}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        keyboardType="default"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        keyboardType="default"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        keyboardType="default"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSignIn}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "white",
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 16,
    },
    headerText: {
      fontSize: 20,
      color: "green",
      marginBottom: 16,
    },
    input: {
      height: 40,
      width: "100%",
      marginVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 4,
    },
    dropdown: {
      height: 40,
      width: "100%",
      marginVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    button: {
      backgroundColor: "green",
      width: "100%",
      height: 40,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    linkText: {
      marginTop: 16,
      color: "green",
      textDecorationLine: "underline",
    },
  });