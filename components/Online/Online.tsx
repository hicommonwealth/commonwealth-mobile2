import React from "react";
import Webapp from "@/components/Webapp/Webapp";
import {AuthRequested} from "@/hooks/AuthRequested";

export default function Online() {

  // true if we are in the auth stage... at which we unmount the webview and
  // re-mount the main view.
  const [authStarted, setAuthStarted] = React.useState(true)
  const [authRequested, setAuthRequested] = React.useState<AuthRequested | undefined>(undefined)

  return (
    <>
      <Webapp onAuthStarted={() => setAuthStarted(true)}
              authRequested={authRequested}/>
    </>
  )
}
