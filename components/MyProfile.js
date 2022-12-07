import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import NoteContext from './context/noteContext'
import Axios from "axios";
import { decode as atob, encode as btoa } from 'base-64';
import ProfileCard from './ProfileCard';
import ImgStatus from './ImgStatus';
const MyProfile = () => {
    const a = useContext(NoteContext)
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("id in my posts", a.id)
        Axios.get(`http://192.168.18.21:5000/myPosts/${a.id}`, {
            headers: {
                'Authorization': a.token
            }
        }).then((response) => {
            if (response.status == 400) {
                alert("you are not authorized")
            }
            else {
                setData(response.data);
                console.log("return my posts")
            }
        }).catch(response => {
            alert("you are not sds authorized")
        })

    }, [a.id])

    const renderItem = ({ item }) => {
        const base64 = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));

        const img = `data:image/png;base64,${base64}`
        return (
            <ProfileCard props={item} img={img} />
        )
    };

    return (
        <ScrollView>
            <ImgStatus></ImgStatus>
            <View>
                {data &&
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                    // canLoadMore={hasMore}
                    // onLoadMoreAsync={fetchMoreData}

                    />


                }

            </View>
        </ScrollView>
    )
}

export default MyProfile