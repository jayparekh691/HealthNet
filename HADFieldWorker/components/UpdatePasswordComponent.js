import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View } from "react-native";
import CustomTextInput from "./CustomTextInput";
import { COLOR } from "../utils/Color";
import CustomButton from "./CustomButton";
import { updatePassword } from "../services/loginServices";

function UpdatePasswordComponent({ e_id, onUpdate }) {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onInputChange = (name, text) => {
    console.log(data);
    setData((pv) => {
      return {
        ...pv,
        [name]: text,
      };
    });
  };

  const onUpdatePassword = async () => {
    console.log(data.newPassword, data.confirmPassword);
    if (data.newPassword !== data.confirmPassword) {
      Alert.alert("Passwords doesn't match!");
      return;
    }
    const response = await updatePassword(e_id, data);
    const responseData = response.data;
    console.log(responseData);
    if (responseData) {
      if (responseData === "Success") {
        Alert.alert("Password updated successfully!");
        onUpdate(0);
      } else {
        Alert.alert(responseData);
      }
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
          value={data.oldPassword}
          placeholder={"Old password"}
          onChangeText={(text) => onInputChange("oldPassword", text)}
        />
      </View>
      <View>
        <CustomTextInput
          value={data.newPassword}
          placeholder={"New password"}
          hasSecureEye={true}
          onChangeText={(text) => onInputChange("newPassword", text)}
        />
      </View>
      <View>
        <CustomTextInput
          value={data.confirmPassword}
          placeholder={"Confirm password"}
          hasSecureEye={true}
          onChangeText={(text) => onInputChange("confirmPassword", text)}
        />
      </View>

      <View
        style={{
          alignSelf: "center",
          width: "60%",
        }}
      >
        <View
          style={{
            marginTop: 24,
          }}
        >
          <CustomButton
            backgroundColor={COLOR.primaryColor}
            textColor="white"
            title="UPDATE"
            onPress={onUpdatePassword}
            style={{
              elevation: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 4, height: 4 },
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default UpdatePasswordComponent;
