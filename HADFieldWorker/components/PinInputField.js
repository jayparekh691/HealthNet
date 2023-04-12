import React, { useEffect, useRef, useState } from "react";
import { DeviceEventEmitter, Dimensions, View } from "react-native";
import PinTextBox from "./PinTextBox";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "../utils/Color";
import { log } from "react-native-reanimated";

const { width } = Dimensions.get("screen");

function PinInputField({ pin, onPinChange }) {
  const [isSecure, setIsSecure] = useState(true);
  const [pinNo, setPinNo] = useState(0);
  const inputRef = useRef([]);

  const toggleIsSecure = () => {
    setIsSecure((pv) => !pv);
  };
  const handleKeyPress = (e) => {
    const value = e.nativeEvent.key;
    if (value === "Backspace") {
      if (pinNo !== 0) {
        inputRef.current[pinNo - 1]?.focus();
        return setPinNo((pv) => pv - 1);
      }
    } else {
      if (pinNo !== 3) {
        inputRef.current[pinNo + 1]?.focus();
        return setPinNo((pv) => pv + 1);
      }
    }
  };

  return (
    <>
      <PinTextBox
        inputRef={(r) => {
          inputRef.current[0] = r;
        }}
        autoFocus={pinNo === 0}
        onKeyPress={handleKeyPress}
        name="pinOne"
        value={pin.pinOne}
        isSecure={isSecure}
        onChangeText={onPinChange}
      />
      <PinTextBox
        inputRef={(r) => {
          inputRef.current[1] = r;
        }}
        autoFocus={pinNo === 1}
        name="pinTwo"
        onKeyPress={handleKeyPress}
        value={pin.pinTwo}
        isSecure={isSecure}
        onChangeText={onPinChange}
      />
      <PinTextBox
        inputRef={(r) => {
          inputRef.current[2] = r;
        }}
        autoFocus={pinNo === 2}
        name="pinThree"
        onKeyPress={handleKeyPress}
        value={pin.pinThree}
        isSecure={isSecure}
        onChangeText={onPinChange}
      />
      <PinTextBox
        inputRef={(r) => {
          inputRef.current[3] = r;
        }}
        autoFocus={pinNo === 3}
        name="pinFour"
        onKeyPress={handleKeyPress}
        value={pin.pinFour}
        isSecure={isSecure}
        onChangeText={onPinChange}
      />
      <Ionicons
        style={{ padding: 8 }}
        name={isSecure ? "eye-off" : "eye"}
        size={width / 20}
        color={COLOR.gray}
        onPress={() => {
          toggleIsSecure();
        }}
      />
    </>
  );
}

export default PinInputField;
