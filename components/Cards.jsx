import React,{useState,useEffect,useContext,memo} from 'react'
import { Avatar, Card, Title, Paragraph ,useTheme, Text} from 'react-native-paper';
import { Image,  TouchableWithoutFeedback,View,Button,Touchable, Pressable } from 'react-native';
import NoteContext from './context/noteContext';
import Animated,{useAnimatedStyle,useSharedValue,withDelay,withRepeat,withSequence,withTiming,Easing, withSpring} from "react-native-reanimated"
import { AntDesign } from '@expo/vector-icons';

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
        //scale: withSpring(offset.value,{mass:30,stiffness:300})
         scale:withSequence(withTiming(offset.value,{duration:500}),withTiming(1,{duration:500}) )
      }
  ]
  }

}, [like])

const onAnimation = () => {
  offset.value = withSpring(1.5,{mass:30,stiffness:300})
}
  return (
    // <View style={{display:"flex",alignItems:"center"}}>
    <Animated.View style={[{marginLeft:"auto",marginRight:"auto"}]}>
    <Card mode="elevated"  elevation={2} style={{minWidth:"97%", maxWidth:"97%", marginTop:10 }}>
    <Card.Title title={props.name} titleStyle={{lineHeight:24,paddingTop:6}} subtitleStyle={{paddingBottom:6}} subtitle={result} left={(pops)=>{ return(<Avatar.Image {...pops} size={46} source={{uri:props.imgAvatar}}/>)}} />
    <Card.Content>
      <Title >{props.heading}</Title>
      <Paragraph >{props.caption}</Paragraph>
    </Card.Content>
    {props.image? <Image style={{maxHeight: 200, minHeight: 200,resizeMode:"cover"}} source={{ uri: props.image }} />
      : null}
    <Card.Actions onPress={()=>{console.log("card presse")}}>
      {/* <Button>Cancel</Button>
      <Button>Ok</Button> */}
      <AnimatedTouchable style={animatedStyle} onPress={()=>{ 
        onAnimation();
        //offset.value===1.5?offset.value=1:offset.value=1.5 ;
       if(like==true){
        //offset.value=1;
        props.ondislike(props.id);setnum(props.likes.length--);
        setLike(false)
       }else{
         // offset.value=1.5;
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

export default  memo(Cards)