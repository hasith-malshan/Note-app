import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteCategoryDropDownUi } from "./NoteCategoryDropDown";

export function AddNoteUi({ navigation }) {
  const [title, setTitle] = useState("");
  const [categoryValue, setCategoryValue] = useState("1");
  const [description, setDescription] = useState("");

  const handleCategoryValueChange = (newValue) => {
    setCategoryValue(newValue);
  };

  const handleSaveNote = async () => {
    if (!title) {
      Alert.alert("Error", "Please enter a title for the note.");
      return;
    }

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const noteData = {
      title: title,
      categoryValue: categoryValue,
      description: description,
      dateandtime: formattedDateTime,
      user: await AsyncStorage.getItem("id"),
    };

    fetch("http://192.168.1.100/my_notes/AddNoteProcess.php", {
      method: "post",
      body: JSON.stringify(noteData),
    })
      .then((response) => response.text())
      .then((text) => {
        Alert.alert("Success", "Note Added");
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Add a new Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Note Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Note Description"
        multiline={true}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <NoteCategoryDropDownUi onValueChange={handleCategoryValueChange} />
      <View style={styles.buttonBox}>
        <Button color={"#F94C10"} title="Add" onPress={handleSaveNote} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 24,
    marginBottom: 16,
    color: "#F94C10",
    textAlign: "center",
  },
  input: {
    height: 40,
    marginVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F94C10",
  },
  textArea: {
    minHeight: 400,
    marginVertical: 8,
    paddingTop: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F94C10",
    textAlignVertical: "top",
    fontSize: 14,
  },
  buttonBox: {
    marginVertical: 16,
  },
});
