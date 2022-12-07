import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const [token, setToken] = useState("");
    const [mode, setMode] = useState("light")
    const [id, setId] = useState();
    const [creatername, setcreatername] = useState("")
    const Signin = (token) => {
        setToken(token)
        console.log(token, "tokenhyh")

    }
    const Signout = async () => {
        await AsyncStorage.removeItem("token")
        console.log("inside removed")
        setToken(undefined)
    }

    console.log("inside context")
    return (
        <NoteContext.Provider value={{ token, setToken, id, setId, creatername, setcreatername, Signin, Signout, mode, setMode }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;