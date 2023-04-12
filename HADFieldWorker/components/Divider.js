import React from "react";
import { View } from "react-native";
import { COLOR } from "../utils/Color";

function Divider(props) {
  return (
    <View
      style={{
        marginHorizontal: 32,
        height: 1,
        backgroundColor: COLOR.divider,
      }}
    />
  );
}

export default Divider;
