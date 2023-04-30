import React, { useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import { COLOR } from "../utils/Color";
import { forgotPassword } from "../services/loginServices";

const { width, height } = Dimensions.get("screen");

function ForgotPasswordComponent({ index, onPress, showUpdateComponent }) {
  const [email, setEmail] = useState(email);

  const onInputChange = (text) => {
    setEmail(text);
    console.log(email);
  };

  const handleEnterEmailForResetPassword = async () => {
    console.log(email);
    if (email === "") {
      Alert.alert("Please enter registered email id");
      return;
    }
    // call api to restore password on success go to reset password component
    const response = await forgotPassword(email);
    const data = response.data;
    console.log(data);
    if (data) {
      showUpdateComponent(data.e_id);
    } else if (data === "") {
      Alert.alert("Please enter registered email id");
    }
  };

  return (
    <View
      style={{
        maxWidth: 400,
        width: "60%",
      }}
    >
      <View>
        <CustomTextInput
          value={email}
          placeholder={"Email"}
          onChangeText={onInputChange}
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          width: "80%",
        }}
      >
        <View>
          <CustomButton
            backgroundColor={COLOR.primaryColor}
            textColor="white"
            title="RESET PASSWORD"
            onPress={handleEnterEmailForResetPassword}
            style={{
              elevation: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 4, height: 4 },
            }}
            textStyle={{
              fontSize: width / 28,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0}
        onPress={() => {
          onPress(index);
        }}
      >
        <View
          style={{
            marginTop: 16,
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              color: COLOR.primaryColorDark,
            }}
          >
            {" "}
            Back to Login
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ForgotPasswordComponent;
