import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import PinTextBox from "../components/PinTextBox";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";
import { getValueFor, removeItem, stringFromObject } from "../utils/Util";
import { TouchableOpacity } from "react-native";
import PinInputField from "../components/PinInputField";
import { LoadingContext } from "../contexts/LoadingContext";

const { width, height } = Dimensions.get("screen");

function LockScreen() {
  const navigation = useNavigation();

  const { isDashboardLoadingState } = useContext(LoadingContext);
  const [isDashboardLoading, setIsDashboardLoading] = isDashboardLoadingState;

  const [pin, setPin] = useState({
    pinOne: "",
    pinTwo: "",
    pinThree: "",
    pinFour: "",
  });
  const onPinChange = (name, text) => {
    if (name === "pinOne") {
      setPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinTwo") {
      setPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinThree") {
      setPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinFour") {
      setPin((pv) => {
        return { ...pv, [name]: text };
      });
    }
  };

  const onContinue = async () => {
    setIsDashboardLoading(true);
    const lockPin = await getValueFor("pin");
    console.log("lockscreen", lockPin);
    if (stringFromObject(pin) === lockPin) {
      navigation.navigate("drawerNavigator");
    } else {
      Alert.alert("Incorrect Pin!");
    }
  };

  if (isDashboardLoading) {
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
                alignItems: "center",
              }}
            >
              <PinInputField pin={pin} onPinChange={onPinChange} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => {
            console.log("Clearing all keys");
            (async () => {
              await removeItem("pin");
              await removeItem("user");
            })();
          }}
        >
          <Text
            style={{
              fontSize: width / 30,
              color: COLOR.primaryColor,
              fontWeight: 400,
            }}
          >
            forgot passcode?
          </Text>
        </TouchableOpacity>
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
              elevation: 8,
              shadowColor: "#000000",
              shadowOffset: { width: 4, height: 4 },
              paddingVertical: 4,
            }}
            onPress={onContinue}
          />
        </View>
      </View>
    </View>
  );
}

export default LockScreen;
