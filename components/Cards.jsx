import React,{useState,useEffect,useContext} from 'react'
import { Avatar, Button, Card, Title, Paragraph ,useTheme, IconButton,Text} from 'react-native-paper';
import { Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import NoteContext from './context/noteContext';
import { AntDesign } from '@expo/vector-icons';
const LeftContent = props => <Avatar.Icon {...props} icon="account"  />
const Cards = (props) => {
  const theme=useTheme()
  const a= useContext(NoteContext)
  const [like, setLike] = useState(false)
  const [modal, setModal] = useState(false)
  const [num, setnum] = useState(props.likes.length)
 
    
    var date = new Date(props.date);
    var options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
  };
  let likess
  var result = date.toLocaleDateString('en', options);


  useEffect(() => {
    if (props.likes?.includes(a.id)){
      setLike(true)
    }
      
  }, [])

  return (
    <Card mode="elevated"  elevation={2} style={{ marginTop:10 }}>
    <Card.Title title={props.name} titleStyle={{lineHeight:24,paddingTop:6}} subtitleStyle={{paddingBottom:6}} subtitle={result} left={LeftContent} />
    <Card.Content>
      <Title >{props.heading}</Title>
      <Paragraph >{props.caption}</Paragraph>
    </Card.Content>
    <Image style={{maxHeight: 200, minHeight: 200,resizeMode:"cover"}} source={{ uri: props.image }} />
    <Card.Actions onPress={()=>{console.log("card presse")}}>
      {/* <Button>Cancel</Button>
      <Button>Ok</Button> */}
      <TouchableWithoutFeedback onPress={()=>{ if(like==true){props.ondislike(props.id);setnum(props.likes.length--);
        setLike(false)
       }else{
          props.onlike(props.id);
          setLike(true)
          setnum(props.likes.length++)
        }}}>
           {  like==true?<AntDesign name="like1" size={26} color={theme.colors.primary}></AntDesign> :<AntDesign name="like2" size={26} color={theme.colors.primary}></AntDesign> 
         }

    
     
      </TouchableWithoutFeedback>
      
      <Text>{props.displayLikes? props.displayLikes :props.likes.length}</Text>
    </Card.Actions>
  </Card>
  )
}

export default Cards