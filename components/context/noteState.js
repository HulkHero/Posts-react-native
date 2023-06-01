import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const [token, setToken] = useState("");
    const [mode, setMode] = useState("light")
    const [id, setId] = useState();
    const [creatername, setcreatername] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [isSigned, setIsSigned] = useState(false)
    const Signin = (token) => {
        setToken(token)
        console.log(token, "tokenhyh")

    }
    // const getStorageData = async () => {
    //     console.log("inside context get storage data")
    //     try {
    //         await AsyncStorage.getItem("token").then(obje => {
    //             var obj = JSON.parse(obje)
    //             console.log(obj, "objMain");

    //             if (obj) {
    //                 setIsSigned(true)
    //                 setToken(obj.token)
    //                 setId(obj.id)
    //                 setcreatername(obj.creatername)
    //             }
    //             else {
    //                 console.log("inside else")
    //                 setIsSigned(false)
    //             }
    //         })
    //         await AsyncStorage.getItem("avatar").then(obje => {
    //             var obj = JSON.parse(obje)
    //             if (obj) {
    //                 setAvatar(avatar)
    //                 console.log(obj, "objMainImage")
    //             }
    //             // console.log(a.token, "a")

    //         })
    //     }
    //     catch (err) {
    //         console.log(err, "error storage")

    //     }
    // }
    const Signout = async () => {
        // await AsyncStorage.multiRemove(["token", "avatar"]).then(() => {
        setIsSigned(false)
        console.log("inside removed")
        await AsyncStorage.multiRemove(["token", avatar])
        setToken(undefined)
        setAvatar(null)
        setcreatername("")
        setId("");

    }






    console.log("inside context")
    return (
        <NoteContext.Provider value={{ token, setToken, id, setId, creatername, setcreatername, Signin, Signout, mode, setMode, avatar, setAvatar, isSigned, setIsSigned }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;