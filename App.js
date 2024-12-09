import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignInUi } from "./SignIn";
import { SignUpUi } from "./SignUp";
import { HomeUi } from "./Home";
import { AddNoteUi } from "./AddNote";
import NoteView from "./NoteView";

const Stack = createNativeStackNavigator();

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    // signed in using AsyncStorage
    async function checkUserSignInStatus() {
      try {
        const userSignInStatus = await AsyncStorage.getItem("id");
        if (userSignInStatus) {
          setIsUserSignedIn("true");
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkUserSignInStatus();
  }, []);

  let ui;

  if (isUserSignedIn) {
    // User is signed in, navigate to the home page
    ui = (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "orange",
            },
            headerTitleStyle: {
              fontWeight: "bolder",
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeUi} />
          <Stack.Screen name="NoteView" component={NoteView} />
          <Stack.Screen name="AddNote" component={AddNoteUi} />
          <Stack.Screen name="SignUp" component={SignUpUi} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // User is not signed in, navigate to the sign-in page
    ui = (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "green",
              
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="SignIn" component={SignInUi} />
          <Stack.Screen name="SignUp" component={SignUpUi} />
          <Stack.Screen name="Home" component={HomeUi} />
          <Stack.Screen name="AddNote" component={AddNoteUi} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return ui;
}

export default App;
