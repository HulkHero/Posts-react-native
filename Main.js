
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailsScreen from './components/DetailsScreen';
import SettingsScreen from './components/SettingsScreen';
import MyProfile from './components/MyProfile';
import Home2 from './components/Home2';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteContext from './components/context/noteContext';
import theme from './theme';
import { darkTheme } from "./theme"
import AddPosts from './components/AddPosts';
import { StatusBar } from 'react-native';
import ShowFriends from './components/FriendsScreen/ShowFriends';
import FriendsScreen from './components/FriendsScreen/FriendsScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>

            <HomeStack.Screen name="Posts" component={Home2} />
            <HomeStack.Screen name="Details" component={DetailsScreen} />

        </HomeStack.Navigator>
    );
}


const AddPostStack = createNativeStackNavigator();
function AddPostStackScreen() {
    <AddPostStack.Navigator>
        <AddPostStack.Screen name="AddPost" component={AddPosts} />
    </AddPostStack.Navigator>
}
const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="Details" component={DetailsScreen} />
        </SettingsStack.Navigator>
    );
}
const LoginStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="My Profile" component={MyProfile} />

        </ProfileStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
export default function Main() {

    const [isSigned, setIsSigned] = useState(false)
    const a = useContext(NoteContext)
    console.log("inside app")
    const getStorageData = async () => {
        try {
            await AsyncStorage.getItem("token").then(obje => {
                var obj = JSON.parse(obje)
                console.log(obj, "objMain")
                // console.log(a.token, "a")
                if (obj) {
                    // console.log("inside obj if", obj.token)
                    setIsSigned(true)
                    a.setToken(obj.token)
                    a.setId(obj.id)
                    a.setcreatername(obj.creatername)

                }
                else {
                    setIsSigned(false)
                }
            })
            // a.setToken(getvalue.token)
            // a.setId(getvalue.id)

            // setIsSigned(true)
        }
        catch (err) {
            console.log(err, "error storage")

        }
    }
    useEffect(() => {
        getStorageData();
        if (a.token) {
            setIsSigned(true)
        }


    })

    // if (!a.token) {
    //   try {
    //     const getvalue = AsyncStorage.getItem("token")
    //     console.log()
    //     a.setToken(getvalue.token)
    //     a.setId(getvalue.id)

    //     setIsSigned(true)
    //   }
    //   catch (err) {
    //     console.log(err, "error storage")
    //     setIsSigned(false)
    //   }

    // }

    return (
        <PaperProvider theme={a.mode === 'light' ? theme : darkTheme}>
            <NavigationContainer theme={a.mode === 'light' ? DefaultTheme : DarkTheme} >
                <StatusBar animated={true} backgroundColor={a.mode === 'light' ? theme.colors.primary : DarkTheme.colors.background} ></StatusBar>
                {isSigned ?
                    <Tab.Navigator
                        // screenOptions={{ headerShown: false }}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === 'Posts') {
                                    iconName = focused
                                        ? 'home-sharp'
                                        : 'home-outline';
                                } else if (route.name === 'Settings') {
                                    iconName = focused ? 'settings' : 'settings-outline';
                                }
                                else if (route.name === "Profile") {
                                    iconName = focused ? 'ios-person' : 'ios-person-outline';
                                }
                                else if (route.name === "AddPost") {
                                    iconName = focused ? 'ios-add-circle' : 'ios-add';
                                }
                                else if (route.name === "Friends") {
                                    iconName = focused ? 'person-add' : 'person-add-outline';
                                }

                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: theme.colors.primary,
                            tabBarInactiveTintColor: 'gray',
                            headerShown: false,
                            // tabBarStyle: { position: 'absolute' },
                            // tabBarBackground: () => (
                            //     <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
                            // ),

                        })}
                        initialRouteName="Posts"
                        tabBarHideOnKeyboard={true}
                    >

                        <Tab.Screen name="Posts" component={HomeStackScreen} />
                        <Tab.Screen name="Profile" component={ProfileStackScreen} />
                        <Tab.Screen name="AddPost" component={AddPosts} />
                        <Tab.Screen name="Friends" component={FriendsScreen} />
                        <Tab.Screen name="Settings" component={SettingsStackScreen} />
                    </Tab.Navigator>
                    : <LoginStack.Navigator initialRouteName='SignIn'>

                        <LoginStack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
                        <LoginStack.Screen name="SignUp" component={SignUp} />
                    </LoginStack.Navigator>
                }
            </NavigationContainer>

        </PaperProvider >

    );
}

