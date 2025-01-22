import React, {useState} from "react";
import PickAuthStrategy, {AuthStrategy} from "@/components/Login/PickAuthStrategy";
import SMSLogin from "@/components/Login/SMSLogin";
import {AuthRequested} from "@/hooks/AuthRequested";

type Props = {
  onCancel: () => void;
  onAuthRequested: (authRequested: AuthRequested) => void;
}

export default function Login(props: Props) {

  const [strategy, setStrategy] = useState<AuthStrategy | undefined>(undefined)
  return (
    <>
      {! strategy && <PickAuthStrategy onStrategyPicked={setStrategy}/>}
      { strategy === 'SMS' && <SMSLogin onCancel={() => setStrategy(undefined)}
                                        onAuthRequested={props.onAuthRequested}/>}
    </>
  );
}
