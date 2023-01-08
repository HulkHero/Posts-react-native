
import React, { useState, } from 'react'
import { View } from 'react-native'
import { Text, TextInput, useTheme, Button } from 'react-native-paper'
import Axios from 'axios'

import { useValidation } from 'react-native-form-validator'
const SignUp = () => {
    const theme = useTheme()
    const [name, setName] = useState("")
    const [loader, setLoader] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { validate, getErrorMessages, isFormValid } =
        useValidation({
            state: { name, username, password },
        });
    const handleSubmit = async () => {
        setLoader(true)
        validate({
            name: { minlength: 3, maxlength: 20, required: true },
            username: { email: true, required: true },
            password: { password: true, minlength: 6 }
        })
        if (isFormValid() === true) {
            console.log("form valid")
            await Axios.post("https://nice-plum-panda-tam.cyclic.app/signup", {
                name: name,
                email: username,
                password: password,
            }).then((response) => {
                console.log(response)
                alert("Signup successful,Login Now")
                // console.log(response.data.token)
                // a.setToken(response.data.token)
                setLoader(false)
            }).catch(err => setLoader(false));
        }
        else {
            setLoader(false)
        }
    }

    return (
        <View style={{
            flex: 1, justifyContent: "center", alignItems
                : "center"
        }}>
            <Text variant="displayLarge" style={{ color: theme.colors.primary }}>{"<Hulk>"}</Text>

            <TextInput
                mode="outlined"
                label="Name"
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ minWidth: "80%", maxWidth: "80%", maxHeight: 60 }}
            // right={<TextInput.Affix username="/100" />}
            />
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
            <Button backgroundColor={theme.colors.primary} loading={loader} disabled={loader} marginTop={10} mode="contained" onPress={() => handleSubmit()}>SignIn</Button>
            <Text style={{ paddingLeft: 4, color: theme.colors.error }}>{getErrorMessages()}</Text>
        </View>
    )
}

export default SignUp