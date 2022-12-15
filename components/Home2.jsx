import React from 'react'
import { useState ,useEffect,useContext} from 'react'
import Cards from './Cards';
import Axios from "axios";
import { View ,FlatList,RefreshControl} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { useTheme ,ActivityIndicator,Text} from 'react-native-paper';
import NoteContext from './context/noteContext';
const Home2 = () => {
     const theme=useTheme()
     const a= useContext(NoteContext)
    const [data,setData]=useState([])
    const [lik,setLik]=useState()
    const [skip,setSkip]=useState(0)
    const [hasMore,setHasMore]=useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    var limit=2;

    useEffect(() => {
        Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${skip}/${limit}`).then((response)=>{
         console.log("response")
           setSkip(2)
          setData(response.data)
      }).catch(err=>{console.log(err,"error")})
        
  
      },[])
      const onlike=(id)=>{
        if (a.id){
          Axios.put(`https://nice-plum-panda-tam.cyclic.app/likePost/${id}/${a.id}`).then((response) => {
           
            console.log("response:dislike", response)
            setLik(response.data.likes.length);
            console.log(lik)
        
          })
  
        }
        else{ console.log("login first")}
       
  
      }
      const ondislike=(id)=>{
        
        Axios.put(`https://nice-plum-panda-tam.cyclic.app/dislikePost/${id}/${a.id}`).then((response) => {
          setLik(response.data.likes.length);
             
       
        })
  
     }
     const fetchMoreData2=async()=>{
      setIsRefreshing(true)
      // setSkip(skip+2);
      console.log("inside fetchMoreData2")
      
      
      console.log("skip",skip)
      console.log("limit",limit)
      await Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${0}/${1}`).then((response)=>{
      if (response.data[0]._id==data[0]._id) {
        console.log("same")
        setIsRefreshing(false)
      }
      else{
        setData(response.data.concat(data))
        setIsRefreshing(false)

      }
     
      }).catch(response=>{
        console.log("response error",response)
        if (response.response.status ==300){
          console.log("300")
          setHasMore(false)
          setIsRefreshing(false)
        }
      })
     }

  

      const fetchMoreData=async()=>{
        console.log("inside fetchMoreData")
        
        if(hasMore==true){
          setSkip(skip+2);

        
        await Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${skip}/${limit}`).then((response)=>{
         setData(data.concat(response.data))
        }).catch(response=>{
          console.log("response error",response)
          if (response.response.status ==300){
            console.log("300")
            setHasMore(false)
          }
        })
      }
       }

       const renderItem = ({ item }) => {
        const base64= btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
       
        const img=`data:image/png;base64,${base64}`
        return (
        <Cards key={item._id} ondislike={ondislike} userId={a.id} likes={item.likes} id={item._id} name={item.creatername} date={item.date} image={img}  heading={item.heading} caption={item.caption} onlike={onlike} displayLike={lik}/>
      )};
       
       



     
  return (
    <View >
    {data && <FlatList
            // style={{backgroundColor:theme.colors.background}}
            //  renderScrollComponent={props => <InfiniteScrollView {...props} />}
            data={data}
            extraData={data}
            keyExtractor={data._id}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            canLoadMore={hasMore}
            onEndReachedThreshold={0.2}
            // onLoadMoreAsync={fetchMoreData}
            onEndReached={fetchMoreData}
            showDefaultLoadingIndicators={true}
            renderFooter={(props) => <Text {...props}>Loading...</Text>} // optional
            //refreshing={true} // Added pull to refesh state
            //onRefresh={fetchMoreData2} 
            ListFooterComponent={(props) =>hasMore?<ActivityIndicator style={{marginTop:5}} {...props}></ActivityIndicator>:<Text style={{color:theme.colors.primary,marginTop:5,marginLeft:"auto",marginRight:"auto"}} {...props}>End</Text>}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchMoreData2} />}
            ></FlatList>
    }
    </View>

    

    
  )
}

export default Home2