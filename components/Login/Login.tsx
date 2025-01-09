import React, {useState} from "react";
import PickAuthStrategy, {AuthStrategy} from "@/components/Login/PickAuthStrategy";
import SMSLogin from "@/components/Login/SMSLogin";

type Props = {
  onCancel: () => void;
}

export default function Login(props: Props) {

  const [strategy, setStrategy] = useState<AuthStrategy | undefined>(undefined)

  console.log('FIXME: strategy', strategy)

  // FIXME put a button to cancel at the bottom
  return (
    <>
      {! strategy && <PickAuthStrategy onStrategyPicked={setStrategy}/>}
      { strategy === 'SMS' && <SMSLogin onCancel={() => setStrategy(undefined)}/>}
    </>
  );
}
