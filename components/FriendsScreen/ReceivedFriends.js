import React, { useState, useEffect, useContext } from 'react'
import { useTheme, List, IconButton, ActivityIndicator } from 'react-native-paper';
import NoteContext from '../context/noteContext';
import { View, FlatList } from 'react-native';
import FriendsShowCard from './FriendsShowCard';
import Axios from "axios"
import { decode as atob, encode as btoa } from 'base-64'

const ReceivedFriends = () => {
    const a = useContext(NoteContext);
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);
    const [accepted, setaccepted] = useState(false)
    const [Data, setData] = useState([])


    useEffect(() => {
        Axios.get(`https://nice-plum-panda-tam.cyclic.app/showRekuests/${a.id}`).then(response => {

            console.log("showRekuests", response);
            setData(response.data.rekuestRecieved);
        })

    }, [a.id, accepted])


    const AcceptRekuest = (targetId) => {
        console.log('AcceptRekuest', targetId)
        Axios.put("https://nice-plum-panda-tam.cyclic.app/acceptRekuest", { senderId: a.id, targetId: targetId }).then(response => {
            console.log("hello");
            setaccepted(!accepted)
            props.toggleRendr();
            // setData(Data && Data.map((item) => {
            //     return item._id != targetId;
            // }))
            if (Data.length == 0) {
                // setData("no rekuests")
            }
        }).catch(err => { console.log(err) })

    }

    const renderItem = ({ item, index }) => {

        return (
            <List.Item title={item.name} right={(props) => <IconButton
                icon="account-plus" onPress={() => AcceptRekuest(item._id)} ></IconButton>} />

        )
    };
    return (
        <View>
            <List.Accordion
                title="Received Requests"
                expanded={expanded}
                onPress={handlePress}
            // left={props => <List.Icon {...props} icon="folder" />}
            >
                {Data ?
                    <FlatList
                        data={Data}
                        renderItem={renderItem}
                    ></FlatList> : <ActivityIndicator></ActivityIndicator>

                }
            </List.Accordion>
        </View>

    )
}

export default ReceivedFriends