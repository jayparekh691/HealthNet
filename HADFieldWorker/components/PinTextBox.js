import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { COLOR } from "../utils/Color";

const { width } = Dimensions.get("screen");

function PinTextBox({ name, value, onChangeText }) {
  const pinChange = (name, text) => {
    onChangeText(name, text);
  };
  return (
    <View
      style={{
        width: width / 10,
      }}
    >
      <TextInput
        style={styles.textinput}
        value={value}
        textAlign="center"
        keyboardType="numeric"
        returnKeyType="done"
        maxLength={1}
        selectionColor={COLOR.secondaryColor}
        placeholderTextColor={COLOR.secondaryColor}
        onChangeText={(text) => {
          pinChange(name, text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    fontSize: width / 16,
    color: COLOR.secondaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 10 },
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "white",
  },
});

export default PinTextBox;
