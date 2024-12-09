import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function NoteCategoryDropDownUi({ onValueChange }) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategoryTypes();
  }, []);

  const fetchCategoryTypes = () => {
    fetch("http://192.168.1.100/my_notes/noteCategoryGetProcess.php", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setCategories(transformedData);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (onValueChange) {
      onValueChange(category);
    }
  };

  const ui = (
    <View style={styles.container}>
      <Text style={styles.label}>Select Type:</Text>
      <DropDownPicker
        open={open}
        value={selectedCategory}
        items={categories}
        setOpen={setOpen}
        setValue={setSelectedCategory}
        onChangeValue={handleCategoryChange}
        style={styles.picker}
      />
    </View>
  );

  return ui;
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    flex:1,
   
 
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
  },
});
