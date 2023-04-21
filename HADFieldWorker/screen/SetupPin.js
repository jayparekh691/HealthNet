import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native";
import CustomButton from "../components/CustomButton";
import PinTextBox from "../components/PinTextBox";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";
import { log, set } from "react-native-reanimated";
import Util, { getValueFor, save, stringFromObject } from "../utils/util";
import { SecureStoreContext } from "../contexts/SecureStoreContext";
import { Ionicons } from "@expo/vector-icons";
import PinInputField from "../components/PinInputField";
import { LoadingContext } from "../contexts/LoadingContext";

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

  const [isSecureSecond, setIsSecureSecond] = useState(true);

  const { pinState } = useContext(SecureStoreContext);
  const { isLoginLoadingState } = useContext(LoadingContext);
  const [isLoginLoading, setIsLoginLoading] = isLoginLoadingState;
  const [pin, setPin] = pinState;

  useEffect(() => {
    setIsLoginLoading(false);
  }, []);

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

  const setup = async (pin) => {
    // store pin
    await save("pin", pin);
    // update pin state in SecureStoreContext
    setPin(pin);
  };

  const onContinue = async () => {
    const first = stringFromObject(firstPin).toString().trim();
    const second = stringFromObject(secondPin).toString().trim();
    if (first.length === 4 && second.length === 4 && first === second) {
      await setup(first);
    } else {
      Alert.alert("Pins not matching!");
    }
  };

  const toggleSecureSecond = () => {
    setIsSecureSecond((pv) => !pv);
  };

  if (isLoginLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={COLOR.primaryColor} />
      </View>
    );
  }

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
          <View style={{ marginBottom: width / 16 }}>
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
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <PinInputField
                pin={firstPin}
                onPinChange={onFirstPinCodeChange}
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
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <PinInputField
                shouldFocus={false}
                pin={secondPin}
                onPinChange={onSecondPinCodeChange}
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
        <View
          style={{
            flex: 1,
          }}
        >
          <CustomButton
            backgroundColor={COLOR.primaryColor}
            textColor="white"
            title="CONTINUE"
            style={{
              elevation: 0,
              shadowColor: "#000000",
              shadowOffset: { width: 4, height: 4 },
              margin: 0,
              paddingVertical: 4,
            }}
            onPress={onContinue}
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
