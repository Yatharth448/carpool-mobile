import React from 'react'
import RootNav from './src/components/navigator/rootNav'
import { SetupKeyboard } from './src/components/commonfunction/CommonFunctions'
// import FlashMessage from "react-native-flash-message";

export default function App() {

  return (
    <>
    <SetupKeyboard/>
    <RootNav/>
    {/* <FlashMessage position="top" /> */}
    </>
  )
}
