import React, {useEffect, useState} from "react";
import NetInfo from '@react-native-community/netinfo';
import Online from "@/app/Online";
import {SafeAreaView, Text} from "react-native";
import Offline from "@/app/Offline";

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

  // SafeAreaView style={styles.container}
  // when we enable SafeAreaView it takes up some vertical space at the bottom
  // of the screen for some reason.

  return (
    <>
      {connection === 'online' && <Online/>}
      {connection === 'offline' && <Offline/>}
    </>
  )

}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
  },
}
