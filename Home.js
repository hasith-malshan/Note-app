import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import your images
import Image1 from "./assets/img/study.png";
import Image2 from "./assets/img/travel.png";
import Image3 from "./assets/img/work.png";
import Image4 from "./assets/img/personal.png";

export function HomeUi({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [fname, setFirstName] = useState("");

  useEffect(() => {
    // Fetch data from the PHP backend
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    var userDetails = {
      mobile: await AsyncStorage.getItem("id"),
    };

    async () => {
      try {
        const response = await fetch(
          "http://192.168.1.100/my_notes/NotesGetProcess.php",
          {
            method: "post",
            body: JSON.stringify(userDetails),
          }
        );
        if (response.ok) {
          const data = response.text;
          setNotes(JSON.parse(data));
          setFirstName(await AsyncStorage.getItem("firstName"));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  };

  function goToAddNote() {
    navigation.navigate("AddNote");
  }

  function getImageSource(icon) {
    switch (icon) {
      case "study.png":
        return Image1;
      case "travel.png":
        return Image2;
      case "work.png":
        return Image3;
      case "personal.png":
        return Image4;
      default:
        return null; // Return null for unknown images or handle it differently
    }
  }

  // Function to log out the user
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("SignUp");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.noteItem} onPress={() => viewNote(item)}>
      <Image style={styles.noteIcon} source={getImageSource(item.icon)} />
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteDescription}>{item.description}</Text>
      </View>
      <Text style={styles.noteDate}>{item.date_time}</Text>
    </TouchableOpacity>
  );

  // Function to navigate to the NoteView screen with note details
  const viewNote = (note) => {
    navigation.navigate("NoteView", {
      id: note.id,
      title: note.title,
      description: note.description,
      category: note.category,
      date: note.date_time,
      icon: note.icon,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Text style={styles.headerText}>Hi {fname} !</Text>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.noteList}
      />
      <TouchableOpacity style={styles.addButton} onPress={goToAddNote}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    color: "darkblue",
    alignSelf: "center",
  },
  noteList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  noteIcon: {
    width: 50,
    height: 50,
    marginRight: 16,
    resizeMode: "contain",
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noteDescription: {
    fontSize: 14,
    color: "gray",
  },
  noteDate: {
    fontSize: 10,
    color: "gray",
    marginLeft: 16,
    bottom: 30,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "darkblue",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Add a bit more shadow
  },
  addButtonText: {
    fontSize: 40,
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
  },
  // Style for the Logout Button
  logoutButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#E53935", // Red color
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Add shadow for Android
  },
  logoutButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  // Style for the Profile Button
  profileButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1976D2", // Blue color
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Add shadow for Android
  },
  profileButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
