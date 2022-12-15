import React,{useState} from 'react'
import { View } from 'react-native'
import AddFriends from './AddFriends'
import ReceivedFriends from './ReceivedFriends'
import ShowFriends from './ShowFriends'

const FriendsScreen = () => {
  const [rendr, setRendr] = useState(false)

  const toggleRendr=()=>{
       setRendr(!rendr)
  }
  return (
    <View>
      <AddFriends rendr={rendr }></AddFriends>
      <ShowFriends rendr={rendr} toggleRendr={toggleRendr}></ShowFriends>
      <ReceivedFriends rendr={rendr}></ReceivedFriends>
    </View>
  )
}

export default FriendsScreen