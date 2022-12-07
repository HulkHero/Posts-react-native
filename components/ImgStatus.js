import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, Image } from 'react-native'
import NoteContext from './context/noteContext'
import Axios from "axios";
import { decode as atob, encode as btoa } from 'base-64';
import ProfileCard from './ProfileCard';
import { TextInput } from 'react-native-paper';
const ImgStatus = () => {
    const a = useContext(NoteContext)
    const [data, setData] = useState([]);
    const [defaultText, setDefaultText] = useState("Status");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dumy, setDumy] = useState(false)
    useEffect(() => {
        Axios.get(`http://192.168.18.21:5000/getProfile/${a.id}`).then((response) => {
            setData(response.data);
            console.log("got proile", response.data);
            setDumy(true)
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }, [a.id])

    if (dumy == true) {
        console.log("jjk")
        setDefaultText(data[0].Status)
        console.log(data[0], "status")
        const base64 = btoa(new Uint8Array(data[0].avatar.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
        const img = `data:image/png;base64,${base64}`
        setPreviewUrl(img)
        setDumy(false)

    }



    // useEffect(() => {
    //     console.log(data)
    //     if (data != undefined) {

    //         setDefaultText(data[0].Status)
    //         console.log(data[0], "status")
    //         const base64 = btoa(new Uint8Array(data[0].avatar.data.data).reduce(function (data, byte) {
    //             return data + String.fromCharCode(byte);
    //         }, ''));
    //         const img = `data:image/png;base64,${base64}`
    //         setPreviewUrl(img)
    //     }

    // }, [data])

    return (

        <View>
            {data &&
                <View style={{}}>
                    <Image
                        style={{ marginVertical: 10, marginRight: "auto", marginLeft: "auto", maxHeight: 200, minHeight: 200, maxWidth: 200, minWidth: 200, borderRadius: 30, boxShadow: "1px 1px 5px 5px #cde8cc", objectFit: "cover" }}
                        alt="hello"
                        // src={previewUrl}
                        source={{
                            uri: previewUrl
                        }}
                    />
                    <TextInput style={{ minWidth: "100%", maxWidth: "100%", marginRight: "auto", marginLeft: "auto", }} value={defaultText} onChangeText={setDefaultText}></TextInput>

                </View>
            }
        </View>

    )
}

export default ImgStatus