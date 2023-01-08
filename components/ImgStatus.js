import React, { useContext, useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import NoteContext from './context/noteContext'
import Axios from "axios";
import { decode as atob, encode as btoa } from 'base-64';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, TextInput, IconButton, useTheme, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationEvents } from 'react-navigation';
import SkeletonLoader from 'expo-skeleton-loader';

const ImgStatus = ({ route }) => {
    const theme = useTheme()
    const navigation = useNavigation();
    const a = useContext(NoteContext)
    const [data, setData] = useState([]);

    const [defaultText, setDefaultText] = useState("Status");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageServer, setImageServer] = useState(null);
    const [imageStorage, setImageStorage] = useState(null);
    const [dumy, setDumy] = useState(false)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        AsyncStorage.removeItem("photo")
        Axios.get(`https://nice-plum-panda-tam.cyclic.app/getProfile/${a.id}`).then((response) => {
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
        setImageServer(img)
        setPreviewUrl(img)
        setDumy(false)

    }

    const getPreview = (imgUri) => {
        setPreviewUrl(imgUri)

    }
    const getAsync = async () => {
        const imgStorage = await AsyncStorage.getItem("photo")
        if (imgStorage) {
            var imgStore = JSON.parse(imgStorage)
            console.log("inside storage")
            setImageStorage(imgStore)
            setPreviewUrl(imgStore.uri)
        }
    }
    // useEffect(() => {
    //     // if (route.params?.imgUri) {
    //     //     console.log("inside route.params")
    //     //     setPreviewUrl(route.params.imgUri)
    //     // }
    //     getAsync();


    // }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAsync();
            //Put your Data loading function here instead of my loadData()
        });
        return unsubscribe;
    }, [navigation]);

    const discardImage = () => {
        AsyncStorage.removeItem("photo")
        setImageStorage(null)
        setPreviewUrl(imageServer)

    }

    const handleSubmit = () => {
        setLoader(true)

        if (imageStorage) {


            let localUri = imageStorage.uri;
            // setPhotoShow(localUri);
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            // let formData = new FormData();


            const formData = new FormData();
            formData.append("status", defaultText)
            formData.append("createrId", a.id)
            // formData.append("image",image);
            formData.append('avatar', { uri: localUri, name: filename, type });
            Axios.post("https://nice-plum-panda-tam.cyclic.app/avatar", formData, { headers: { 'content-type': 'multipart/form-data' } }).then((response) => {
                console.log(response)
                setImageStorage(null)
                setLoader(false)
                // setOpenSnack(true)
            }).catch(err => { console.log(err, "inside stoage err"); setLoader(false) })
        }
        else {
            const formData = new FormData();
            formData.append("status", defaultText)
            formData.append("createrId", a.id)
            // formData.append("image",image);
            formData.append('avatar', { uri: imageServer, name: "photo", type: "png" });
            Axios.post("https://nice-plum-panda-tam.cyclic.app/avatar", formData, { headers: { 'content-type': 'multipart/form-data' } }).then((response) => {
                console.log(response)
                console.log("updated without image")
                setLoader(false)
                // setImageStorage(null)
                // setOpenSnack(true)
            }).catch(err => { console.log(err, "inside server err"), setLoader(false) })


        }
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
            {data ?

                <View style={{}}>
                    {/* <NavigationEvents
                        onWillFocus={() => {
                            getAsync();
                        }}
                    /> */}
                    {previewUrl ?
                        <View style={{ position: "relative" }}>
                            <Image
                                style={{ marginVertical: 10, marginRight: "auto", marginLeft: "auto", maxHeight: 200, minHeight: 200, maxWidth: 200, minWidth: 200, borderRadius: 30, boxShadow: "1px 1px 5px 5px #cde8cc", objectFit: "cover" }}
                                alt="hello"
                                // src={previewUrl}
                                source={{
                                    uri: previewUrl
                                }}
                            >
                            </Image>
                            <IconButton style={{ boxShadow: "2px 2px 5px 3px green", backgroundColor: "rgb(51, 102, 255,0.5)", position: "absolute", bottom: 10, left: 50 }} mode="contained" icon="camera" title="camera" onPress={() => navigation.navigate("Camera")}></IconButton>
                            {imageStorage ? <IconButton iconColor={theme.colors.error} style={{ boxShadow: "2px 2px 5px 3px green", backgroundColor: "rgb(51, 102, 255,0.5)", position: "absolute", bottom: 0, right: 50, color: theme.colors.error }} mode="contained" icon="close" title="discard" onPress={() => discardImage()}></IconButton> : null}
                        </View>
                        : <View>
                            <SkeletonLoader >
                                <SkeletonLoader.Container style={{ marginVertical: 10, marginRight: "auto", marginLeft: "auto", maxHeight: 200, minHeight: 200, maxWidth: 200, minWidth: 200, borderRadius: 30, boxShadow: "1px 1px 5px 5px #cde8cc", objectFit: "cover" }} ></SkeletonLoader.Container>
                            </SkeletonLoader>
                        </View>
                    }
                    <TextInput style={{ minWidth: "97%", maxWidth: "100%", marginRight: "auto", marginLeft: "auto", }} value={defaultText} onChangeText={setDefaultText}></TextInput>
                    <Button mode="contained" loading={loader} disabled={loader} style={{ borderRadius: 30, marginTop: 10, marginLeft: "auto", marginRight: "auto", minWidth: "97%", maxWidth: "100%" }} title="Upload Status and Image" onPress={() => { handleSubmit() }}>Upload Image and Status</Button>

                </View> : <ActivityIndicator />

            }
        </View>

    )
}

export default ImgStatus