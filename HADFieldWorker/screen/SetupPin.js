import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";
import CustomButton from "../components/CustomButton";
import PinTextBox from "../components/PinTextBox";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";

const { width, height } = Dimensions.get("screen");

function SetupPin() {
  const [firstPin, setFirstPin] = useState({
    pinOne: "",
    pinTwo: "",
    pinThree: "",
    pinFour: "",
  });

  const [secondPin, setSecondPin] = useState({
    pinOne: "",
    pinTwo: "",
    pinThree: "",
    pinFour: "",
  });

  useEffect(() => {
    console.log(firstPin, secondPin);
  }, [firstPin, secondPin]);

  const onFirstPinCodeChange = (name, text) => {
    if (name === "pinOne") {
      setFirstPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinTwo") {
      setFirstPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinThree") {
      setFirstPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinFour") {
      setFirstPin((pv) => {
        return { ...pv, [name]: text };
      });
    }
  };

  const onSecondPinCodeChange = (name, text) => {
    if (name === "pinOne") {
      setSecondPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinTwo") {
      setSecondPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinThree") {
      setSecondPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinFour") {
      setSecondPin((pv) => {
        return { ...pv, [name]: text };
      });
    }
  };

  const onSubmit = () => {};

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
            marginTop: height / 40,
            marginBottom: width / 10,
          }}
        >
          <View
            style={{
              marginBottom: width / 15,
            }}
          >
            <Text
              style={{
                fontSize: width / 20,
                fontWeight: "300",
              }}
            >
              Setting up {"\n"}
              <Text
                style={{
                  fontSize: width / 16,
                  fontWeight: "800",
                }}
              >
                Your PIN code
              </Text>
            </Text>
          </View>
          <View>
            <Text>
              To setup your{" "}
              <Text
                style={{
                  fontSize: width / 20,
                  fontWeight: "500",
                }}
              >
                PIN
              </Text>{" "}
              create{" "}
              <Text
                style={{
                  fontSize: width / 20,
                  fontWeight: "500",
                }}
              >
                4 digit code
              </Text>
              {"\n"}
              then confirm it below
            </Text>
          </View>
        </View>
        <View>
          <View style={{ marginBottom: height / 30 }}>
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
                value={firstPin.pinOne}
                onChangeText={onFirstPinCodeChange}
              />
              <PinTextBox
                name="pinTwo"
                value={firstPin.pinTwo}
                onChangeText={onFirstPinCodeChange}
              />
              <PinTextBox
                name="pinThree"
                value={firstPin.pinThree}
                onChangeText={onFirstPinCodeChange}
              />
              <PinTextBox
                name="pinFour"
                value={firstPin.pinFour}
                onChangeText={onFirstPinCodeChange}
              />
            </View>
          </View>
          <View>
            <View style={{ marginBottom: width / 30 }}>
              <Text
                style={{
                  fontSize: width / 30,
                  fontWeight: "400",
                }}
              >
                CONFIRM YOUR PIN CODE
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
                value={secondPin.pinOne}
                onChangeText={onSecondPinCodeChange}
              />
              <PinTextBox
                name="pinTwo"
                value={secondPin.pinTwo}
                onChangeText={onSecondPinCodeChange}
              />
              <PinTextBox
                name="pinThree"
                value={secondPin.pinThree}
                onChangeText={onSecondPinCodeChange}
              />
              <PinTextBox
                name="pinFour"
                value={secondPin.pinFour}
                onChangeText={onSecondPinCodeChange}
              />
            </View>
          </View>
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
const styles = StyleSheet.create({
  textinput: {
    fontSize: width / 16,
    color: COLOR.secondaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#010101",
    shadowOffset: { width: 10, height: 10 },
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "white",
  },
});

export default SetupPin;
