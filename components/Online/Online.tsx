import React from "react";
import Webapp from "@/components/Webapp/Webapp";

export default function Online() {

  // true if we are in the auth stage... at which we unmount the webview and
  // re-mount the main view.

  // TODO: handle initialLink here ...

  return (
    <>
      <Webapp/>
    </>
  )
}
