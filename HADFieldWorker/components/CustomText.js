import React from "react";
import { COLOR } from "../utils/Color";
import { Dimensions, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

function CustomText({
  value,
  placeholder,
  onChangeText,
  hasSecureEye = false,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <TextInput
        value={value}
        selectionColor={COLOR.secondaryColor}
        secureTextEntry={hasSecureEye}
        style={styles.textinput}
        placeholder={placeholder}
        placeholderTextColor={COLOR.secondaryColor}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    flex: 1,
    fontSize: width / 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "white",
  },
});

export default CustomText;
