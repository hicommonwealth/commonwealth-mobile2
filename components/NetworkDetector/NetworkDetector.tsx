import React, {useEffect, useState} from "react";
import NetInfo from '@react-native-community/netinfo';
import Online from "@/components/Online/Online";
import Offline from "@/components/Offline/Offline";

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

  return (
    <>
      {connection === 'online' && <Online/>}
      {connection === 'offline' && <Offline/>}
    </>
  )

}
