import React from "react";
import Webapp from "@/components/Webapp/Webapp";
import Login from "@/components/Login/Login";
import {AuthRequested} from "@/hooks/AuthRequested";

export default function Online() {

  // true if we are in the auth stage... at which we unmount the webview and
  // re-mount the main view.
  const [authStarted, setAuthStarted] = React.useState(true)
  const [authRequested, setAuthRequested] = React.useState<AuthRequested | undefined>(undefined)

  // FIXME: Login needs to call back with onAuthRequested

  function handleAuthRequested(authRequested: AuthRequested) {
    console.log('FIXME login: handleAuthRequested', authRequested)
    setAuthStarted(false)
    setAuthRequested(authRequested)
  }

  return (
    <>
      {! authStarted && <Webapp onAuthStarted={() => setAuthStarted(true)}
                         authRequested={authRequested}/>}

      {authStarted && <Login onCancel={() => setAuthStarted(false)} onAuthRequested={handleAuthRequested}/>}

    </>
  )
}
