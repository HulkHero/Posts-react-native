import React,{useState,useEffect,useContext} from 'react'
import { useTheme ,List} from 'react-native-paper';
import NoteContext from '../context/noteContext';
import { View,FlatList } from 'react-native';
import FriendsShowCard from './FriendsShowCard';
import Axios from "axios"
import {decode as atob, encode as btoa} from 'base-64'

const ShowFriends = (props) => {
    const a = useContext(NoteContext)
    const [data, setData] = useState([]);
    const [avatar, setAvatar] = useState();
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
  
    useEffect(() => {
      if(a.id){
    Axios.get(`https://nice-plum-panda-tam.cyclic.app/showFriends/${a.id}`).then((res) => {
    //  console.log(res.data.user.friends,"hellllll");
    //  console.log(res.data.img)
      setAvatar(res.data.img)
    //   console.log(res.data.img,"her")
     setData(res.data.user.friends);
    }) } 
    
    }, [a.id,props.rendr])

    const renderItem = ({ item ,index}) => {
        // console.log(index)
        let img12= avatar[index]
        // console.log(img12,"img12")
          const base64= btoa(new Uint8Array(img12.avatar.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
        // const base64= btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
        //     return data + String.fromCharCode(byte);
        // }, ''));
        const img=`data:image/png;base64,${base64}`
        
        return (
        <FriendsShowCard key={item._id}  userId={a.id} name={item.name}  image={img}  />
      )};
  return (
    <View>
       
      <List.Accordion
        title="My Friends"
        expanded={expanded}
        onPress={handlePress}
        // left={props => <List.Icon {...props} icon="folder" />}
        >
       
        { avatar &&
          <FlatList
          data={data}
          renderItem={renderItem}          
          >        
          </FlatList> 
        }
        </List.Accordion>
    </View>
  )
}

export default ShowFriends ;