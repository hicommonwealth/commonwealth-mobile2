import {Dimensions, View} from "react-native"
import React, {useRef, useState} from "react";
import {Debug} from "./Debug";

type ModeType = 'debug' | 'default'

type TouchStartGesture = {
  start: number;
  startY: 0;
}

type Props = {
  children: React.ReactNode
}

export const DebugGestureView = (props: Props) => {
  const [mode, setMode] = useState<ModeType>('default');

  const touchStart = useRef<TouchStartGesture>({start: 0, startY: 0});

  const handleTouchStart = (event: any) => {
    touchStart.current = {
      start: Date.now(),
      startY: event.nativeEvent.pageY}
    ;
  };

  // Touch End
  const handleTouchEnd = (event: any) => {
    const touchEndY = event.nativeEvent.pageY;
    const swipeDistance = touchStart.current.startY - touchEndY;
    const duration = Math.abs(touchStart.current.start - Date.now());

    const { height } = Dimensions.get("window");

    if (swipeDistance > (height * 0.85)) {

      if (duration > 3000) {
        console.log("Got about page gesture... loading about page.")
        setMode('debug');
      } else {
        console.log("too soon: " + duration)
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      {mode === 'debug' && (
        <>
          <Debug onClose={() => setMode('default')}/>
        </>
      )}

      {mode === 'default' && (
        <>
          {props.children}
        </>
      )}
    </View>
  )
}
