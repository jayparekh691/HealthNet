import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import PinTextBox from "../components/PinTextBox";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";

const { width, height } = Dimensions.get("screen");

function LockScreen() {
  const navigation = useNavigation();

  const [pin, setPin] = useState({
    pinOne: "",
    pinTwo: "",
    pinThree: "",
    pinFour: "",
  });
  const onPinChange = () => {};
  const onSubmit = () => {
    navigation.navigate("drawerNavigator");
  };
  return (
    <View
      style={[
        Styles.screen,
        {
          justifyContent: "space-between",
          alignItems: "stretch",
          padding: 20,
        },
      ]}
    >
      <View>
        <View
          style={{
            marginTop: height / 4,
            marginBottom: width / 10,
          }}
        >
          <View
            style={{
              marginBottom: width / 40,
            }}
          >
            <Text
              style={{
                fontSize: width / 16,
                fontWeight: "600",
              }}
            >
              Passcode
            </Text>
          </View>
          <View>
            <Text>
              Enter your create{" "}
              <Text
                style={{
                  fontSize: width / 20,
                  fontWeight: "500",
                }}
              >
                4 digit PIN code
              </Text>
            </Text>
          </View>
        </View>
        <View>
          <View style={{ marginBottom: height / 40 }}>
            <View style={{ marginBottom: width / 30 }}>
              <Text
                style={{
                  fontSize: width / 30,
                  fontWeight: "400",
                }}
              >
                PIN CODE
              </Text>
            </View>
            <View
              style={{
                width: width / 2,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <PinTextBox
                name="pinOne"
                value={pin.pinOne}
                onChangeText={onPinChange}
              />
              <PinTextBox
                name="pinTwo"
                value={pin.pinTwo}
                onChangeText={onPinChange}
              />
              <PinTextBox
                name="pinThree"
                value={pin.pinThree}
                onChangeText={onPinChange}
              />
              <PinTextBox
                name="pinFour"
                value={pin.pinFour}
                onChangeText={onPinChange}
              />
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: width / 30,
              color: COLOR.primaryColor,
              fontWeight: 400,
            }}
          >
            forgot passcode?
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: height / 40,
        }}
      >
        <View>
          <CustomButton
            backgroundColor={COLOR.primaryColor}
            textColor="white"
            title="CONTINUE"
            style={{
              elevation: 10,
              width: width / 3,
              shadowColor: "#000000",
              shadowOffset: { width: 4, height: 4 },
              paddingVertical: 4,
            }}
            onPress={onSubmit}
          />
        </View>
      </View>
    </View>
  );
}

export default LockScreen;
