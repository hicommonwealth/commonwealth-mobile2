import {useEffect} from "react";
import {IPrivyAuthStatus, usePrivyAuthStatus} from "@/hooks/usePrivyAuthStatus";

/**
 * The broadcaster sends the actual status to the webapp via the react-native bridge.
 */
type Broadcaster = (status: IPrivyAuthStatus) => void

/**
 * This broadcasts the privy status to the webapp...
 */
export function usePrivyAuthStatusBroadcaster(broadcaster: Broadcaster | undefined) {

  const status = usePrivyAuthStatus()

  useEffect(() => {

    if (broadcaster) {
      broadcaster(status)
    }

  }, [status, broadcaster])

}
