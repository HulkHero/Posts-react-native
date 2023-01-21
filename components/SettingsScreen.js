import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider, Text, List, Switch, TouchableRipple, } from 'react-native-paper';
import NoteContext from './context/noteContext';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Keyframe, SlideInDown, SlideInUp, withRepeat, useAnimatedStyle, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';
// import { mdiLogout } from '@mdi/js';
function SettingsScreen({ navigation }) {
    const a = useContext(NoteContext)
    const [darkMode, setDarkMode] = useState(false)
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
            <TouchableRipple onPress={() => a.Signout()}>
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

        </View>

    );
}

export default SettingsScreen;