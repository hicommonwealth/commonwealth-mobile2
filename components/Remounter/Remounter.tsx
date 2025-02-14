import React, {ReactNode, useState} from "react";
import {RemounterContext} from "@/components/Remounter/RemounterContext";

type Props = {
  children: ReactNode
}

/**
 * Allows us to totally remount the app so that I can swap out the config.
 */
export function Remounter(props: Props) {

  const [key, setKey] = useState(0);

  return (
    <RemounterContext.Provider value={() => setKey(key + 1)}>
      <React.Fragment key={key}>
        {props.children}
      </React.Fragment>
    </RemounterContext.Provider>
  )

}
