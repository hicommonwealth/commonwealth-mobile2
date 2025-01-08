import React, {useState} from "react";
import PickAuthStrategy, {AuthStrategy} from "@/components/Login/PickAuthStrategy";
import SMSLogin from "@/components/Login/SMSLogin";

export default function Login() {

  const [strategy, setStrategy] = useState<AuthStrategy | undefined>(undefined)

  console.log('FIXME: strategy', strategy)

  return (
    <>
      {! strategy && <PickAuthStrategy onStrategyPicked={setStrategy}/>}
      { strategy === 'SMS' && <SMSLogin onCancel={() => setStrategy(undefined)}/>}
    </>
  );
}
