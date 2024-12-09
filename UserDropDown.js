import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function UserDropDownUI({ onValueChange }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getUserTypes();
    }, []);

    const getUserTypes = () => {
        fetch("http://192.168.1.100/my_notes/userTypeGetProcess.php", {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            const transformedData = data.map(item => ({
                label: item.name,
                value: item.id.toString()
            }));
            setItems(transformedData);
        })
        .catch(error => {
            console.error("Error", error);
        });
    };

    const ui = (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(itemValue) => {
                setValue(itemValue);

                // Call the onValueChange callback with the selected value
                if (onValueChange) {
                    onValueChange(itemValue);
                }
            }}
        />
    );

    return ui;
}

const styles = StyleSheet.create({});
