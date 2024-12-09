import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Image1 from "./assets/img/study.png";
import Image2 from "./assets/img/travel.png";
import Image3 from "./assets/img/work.png";
import Image4 from "./assets/img/personal.png";
import DeleteIcon from "./assets/img/delete.png"; 

export function NoteView({ route, navigation }) {
  const { title, description, category, date, icon,id } = route.params;

  async function deleteNote() {
    try {
  
      const noteId = id; 
  
      const response = await fetch(
        `http://192.168.1.100/my_notes/DeleteNoteProcess.php`,
        {
          method: "POST",
          body: JSON.stringify({ noteId }),
        }
      );
  
      const text = await response.text();
  
      var splitResponse = text.split("+");
      // Alert.alert("Message", splitResponse[0]);
  
      if (splitResponse[0] === "Success") {
     
        Alert.alert("Success", "Note deleted successfully");
  
     
        navigation.navigate("Home");
      } else {
      
        Alert.alert("Error", "Failed to delete note. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
     
      Alert.alert("Error", "Failed to delete note. Please try again.");
    }
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
        return null; 
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Note</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteNote}
          >
            <Image source={DeleteIcon} style={styles.deleteIcon} />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Note Details */}
        <Text style={styles.noteTitle}>{title}</Text>
        <Text style={styles.noteCategory}>{category}</Text>
        <Text style={styles.noteDate}>{date}</Text>

        {/* Note Content */}
        <Text style={styles.noteDescription}>{description}</Text>

        {/* Display an image */}
        <Image
        style={styles.noteIcon}
        source={getImageSource(icon)}
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  headerTitle: {
  
    fontSize: 24,
    fontWeight: "bold",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },  noteIcon: {
 
    marginLeft: 46,
    resizeMode: "contain",
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  noteTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteCategory: {
    fontSize: 16,
    color: "gray",
  },
  noteDate: {
    fontSize: 12,
    color: "gray",
    marginBottom: 16,
  },
  noteDescription: {
    fontSize: 16,
    marginBottom: 54,
  },
  noteImage: {
    width: "50%",
    height: 100,
    resizeMode: "cover",
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default NoteView;
