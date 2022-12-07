import React from 'react'
import NoteState from './components/context/noteState'
import Main from './Main'
// import { useFonts } from 'expo-font';
const App = () => {
  // const [fontsLoaded] = useFonts({
  //   'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
  //   // 'Inter-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  // });
  // if (!fontsLoaded) {
  //   return (
  //     null
  //   )
  // }
  // else {
  //wrap the APP in else


  return (
    <NoteState>
      <Main></Main>
    </NoteState>

  )
}


export default App