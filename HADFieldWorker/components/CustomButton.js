import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

function CustomButton({
  textColor = "black",
  borderColor = null,
  backgroundColor = "transparent",
  title,
  onPress,
  style,
}) {
  const { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    text: {
      fontSize: width / 20,
      color: textColor,
      textAlign: "center",
      paddingHorizontal: width / 20,
      paddingVertical: width / 30,
    },
  });

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: backgroundColor,
          borderWidth: borderColor ? 1 : 0,
          margin: 10,
          borderRadius: 8,
          borderColor: borderColor,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
