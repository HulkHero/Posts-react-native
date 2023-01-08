import React from 'react'
import { Text } from 'react-native-paper'
import { TouchableOpacity, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const CameraScreen = () => {
    const navigation = useNavigation()

    // const [permission, requestPermission] = Camera.useCameraPermissions();
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef();
    // const { user } = useContext(AuthenticationContext);

    const snap = async () => {
        console.log("hello")
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            AsyncStorage.setItem(`photo`, JSON.stringify(photo));
            navigation.goBack();
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Camera
            ref={(camera) => (cameraRef.current = camera)}
            type={Camera.Constants.Type.front}
            style={{ width: "100%", height: "100%" }}
            ratio={"16:9"}
        >
            <TouchableOpacity onPress={snap}>
                <View style={{
                    width: "100%", height: "100%",
                    zIndex: 999

                }}>
                </View>

            </TouchableOpacity>
        </Camera>
    )
}

export default CameraScreen