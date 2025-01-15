import React, {memo} from "react";
import Webapp from "@/components/Webapp/Webapp";

export default memo(function Online() {

  // true if we are in the auth stage... at which we unmount the webview and
  // re-mount the main view.

  return (
    <>
      <Webapp/>
    </>
  )
})
