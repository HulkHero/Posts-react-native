import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { Button } from "react-native-paper"
import NoteContext from './context/noteContext';
const DetailsScreen = () => {
    const a = useContext(NoteContext)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
            <Button mode="contained" onPress={() => { a.Signout() }}>SignOut</Button>
        </View>
    )
}

export default DetailsScreen