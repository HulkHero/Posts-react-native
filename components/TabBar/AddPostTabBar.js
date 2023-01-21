import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
// import Animated, { withRepeat, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    cancelAnimation,
    Easing,
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
const AddPostTabBar = (props) => {
    const theme = useTheme()
    const navigation = useNavigation();
    // const addIconAnimation = useAnimatedStyle(() => ({
    //     transform: [{
    //         rotateZ: withRepeat(withSequence(withTiming("0deg"), withTiming("360deg", { duration: 1500 }), withTiming("0deg")), -1),
    //     }]
    //     ,
    // }))


    const rotation = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${rotation.value}deg`,
                },
            ],
        };
    }, [rotation.value]);

    useEffect(() => {
        // if (props.focused == true) {
        //     rotation.value = withTiming(45, {
        //         duration: 1000,
        //         easing: Easing.linear,
        //     })


        // }
        // const subscribe = navigation.addListener("focus", () => {
        //     rotation.value = withTiming(45, {
        //         duration: 1000,
        //         easing: Easing.linear,
        //     })

        // })
        navigation.addListener("focus", () => {
            console.log("render icon")
            rotation.value = withTiming(45, {
                duration: 1000,
                easing: Easing.linear,
            })
        })
        return () => {
            console.log("unmount icon")
            // rotation.value = 0;
            cancelAnimation(rotation)
        }
    }, [navigation]);
    return (

        <Animated.Text style={animatedStyles}><Ionicons style={{
            marginLeft: 3, marginTop: 1.9, justifyContent: "center", alignItems: "center", alignSelf: "center",
            // transform: [{ rotate: "45deg" }],
            elevation: 20
        }} name="ios-add-circle" size={50} color={theme.colors.primary} /> </Animated.Text>

    )
}

const styles = StyleSheet.create({
    button: {
        // position: "relative",
        zIndex: 100000,
        bottom: "10%",
        left: "10%",
        // backgroundColor: theme.colors.background,
        // backgroundColor: "blue",
        color: "blue",
        // transform: "translate(-50%)",

        // flex: 1,


    }
})

export default AddPostTabBar