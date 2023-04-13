import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { COLOR } from "../utils/Color";

const { width } = Dimensions.get("screen");

function PinTextBox({
  name,
  value,
  onChangeText,
  elevation = false,
  isSecure,
  autoFocus = false,
  onKeyPress,
  inputRef,
}) {
  const pinChange = (name, text) => {
    onChangeText(name, text);
  };

  const styles = StyleSheet.create({
    textinput: {
      fontSize: width / 16,
      color: COLOR.secondaryColor,
      paddingHorizontal: 10,
      paddingVertical: 10,
      elevation: elevation ? 20 : 0,
      shadowColor: "#0f0c0c",
      shadowOffset: { width: 10, height: 10 },
      borderRadius: 8,
      backgroundColor: COLOR.lightGray,
    },
  });

  return (
    <View
      style={{
        width: width / 10,
        marginRight: 8,
      }}
    >
      <TextInput
        style={styles.textinput}
        ref={(r) => {
          inputRef && inputRef(r);
        }}
        value={value}
        onKeyPress={onKeyPress}
        textAlign="center"
        keyboardType="number-pad"
        returnKeyType="done"
        autoFocus={autoFocus}
        secureTextEntry={isSecure}
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

export default PinTextBox;
