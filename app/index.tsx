import {useEffect, useState} from "react";
import {Online} from "@/app/Online";
import {Offline} from "@/app/Offline";
import NetInfo from '@react-native-community/netinfo';

export default function Index() {
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
