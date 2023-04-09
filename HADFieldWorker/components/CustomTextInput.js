import React, { useState } from "react";
import { COLOR } from "../utils/Color";
import { Dimensions, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

function CustomTextInput({
  value,
  placeholder,
  onChangeText,
  hasSecureEye = false,
}) {
  const [isSecure, setIsSecure] = useState(hasSecureEye);

  const toggleSecure = () => {
    setIsSecure((pv) => !pv);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: COLOR.white,
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 4, height: 4 },
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <TextInput
        value={value}
        selectionColor={COLOR.secondaryColor}
        secureTextEntry={isSecure}
        style={styles.textinput}
        placeholder={placeholder}
        placeholderTextColor={COLOR.secondaryColor}
        onChangeText={onChangeText}
      />
      {hasSecureEye && (
        <Ionicons
          style={{
            marginLeft: 8,
          }}
          name="eye"
          size={width / 24}
          color={COLOR.gray}
          onPress={() => {
            toggleSecure();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    flex: 1,
    fontSize: width / 24,

    backgroundColor: COLOR.white,
  },
});

export default CustomTextInput;
