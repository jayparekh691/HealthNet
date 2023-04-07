import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";
import { login } from "../services/loginServices";
import { save } from "../utils/util";
import { log } from "react-native-reanimated";
import { ConnectivityContext } from "../contexts/ConnectivityContext";

const { width, height } = Dimensions.get("screen");

function LoginScreen() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isConnected] = useContext(ConnectivityContext);
  const navigation = useNavigation();

  const onInputChange = (name, text) => {
    setLoginData((pv) => {
      return {
        ...pv,
        [name]: text,
      };
    });
  };

  const handleSignIn = async () => {
    // check internet connectivity
    if (isConnected) {
      const response = await login(loginData);
      if (response.data) {
        await save("user", JSON.stringify(response.data));
        navigation.replace("setuppin");
      } else {
        Alert.alert("Invalid Email or password");
      }
    } else {
      Alert.alert("Please check internet connection!");
    }
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
            value={loginData.email}
            selectionColor={COLOR.secondaryColor}
            style={styles.textinput}
            keyboardType="default"
            placeholder="USERNAME"
            placeholderTextColor={COLOR.secondaryColor}
            onChangeText={(text) => onInputChange("email", text)}
          />
        </View>
        <View>
          <TextInput
            value={loginData.password}
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
