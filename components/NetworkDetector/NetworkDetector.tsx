import React, {useEffect, useState} from "react";
import NetInfo from '@react-native-community/netinfo';
import Online from "@/components/Online/Online";
import Offline from "@/components/Offline/Offline";
import SafeAreaContainer from "@/components/SafeAreaContainer/SafeAreaContainer";

/**
 * Detect the net status and switch back and forth between online and offline
 */
export default function NetworkDetector() {
  const [connection, setConnection] = useState<'online' | 'offline' | null>(null);

  useEffect(() => {
    return NetInfo.addEventListener(state => {
      state.isConnected ? setConnection('online') : setConnection('offline')
    });
  }, []);

  if (connection === null) {
    return null;
  }

  // TODO we might consider doing a display: none on both of these so that
  // they don't unmount.  If we unmount the Online component then the scroll
  // position and pending content might be lost.
  //
  // The problem with this strategy is that I can't mount the Online component
  // until we've actually been online at LEAST once so I'll have to add some
  // extra logic for this.  Shouldn't be too hard though we would just add
  // hasBeenOnline which gets set to true once we have the first isConnected
  // event.  After that we mount online and display it for the first time.

  return (
    <SafeAreaContainer>
      <>
        {connection === 'online' && <Online/>}
        {connection === 'offline' && <Offline/>}
      </>
    </SafeAreaContainer>
  )

}
