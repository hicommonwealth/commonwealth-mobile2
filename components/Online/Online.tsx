import React from "react";
import Webapp from "@/components/Webapp/Webapp";
type OnlineProps = {
  handleSafeAreaVisibility: (showSafeArea: boolean) => void;
};
export default function Online({ handleSafeAreaVisibility }: OnlineProps) {
  // true if we are in the auth stage... at which we unmount the webview and
  // re-mount the main view.

  return (
    <>
      <Webapp handleSafeAreaVisibility={handleSafeAreaVisibility} />
    </>
  );
}
