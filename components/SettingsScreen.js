import React, { useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, Divider, List, Switch, TouchableRipple, } from 'react-native-paper';
import NoteContext from './context/noteContext';
import { Ionicons } from '@expo/vector-icons';
// import { mdiLogout } from '@mdi/js';
function SettingsScreen({ navigation }) {
    const a = useContext(NoteContext)
    const [darkMode, setDarkMode] = useState(false)
    const handleMode = () => {
        if (a.mode == "dark") {
            a.setMode("light")
            setDarkMode(false)
        }
        else {
            a.setMode("dark")
            setDarkMode(true)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>Settings screen</Text> */}
            <List.Item
                // mode="contained"
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            >Details</List.Item>
            <Divider></Divider>

            {/* <Button mode="contained" onPress={() => { a.Signout() }}>SignOut</Button> */}
            <TouchableRipple onPress={() => console.log("signout")}>
                <List.Item
                    title="Sign Out"
                    // description="Item description"
                    right={props => <Ionicons name="log-out-outline" size={24} />}
                />
            </TouchableRipple>
            <Divider></Divider>
            <TouchableRipple onPress={() => { handleMode() }}>
                <List.Item
                    title="Mode"
                    // description="Item description"
                    right={props => <Switch value={darkMode} style={{ maxHeight: 15, marginTop: "auto", marginBottom: "auto" }} onValueChange={() => handleMode()} />}
                />
            </TouchableRipple>
            <Divider></Divider>

        </View>
    );
}

export default SettingsScreen;