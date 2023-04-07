import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";

const { width, height } = Dimensions.get("screen");

function LoginScreen() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onInputChange = (name, text) => {
    if (name === "login") {
      setLoginId(text);
    } else if (name === "password") {
      setPassword(text);
    }
  };

  const handleSignIn = () => {
    // login api call
    // navigation.navigate("setuppin");
  };
  return (
    <View style={styles.screen}>
      <View
        style={{
          width: width / 2,
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          <TextInput
            value={loginId}
            selectionColor={COLOR.secondaryColor}
            style={styles.textinput}
            keyboardType="default"
            placeholder="USERNAME"
            placeholderTextColor={COLOR.secondaryColor}
            onChangeText={(text) => onInputChange("login", text)}
          />
        </View>
        <View>
          <TextInput
            value={password}
            style={styles.textinput}
            secureTextEntry={true}
            keyboardType="default"
            placeholder="PASSWORD"
            placeholderTextColor={COLOR.secondaryColor}
            onChangeText={(text) => onInputChange("password", text)}
          />
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View>
            <CustomButton
              backgroundColor={COLOR.primaryColor}
              textColor="white"
              title="LOGIN"
              onPress={handleSignIn}
              style={{
                elevation: 10,
                shadowColor: "#000000",
                shadowOffset: { width: 4, height: 4 },
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: Styles.screen,
  textinput: {
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

export default LoginScreen;
