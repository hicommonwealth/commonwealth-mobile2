import React, {useEffect, useState} from "react";
import Online from "@/app/Online";
import Offline from "@/app/Offline";
import NetInfo from '@react-native-community/netinfo';

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

  return (
    <>
      {connection === 'online' && <Online/>}
      {connection === 'offline' && <Offline/>}
    </>
  )

}
