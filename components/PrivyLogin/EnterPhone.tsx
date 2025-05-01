import React from 'react';
import {EnterDialog} from "@/components/PrivyLogin/EnterDialog";

type Props = {
  onPhone: (email: string) => void;
  onCancel: () => void;
};

export function EnterPhone(props: Props) {
  const { onCancel, onPhone } = props;

  return (
    <EnterDialog onEnter={onPhone}
                 onCancel={onCancel}
                 placeholder="Phone Number"
                 inputMode="tel"
                 label="Send Code"/>
  );
}
