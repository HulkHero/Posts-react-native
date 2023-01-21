import React from 'react'
import { useState ,useEffect,useContext} from 'react'
import Cards from './Cards';
import Axios from "axios";
import { View ,FlatList,RefreshControl,Image,Dimensions,ScrollView} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { useTheme ,ActivityIndicator,Text, Card} from 'react-native-paper';
import NoteContext from './context/noteContext';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonLoader from "expo-skeleton-loader";

// const { width, height } = Dimensions.get("window");


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
           
            // console.log("response:dislike", response)
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
      
    {data.length>0 ? <FlatList
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
            ></FlatList>:
            <View>
              <Card style={{maxWidth:"97%",minWidth:"97%",marginLeft:"auto",marginRight:"auto",marginTop:10,minHeight:"40%",maxHeight:"50%",borderRadius:10}}>
               <SkeletonLoader highlightColor={theme.colors.skeletonhighlight} boneColor={theme.colors.skeletonbackground} duration={1000} style={{minHeight:"22%"}}  >
                 <SkeletonLoader.Container style={{flex:1,flexDirection:"row"}} >
             
                  <SkeletonLoader.Item style={{minheight:60,maxHeight:60,maxWidth:60,borderRadius:60,marginLeft:10,marginTop:7}}></SkeletonLoader.Item>
                  
                  
                  <SkeletonLoader.Item style={{maxHeight:20,minHeight:20,maxWidth:170 ,borderRadius:10,marginTop:25,marginLeft:10}}></SkeletonLoader.Item>
        
                  
                 </SkeletonLoader.Container>
               </SkeletonLoader>

            <SkeletonLoader highlightColor={theme.colors.skeletonhighlight} boneColor={theme.colors.skeletonbackground} duration={1000} style={{marginVertical:10,maxHeight:"70%"}}>
              
            {/* <AvatarLayout ></AvatarLayout> */}
            <SkeletonLoader.Container  ></SkeletonLoader.Container>
            </SkeletonLoader>
            
            </Card>


            <Card style={{maxWidth:"97%",minWidth:"97%",marginLeft:"auto",marginRight:"auto",marginTop:10,minHeight:"40%",maxHeight:"50%",borderRadius:10}}>
               <SkeletonLoader highlightColor={theme.colors.skeletonhighlight} boneColor={theme.colors.skeletonbackground} duration={1000} style={{minHeight:"22%"}}  >
                 <SkeletonLoader.Container style={{flex:1,flexDirection:"row"}} >
            
                  <SkeletonLoader.Item style={{minheight:60,maxHeight:60,maxWidth:60,borderRadius:60,marginLeft:10,marginTop:7}}></SkeletonLoader.Item>
                  
                  
                  <SkeletonLoader.Item style={{maxHeight:20,minHeight:20,maxWidth:170 ,borderRadius:10,marginTop:25,marginLeft:10}}></SkeletonLoader.Item>
        
                  
                 </SkeletonLoader.Container>
               </SkeletonLoader>

            <SkeletonLoader highlightColor={theme.colors.skeletonhighlight} boneColor={theme.colors.skeletonbackground} duration={1000} style={{marginVertical:10,maxHeight:"70%"}}>
              
          
            <SkeletonLoader.Container  ></SkeletonLoader.Container>
            </SkeletonLoader>
            
            </Card>
            </View>
    }
    </View>

    

    
  )
}

export default Home2