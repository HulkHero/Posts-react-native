import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, useTheme, Button, TouchableRipple } from 'react-native-paper'
import Axios from 'axios'
import NoteContext from "./context/noteContext"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { set } from 'react-native-reanimated'

const SignIn = () => {
    const navigation = useNavigation();
    const theme = useTheme()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [tbStyles, setStyles] = useState(false)
    const [loader, setLoader] = useState(false)
    const [dum, setDum] = useState(true)
    // const [obj, setObj] = useState({
    //     token: null,
    //     id: null,
    // })


    const a = useContext(NoteContext)

    const AsyncStorageSave = async (token, id, name, img) => {
        try {
            const obj = {
                token: token,
                id: id,
                creatername: name,

            }
            await AsyncStorage.multiSet([["token", JSON.stringify(obj)], ["avatar", JSON.stringify(img)]], () => {
                console.log("token saved")
                a.setIsSigned(true)
                setLoader(false)

            })



        }
        catch (err) { console.log(err, "cant save") }

    }

    const handleSubmit = async () => {
        console.log(password, "hello")
        setLoader(true)
        Axios.post("https://nice-plum-panda-tam.cyclic.app/login", {
            email: username,
            password: password

        }).then(res => {
            console.log(res.data.token)
            AsyncStorageSave(res.data.token, res.data.userId, res.data.name, res.data.avatar)

            console.log(res.data.token, "sif")

        })
            .catch(err => {

                console.log(err)
                alert("Login Failed")
            })
    }

    const handleSubmit2 = async () => {
        console.log(password, "hello")
        setLoader(true)
        Axios.post("https://nice-plum-panda-tam.cyclic.app/login", {
            email: "hammad",
            password: "hammad"

        }).then(res => {
            // a.setToken(res.token)
            // a.setId(response.data.userId)

            console.log(res.data.token, "sif")
            AsyncStorageSave(res.data.token, res.data.userId, res.data.name, res.data.avatar)

        }).catch(err => {

            console.log(err)
            alert("Login Failed")
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
                secureTextEntry={true}
                value={password}
                style={{ minWidth: "80%", maxWidth: "80%", maxHeight: 60 }}
                // right={<TextInput.Affix password="/100" />}
                onChangeText={setPassword}
            />
            <Text color={theme.colors.primary} style={[tbStyles ? styles.textButtonLine : styles.textButton, { color: theme.colors.primary }]} onPress={() => { setStyles(true); navigation.navigate('SignUp') }}>New User ? SignUp</Text>
            <Button backgroundColor={theme.colors.primary} loading={loader} disabled={loader} marginTop={10} mode="contained" onPress={() => handleSubmit()}>SignIn</Button>
            <TouchableRipple disabled={loader} onPress={() => handleSubmit2()} style={{ elevation: 5, margin: 20, marginBottom: 7, borderRadius: 6, alignSelf: "center", backgroundColor: theme.colors.error, minWidth: "50%", }} rippleColor="rgba(0, 0, 0, .32)">
                <>
                    <Text color={theme.colors.surface} variant="bodyLarge" style={{ margin: 10, marginBottom: 0, color: theme.colors.surface, textAlign: "center" }} > Login as </Text>
                    <Text color={theme.colors.surface} variant="bodyLarge" style={{ margin: 10, marginTop: 0, color: theme.colors.surface, textAlign: "center" }}>Hammad</Text>
                </>


            </TouchableRipple>
            <Text color={theme.colors.primary} style={[{ marginTop: 0, alignSelf: "center", textAlign: "center" }, { color: theme.colors.onSurface }]}>Recommended(skips SignUp process) for testing</Text>

            {/* <Button style={{ alignSelf: "center", minWidth: "100%", minHeight: 60 }} children={<Text>Hello</Text>} backgroundColor={theme.colors.error} color={theme.colors.error} mode="contained" loading={loader} disabled={loader} onPress={() => handleSubmit2()}>  </Button> */}
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