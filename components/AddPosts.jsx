import React,{useContext,useState,useEffect} from 'react'
import { Button, TextInput,Text,useTheme,Card,Snackbar} from 'react-native-paper'
import {View,Platform,Image} from 'react-native'
import NoteContext from "./context/noteContext"
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios"
import { useValidation } from 'react-native-form-validator'
const AddPosts = () => {
  const theme=useTheme()
    const a = useContext(NoteContext)
    const [heading, setHeading] = useState("");
    const [caption, setCaption] = useState("");
    const [hasGalleryPermission, setHasGalleryPermission] =useState(null); 
    const [image, setImage] = useState(null);
    const [result, setResult] = useState();
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
  
    const onDismissSnackBar = () => setVisible(false);
    const { validate,  getErrorMessages ,isFormValid} =
    useValidation({
      state: { heading, caption},
    });
    
    useEffect (() => {
        (async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    if(hasGalleryPermission==false){
        return <Text>no permissions</Text>
    }
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
     let esult1 = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
         aspect: [4, 3],
        quality: 1,
      });
      setResult(esult1)
      console.log(result);
  
      if (!esult1.canceled) {
        setImage(esult1.assets[0].uri);
      }
    };
  

    const handleSubmit=()=>{
           
      validate({
        heading: {  maxlength: 20, required: true },
        caption: {   maxlength: 20, required: true },
        
      });
      console.log("after validate")
      if(isFormValid()===true){
        if (image) {
          
          let localUri = result.uri;
          // setPhotoShow(localUri);
          let filename = localUri.split('/').pop();
          
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          
          // let formData = new FormData();
          
          
          const formData= new FormData();
          formData.append("heading",heading)
          formData.append("caption",caption)
          formData.append("id",a.id)
          formData.append("creatername",a.creatername)
          // formData.append("image",image);
          formData.append('image', { uri: localUri, name: filename, type });
          Axios.post("https://nice-plum-panda-tam.cyclic.app/addStory",formData,{headers:{'content-type': 'multipart/form-data'}}).then((response)=>{
            console.log(response)
            setVisible(true)
            setHeading("")
            setCaption("")
            setImage(null)
            setResult(null)

          })
        }
        else{
          console.log("hello")
          alert("image is mandatory")
        }

      }
        
        }
          // const [user, setUser] = useState({
            //   heading:"",
            //   caption:"",
            //   _id:a.id,
            //   creatername:a.creatername,
            
            // });
            
            // const handleChange = (e) => {
              //     setUser((prev)=>({
                //       ...prev,
                //       [e.target.name]:e.target.value
    //     }))
    //   }
  return (
     <SafeAreaView>
    <View >
        <Card mode="elevated" elevation={1} style={{borderRadius:0,paddingBottom:10,height:"100%"}}>
        <Text  variant={"headlineSmall"} style={{color:theme.colors.primary,margin:10}} >{"Add Post"} </Text>
        <TextInput style={{margin:5}} label="Heading" value={heading} onChangeText={setHeading}></TextInput>
        <TextInput  style={{margin:5}} label="Caption" value={caption} onChangeText={setCaption}></TextInput>
       
        <Button style={{margin:5}} icon="camera" mode="contained" title="Pick an image from camera roll" onPress={pickImage} >Pick an image</Button>
      {image && <Image  source={{ uri: image }} style={{ width: "97%", height: 300 ,margin:5}} />}
      <Button style={{margin:5}} mode="contained" onPress={()=>handleSubmit()}>Add Post</Button>
      <Text style={{paddingLeft:4,color:theme.colors.error}}>{getErrorMessages()}</Text>
     
      </Card>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
            setVisible(false)
          },
        }}>
        Post Added!
      </Snackbar>

    </View>
     </SafeAreaView>
    
  )
}

export default AddPosts