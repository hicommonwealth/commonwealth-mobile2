import React from "react";
import Webapp from "@/components/Webapp/Webapp";
import Login from "@/components/Login/Login";
import {AuthRequested} from "@/hooks/AuthRequested";

export default function Online() {

  // true if we are in the auth stage... at which we unmount the webview and
  // re-mount the main view.
  const [authStarted, setAuthStarted] = React.useState(false)
  const [authRequested, setAuthRequested] = React.useState<AuthRequested | undefined>(undefined)

  // FIXME: Login needs to call back with onAuthRequested

  return (
    <>
      {! authStarted && <Webapp onAuthStarted={() => setAuthStarted(true)}
                         authRequested={authRequested}/>}

      {authStarted && <Login onCancel={() => setAuthStarted(false)}/>}

    </>
  )
}
