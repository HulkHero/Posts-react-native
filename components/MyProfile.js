import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native'
import NoteContext from './context/noteContext'
import Axios from "axios";
import { decode as atob, encode as btoa } from 'base-64';

import Cards from './Cards';
import ImgStatus from './ImgStatus';
import { ActivityIndicator, Text, useTheme, Card } from 'react-native-paper';
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
        let base64 = null;
        let img = null;
        if (item.image.data) {
            base64 = btoa(
                new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, '')
            );
            img = `data:image/png;base64,${base64}`;
        } else {
            console.log('no image');
        }
        return (
            <Cards key={item._id} ondislike={ondislike} userId={a.id} likes={item.likes} id={item._id} name={item.creatername} date={item.date} image={img} heading={item.heading} caption={item.caption} onlike={onlike} displayLike={lik} />
        )
    };

    return (
        <ScrollView>
            <ImgStatus></ImgStatus>

            {data ?
                <FlatList
                    data={data}
                    renderItem={renderItem}

                    // canLoadMore={hasMore}
                    // onLoadMoreAsync={fetchMoreData}
                    ListFooterComponent={(props) => hasMore ? <ActivityIndicator style={{ marginTop: 5 }} {...props}></ActivityIndicator> : <Text style={{ color: theme.colors.primary, marginTop: 5, marginLeft: "auto", marginRight: "auto" }} {...props}>End</Text>}
                />
                :
                <Card style={{ maxWidth: "97%", minWidth: "97%", marginLeft: "auto", marginRight: "auto", marginTop: 10, minHeight: "50%", maxHeight: "50%", borderRadius: 10 }}>
                    <SkeletonLoader highlightColor={theme.colors.outline} boneColor={theme.colors.onSurfaceVariant} duration={1000} style={{ minHeight: "22%" }}  >
                        <SkeletonLoader.Container style={{ flex: 1, flexDirection: "row" }} >

                            <SkeletonLoader.Item style={{ minheight: 70, maxHeight: 70, maxWidth: 70, borderRadius: 60, marginLeft: 10, marginTop: 5 }}></SkeletonLoader.Item>


                            <SkeletonLoader.Item style={{ maxHeight: 25, minHeight: 25, maxWidth: 170, borderRadius: 10, marginTop: 20, marginLeft: 10 }}></SkeletonLoader.Item>


                        </SkeletonLoader.Container>
                    </SkeletonLoader>

                    <SkeletonLoader highlightColor={theme.colors.outline} boneColor={theme.colors.onSurfaceVariant} duration={1500} style={{ marginVertical: 10, maxHeight: "70%" }}>

                        {/* <AvatarLayout ></AvatarLayout> */}
                        <SkeletonLoader.Container  ></SkeletonLoader.Container>
                    </SkeletonLoader>

                </Card>
            }
        </ScrollView>
    )
}

export default MyProfile