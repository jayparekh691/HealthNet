import React from "react";
import { Text, View } from "react-native";
import { COLOR } from "../utils/Color";

function DetailField({ title, info, style }) {
  return (
    <View
      style={[
        {
          alignItems: "flex-start",
        },
        style,
      ]}
    >
      <View
        style={{
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            color: COLOR.gray,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 8,
          padding: 12,
          minWidth: "16%",
          backgroundColor: COLOR.lightGray,
        }}
      >
        <Text
          numberOfLines={5}
          style={{
            fontWeight: "500",
            fontSize: 14,
            color: COLOR.darkGray,
            letterSpacing: 0.5,
          }}
        >
          {info}
        </Text>
      </View>
    </View>
  );
}

export default DetailField;
