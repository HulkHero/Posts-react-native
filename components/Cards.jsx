import React,{useState,useEffect,useContext} from 'react'
import { Avatar, Card, Title, Paragraph ,useTheme, Text} from 'react-native-paper';
import { Image,  TouchableWithoutFeedback,View,Button,Touchable, Pressable } from 'react-native';
import NoteContext from './context/noteContext';
import Animated,{useAnimatedStyle,useSharedValue,withDelay,withRepeat,withSequence,withTiming,Easing, withSpring} from "react-native-reanimated"
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

  const AnimatedTouchable=Animated.createAnimatedComponent(Pressable)
  const Animatedicon=Animated.createAnimatedComponent(AntDesign)
  const offset = useSharedValue(1);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateX: offset.value * 255 }],
  //   };
  // });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //     translateX: withRepeat(withSequence(withTiming(-160, { duration: 0 }), withDelay(100, withTiming(350, { duration: 3000 })), withTiming(-160, { duration: 1000, easing: Easing.inOut })), -1),
        // },
        // {
        //   scale: withSequence(withTiming(1,{duration:1000}),withTiming(1.5, { duration: 1000, easing: Easing.inOut }),withTiming(1,{duration:1000}))
        // }
        {
        // scale: withTiming(offset.value,{duration:5000})
        scale: withSpring(offset.value,{mass:30,stiffness:300})
    }]
  }

}, [like])


  return (
    // <View style={{display:"flex",alignItems:"center"}}>
    <Animated.View style={[{marginLeft:"auto",marginRight:"auto"}]}>
    <Card mode="elevated"  elevation={2} style={{minWidth:"97%", maxWidth:"97%", marginTop:10 }}>
    <Card.Title title={props.name} titleStyle={{lineHeight:24,paddingTop:6}} subtitleStyle={{paddingBottom:6}} subtitle={result} left={LeftContent} />
    <Card.Content>
      <Title >{props.heading}</Title>
      <Paragraph >{props.caption}</Paragraph>
    </Card.Content>
    <Image style={{maxHeight: 200, minHeight: 200,resizeMode:"cover"}} source={{ uri: props.image }} />
    <Card.Actions onPress={()=>{console.log("card presse")}}>
      {/* <Button>Cancel</Button>
      <Button>Ok</Button> */}
      <AnimatedTouchable style={animatedStyle} onPress={()=>{ offset.value===1.5?offset.value=1:offset.value=1.5 ; if(like==true){props.ondislike(props.id);setnum(props.likes.length--);
        setLike(false)
       }else{
          props.onlike(props.id);
          setLike(true)
          setnum(props.likes.length++)
        }}}>
             <Animatedicon style={like==true? animatedStyle:{}} name={like==true?"like1":"like2"} size={26} color={theme.colors.primary}></Animatedicon> 
         

    
     
      </AnimatedTouchable>
      
      <Text>{props.displayLikes? props.displayLikes :props.likes.length}</Text>
    </Card.Actions>
  </Card>
  </Animated.View>
  )
}

export default Cards