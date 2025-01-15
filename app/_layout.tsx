import React, {memo} from 'react'
import {Slot} from "expo-router";

export default memo(function RootLayout() {
  return (
    <>
      <Slot />
      {/*<StatusBar style="auto" />*/}
    </>
  )

})
