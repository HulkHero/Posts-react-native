import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import NoteContext from './context/noteContext'
import Axios from "axios";
import { decode as atob, encode as btoa } from 'base-64';

import Cards from './Cards';
import ImgStatus from './ImgStatus';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
const MyProfile = () => {
    const theme = useTheme()
    const a = useContext(NoteContext)
    const [data, setData] = useState([]);
    const [lik, setLik] = useState()
    const [hasMore, setHasMore] = useState(true)
    // {
    //     headers: {
    //         'Authorization': a.token
    //     }
    useEffect(() => {
        console.log("id in my posts", a.id)
        const controller = new AbortController();
        Axios.get(`https://nice-plum-panda-tam.cyclic.app/myPosts/${a.id}`, {
            signal: controller.signal,

        }).then((response) => {
            if (response.status == 400) {
                alert("you are not authorized")
            }
            else {
                setData(response.data);
                setHasMore(false)
                console.log("return my posts")
            }
        }).catch(response => {
            // alert("you are not sds authorized")
        })
        return () => {
            controller.abort()
            console.log("abrot")
        }

    }, [a.id])
    const onlike = (id) => {
        if (a.id) {
            Axios.put(`https://nice-plum-panda-tam.cyclic.app/likePost/${id}/${a.id}`).then((response) => {

                // console.log("response:dislike", response)
                setLik(response.data.likes.length);
                console.log(lik)

            })

        }
        else { console.log("login first") }


    }
    const ondislike = (id) => {

        Axios.put(`https://nice-plum-panda-tam.cyclic.app/dislikePost/${id}/${a.id}`).then((response) => {
            setLik(response.data.likes.length);


        })

    }

    const renderItem = ({ item }) => {
        const base64 = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));

        const img = `data:image/png;base64,${base64}`
        return (
            <Cards key={item._id} ondislike={ondislike} userId={a.id} likes={item.likes} id={item._id} name={item.creatername} date={item.date} image={img} heading={item.heading} caption={item.caption} onlike={onlike} displayLike={lik} />
        )
    };

    return (
        <ScrollView>
            <ImgStatus></ImgStatus>


            <FlatList
                data={data}
                renderItem={renderItem}

                // canLoadMore={hasMore}
                // onLoadMoreAsync={fetchMoreData}
                ListFooterComponent={(props) => hasMore ? <ActivityIndicator style={{ marginTop: 5 }} {...props}></ActivityIndicator> : <Text style={{ color: theme.colors.primary, marginTop: 5, marginLeft: "auto", marginRight: "auto" }} {...props}>End</Text>}
            />


        </ScrollView>
    )
}

export default MyProfile