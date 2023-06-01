import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider, Text, List, Switch, TouchableRipple, Modal, Portal, ActivityIndicator } from 'react-native-paper';
import NoteContext from './context/noteContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { Keyframe, SlideInDown, SlideInUp, withRepeat, useAnimatedStyle, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';
// import { mdiLogout } from '@mdi/js';
function SettingsScreen({ navigation }) {
    const a = useContext(NoteContext)
    const [darkMode, setDarkMode] = useState(false)
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, maxWidth: "75%", minWidth: "75%", minHeight: "20%", maxHeight: "20%", alignSelf: "center" };
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
    const ViewAnimated = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withRepeat(withSequence(withTiming(-150, { duration: 0 }), withDelay(300, withTiming(350, { duration: 3000 })), withTiming(-150, { duration: 1000, easing: Easing.out })), -1),

            }
        ]
    }))

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withRepeat(withSequence(withTiming(-160, { duration: 0 }), withDelay(100, withTiming(350, { duration: 3000 })), withTiming(-160, { duration: 1000, easing: Easing.inOut })), -1),
            }
        ]

    }))
    const keyframe = new Keyframe({
        0: {
            transform: [{ rotate: '0deg' }],
        },
        100: {
            transform: [{ rotate: '90deg' }],
        },
    })

    return (

        <View style={{ flex: 1, }}>
            {/* <Text>Settings screen</Text> */}
            <List.Item
                // mode="contained"
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            >Details</List.Item>
            <Divider></Divider>

            {/* <Button mode="contained" onPress={() => { a.Signout() }}>SignOut</Button> */}
            <TouchableRipple onPress={() => { showModal(); a.Signout(); hideModal() }}>
                <List.Item
                    title="Sign Out"
                    // description="Item description"
                    right={props => <Ionicons name="log-out-outline" size={24} />}
                />
            </TouchableRipple>
            <Divider></Divider>
            <TouchableRipple onPress={() => { handleMode() }}>
                <List.Item
                    title="Dark Mode"
                    // description="Item description"
                    right={props => <Switch value={darkMode} style={{ maxHeight: 15, marginTop: "auto", marginBottom: "auto" }} onValueChange={() => handleMode()} />}
                />
            </TouchableRipple>
            <Divider></Divider>
            {/* <Animated.View style={ViewAnimated}> */}


            <Animated.View style={animatedStyle}>
                <Text
                // style={[{ letterSpacing: 0.8 }, animatedStyle]}
                >Hulk Smash</Text>
            </Animated.View>
            {/* </Animated.View> */}

            <Portal>
                <Modal visible={visible} dismissable={false} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", minHeight: "15%", maxWidth: "100%", }}>
                        <ActivityIndicator animating={true} size="large" />
                        <Text>Signing Out...</Text>
                    </View>
                </Modal>
            </Portal>


        </View>

    );
}

export default SettingsScreen;