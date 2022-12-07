import React from 'react'
import { useState ,useEffect} from 'react'
import Cards from './Cards';
import Axios from "axios";
import { Button, Text, View ,FlatList} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {decode as atob, encode as btoa} from 'base-64'
// import theme from '../theme';
import { useTheme } from 'react-native-paper';
const Home2 = () => {
     const theme=useTheme()
    const [data,setData]=useState([])
    const [lik,setLik]=useState()
    const [skip,setSkip]=useState(0)
    const [hasMore,setHasMore]=useState(true)

    var limit=2;

    useEffect(() => {
        Axios.get(`http://10.75.46.168:5000/batchData/${skip}/${limit}`).then((response)=>{
         console.log("response")
           setSkip(2)
          setData(response.data)
      }).catch(err=>{console.log(err,"error")})
        
  
      },[])

      const fetchMoreData=async()=>{
        setSkip(skip+2);
        console.log("inside fetchMoreData")
        
        
        console.log("skip",skip)
        console.log("limit",limit)
        await Axios.get(`http://10.75.46.168:5000/batchData/${skip}/${limit}`).then((response)=>{
         setData(data.concat(response.data))
        }).catch(response=>{
          console.log("response error",response)
          if (response.response.status ==300){
            console.log("300")
            setHasMore(false)
          }
        })
       }

       const renderItem = ({ item }) => {
        const base64= btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
       
        const img=`data:image/png;base64,${base64}`
        return (
        <Cards props={item} img={img} />
      )};
       
       



     
  return (
    <View style={{backgroundColor:theme.colors.background}}>
    {data && <FlatList
            style={{backgroundColor:theme.colors.background}}
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            data={data}
            renderItem={renderItem}
            canLoadMore={hasMore}
            onLoadMoreAsync={fetchMoreData}
          />
    }
    </View>

    

    
  )
}

export default Home2