import React, { useState, useContext } from 'react'
import { Alert, View, StyleSheet } from 'react-native'
import { Text, TextInput, useTheme, Button } from 'react-native-paper'
import Axios from 'axios'
import NoteContext from "./context/noteContext"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SignIn = ({ navigation }) => {
    const theme = useTheme()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [tbStyles, setStyles] = useState(false)
    // const [obj, setObj] = useState({
    //     token: null,
    //     id: null,
    // })


    const a = useContext(NoteContext)

    const AsyncStorageSave = async (token, id) => {
        try {
            const obj = {
                token: token,
                id: id
            }
            await AsyncStorage.setItem("token", JSON.stringify(obj))
        }
        catch (err) { console.log("cant save") }

    }

    const handleSubmit = async () => {
        console.log(password, "hello")
        Axios.post("http://10.75.46.168:5000/login", {
            email: username,
            password: password

        }).then(res => {
            // a.setToken(res.token)
            // a.setId(response.data.userId)
            console.log("hlo")
            console.log(res.data.token)
            console.log(res.data.token, "sif")
            // setObj({
            //     token: res.data.token,
            //     id: res.data.userId
            // })
            AsyncStorageSave(res.data.token, res.data.userId)
            a.setId(res.data.userId)
            a.setToken(res.data.token)




            a.Signin(token)
            console.log(obj.token, "si2f")


        }).catch(() => {
            alert("login failed")
        })
    }
    return (
        <View style={{
            flex: 1, justifyContent: "center", alignItems
                : "center"
        }}>
            <Text variant="displayLarge" style={{ color: theme.colors.primary }}>{"<Hulk>"}</Text>

            <TextInput
                mode="outlined"
                label="username"
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                style={{ minWidth: "80%", maxWidth: "80%", maxHeight: 60 }}
            // right={<TextInput.Affix username="/100" />}
            />
            <TextInput
                mode="outlined"
                label="password"
                placeholder="password"
                value={password}
                style={{ minWidth: "80%", maxWidth: "80%", maxHeight: 60 }}
                // right={<TextInput.Affix password="/100" />}
                onChangeText={setPassword}
            />
            <Text color={theme.colors.primary} style={[tbStyles ? styles.textButtonLine : styles.textButton, { color: theme.colors.primary }]} onPress={() => { setStyles(true); navigation.navigate('SignUp') }}>New User ? SignUp</Text>
            <Button backgroundColor={theme.colors.primary} marginTop={10} mode="contained" onPress={() => handleSubmit()}>SignIn</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    textButtonLine: {
        textDecorationLine: "underline",
        marginLeft: "10%", minWidth: "55%", maxWidth: "55%", alignSelf: "flex-start"

    },
    textButton: {
        marginLeft: "10%", minWidth: "55%", maxWidth: "55%", alignSelf: "flex-start"
    }

})

export default SignIn