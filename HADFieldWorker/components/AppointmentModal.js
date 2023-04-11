import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLOR } from "../utils/Color";
import CustomButton from "./CustomButton";
import DetailField from "./DetailField";
import ContactCard from "./ContactCard";
import { makeCall, markVisited } from "../services/dashboardServices";
import PinTextBox from "./PinTextBox";
import { log } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import PinInputField from "./PinInputField";

function AppointmentModal({ visible, onModalClose, data }) {
  const navigation = useNavigation();
  const [isOTPScreenActive, setIsOTPScreenActive] = useState(false);

  const [pin, setPin] = useState({
    pinOne: "",
    pinTwo: "",
    pinThree: "",
    pinFour: "",
  });

  const clearPin = () => {
    setPin({
      pinOne: "",
      pinTwo: "",
      pinThree: "",
      pinFour: "",
    });
  };

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

  const onShowOTP = () => {
    setIsOTPScreenActive(true);
  };

  const onClose = () => {
    clearPin();
    setIsOTPScreenActive(false);
    onModalClose();
  };

  const authenticateOTP = () => {
    let otp = Object.values(pin).reduce((v, ans) => {
      return v + ans;
    }, "");
    console.log(otp, data?.otp);
    if (otp === data?.otp) {
      navigation.navigate("medicalData", data);
    } else {
      Alert.alert("Incorrect pin entered!");
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOTPScreenActive(false);
          onModalClose();
          clearPin();
        }}
      >
        <View style={{ flex: 1 }}></View>
      </TouchableWithoutFeedback>
      <View
        style={{
          justifyContent: "center",
          backgroundColor: COLOR.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 12,
          overflow: "hidden",
          elevation: 10,
          shadowColor: "#000000",
          shadowOffset: { width: -4, height: -4 },
        }}
      >
        {isOTPScreenActive ? (
          <View>
            <View
              style={{
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  alignItems: "stretch",
                }}
              >
                <View
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "600",
                    }}
                  >
                    Enter OTP
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 16, letterSpacing: 0.5 }}>
                    An{" "}
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "400",
                      }}
                    >
                      4 digit PIN code{" "}
                    </Text>
                    has been sent to
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                  >
                    {data?.mobilenumber}
                  </Text>
                </View>
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <PinInputField pin={pin} onPinChange={onPinChange} />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <CustomButton
                  backgroundColor={COLOR.secondaryColor}
                  textColor={COLOR.backgroundColor}
                  title="Cancel"
                  onPress={() => {
                    onClose();
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <CustomButton
                  backgroundColor={COLOR.primaryColor}
                  textColor={COLOR.backgroundColor}
                  title="Submit"
                  onPress={() => {
                    onClose();
                    authenticateOTP();
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  alignItems: "stretch",
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      color: COLOR.darkGray,
                      fontWeight: "400",
                      fontSize: 24,
                      alignSelf: "flex-end",
                    }}
                  >
                    Patient Details
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      makeCall(data?.mobilenumber.substring(4));
                    }}
                  >
                    <View>
                      <ContactCard
                        contactNumber={data?.mobilenumber.substring(4)}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={{
                    marginBottom: 8,
                  }}
                >
                  <DetailField title={"name"} info={data?.name} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      flex: 4,
                      paddingRight: 4,
                    }}
                  >
                    <DetailField
                      title={"town"}
                      info={data?.town}
                      style={{ alignItems: "stretch" }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 5,
                      paddingLeft: 4,
                    }}
                  >
                    <DetailField
                      title={"city"}
                      info={data?.city}
                      style={{ alignItems: "stretch" }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      paddingRight: 4,
                    }}
                  >
                    <DetailField
                      title={"state"}
                      info={data?.state}
                      style={{ alignItems: "stretch" }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 4,
                    }}
                  >
                    <DetailField
                      title={"pincode"}
                      info={data?.pincode}
                      style={{ alignItems: "stretch" }}
                    />
                  </View>
                </View>
                <View>
                  <DetailField
                    title={"address"}
                    info={data?.address}
                    style={{
                      alignItems: "stretch",
                    }}
                  />
                </View>
              </View>
            </View>

            <View>
              <CustomButton
                backgroundColor={COLOR.primaryColor}
                textColor={COLOR.backgroundColor}
                title="Continue"
                onPress={onShowOTP}
              />
            </View>
          </View>
        )}
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOTPScreenActive(false);
          onModalClose();
          clearPin();
        }}
      >
        <View style={{ flex: 0 }}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default AppointmentModal;
