import React from "react";
import { View } from "react-native";
import { COLOR } from "../utils/Color";

function Divider({ style }) {
  return (
    <View
      style={[
        {
          marginHorizontal: 32,
          height: 1,
          backgroundColor: COLOR.divider,
        },
        style,
      ]}
    />
  );
}

export default Divider;
