import React from 'react';
import {EnterDialog} from "@/components/PrivyLogin/EnterDialog";

type Props = {
  onEmail: (email: string) => void;
  onCancel: () => void;
};

export function EnterEmail(props: Props) {
  const { onCancel, onEmail } = props;

  return (
    <EnterDialog onEnter={onEmail}
                 onCancel={onCancel}
                 placeholder="Email"
                 inputMode="email"
                 label="Send Code"/>
  );
}
