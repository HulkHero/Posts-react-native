import React, { useState, useEffect, useContext } from 'react'
import { useTheme, List } from 'react-native-paper';
import NoteContext from '../context/noteContext';
import { View, FlatList } from 'react-native';
import FriendsShowCard from './FriendsShowCard';
import Axios from "axios"
import { decode as atob, encode as btoa } from 'base-64'

const ReceivedFriendsCard = () => {

    return (
        <View>

        </View>

    )
}

export default ReceivedFriendsCard