import React,{useState,useEffect,useContext} from 'react'
import { Avatar, List,Card, useTheme,Divider } from 'react-native-paper';
import NoteContext from '../context/noteContext';
import { View,FlatList } from 'react-native';



const FriendsShowCard = (props) => {
    var image=props.image
  return (
    <View>
      
        <List.Item title={props.name}  left={(props)=><Avatar.Image {...props} source={{uri:image}} ></Avatar.Image>}/>
        
        <Divider></Divider>
    </View>
      
  )
}
export default FriendsShowCard