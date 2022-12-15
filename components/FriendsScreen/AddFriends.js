import React, { useState, useEffect, useContext } from 'react'
import { Avatar, List, Card, useTheme, Divider, Searchbar, IconButton } from 'react-native-paper';
import NoteContext from '../context/noteContext';
import { View, FlatList } from 'react-native';
import Axios from 'axios';
const AddFriends = () => {
    const a = useContext(NoteContext);
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [Data, setData] = useState([])
    const SendRekuest = async (targetId) => {
        await Axios.post("https://nice-plum-panda-tam.cyclic.app/sendRekuest", { senderId: a.id, targetId: targetId }).then(response => {
            console.log(response, "rekuest Sent")
            alert("Rekuest Sent")
        })

    }
    if (searchQuery == "" || searchQuery == " ") {
        if (Data.length > 0) {

            setData([])
        }
    }

    const handleSubmit = () => {
        if (searchQuery == " ") {

        }
        else {
            Axios.get(`https://nice-plum-panda-tam.cyclic.app/showAddFriends/${searchQuery}`).then((response) => {
                console.log(response)
                setData(response.data)
            })

        }
    }

    const renderItem = ({ item, index }) => {

        return (
            <List.Item title={item.name} right={(props) => <IconButton icon="account-plus" onPress={() => SendRekuest(item._id)} ></IconButton>} />

        )
    };



    return (
        <View>
            <Searchbar
                placeholder="Search User"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={() => handleSubmit()}
            />
            {/* <List.Accordion
                title="Received Requests"
                expanded={expanded}
                onPress={handlePress}
            // left={props => <List.Icon {...props} icon="folder" />}
            > */}
            {Data ?
                <FlatList
                    data={Data}
                    renderItem={renderItem}
                ></FlatList> : "no userFound"

            }
            {/* </List.Accordion> */}
        </View>

    )
}

export default AddFriends