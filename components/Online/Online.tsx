import React from "react";
import Webapp from "@/components/Webapp/Webapp";
import {DefaultPrivyProvider} from "@/components/DefaultPrivyProvider/DefaultPrivyProvider";

export default function Online() {

  // true if we are in the auth stage... at which we unmount the webview and
  // re-mount the main view.

  return (
    <DefaultPrivyProvider>
      <Webapp/>
    </DefaultPrivyProvider>
  )
}
