import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import PinTextBox from "../components/PinTextBox";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";
import { getValueFor, removeItem, stringFromObject } from "../utils/util";
import { TouchableOpacity } from "react-native";
import PinInputField from "../components/PinInputField";
import { LoadingContext } from "../contexts/LoadingContext";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import { SecureStoreContext } from "../contexts/SecureStoreContext";
import {
  getMedicalDataFromTable,
  removeRecordFromMedicalDataTable,
} from "../services/databaseServices";
import { sendMedicalData } from "../services/syncServices";
import { uploadImageToFirebase } from "./Dashboard";

const { width, height } = Dimensions.get("screen");

function Loading() {
  return (
    <ActivityIndicator
      style={{
        flex: 1,
      }}
      size={"large"}
      color={COLOR.primaryColor}
    />
  );
}

function LockScreen() {
  const navigation = useNavigation();

  const { isDashboardLoadingState } = useContext(LoadingContext);
  const [isDashboardLoading, setIsDashboardLoading] = isDashboardLoadingState;

  const { isConnectedState } = useContext(ConnectivityContext);
  const [isConnected] = isConnectedState;

  const { pinState } = useContext(SecureStoreContext);
  const [pin, setPin] = pinState;

  const isFocused = useIsFocused();

  const [lockPin, setLockPin] = useState({
    pinOne: "",
    pinTwo: "",
    pinThree: "",
    pinFour: "",
  });

  const cleanData = () => {
    console.log("Clearing all keys");
    (async () => {
      await removeItem("pin");
      await removeItem("user");
      await removeItem("token");
      setPin(null);
    })();
  };

  const loadMedicalData = async (medicalData) => {
    if (medicalData.length === 0) {
      console.log("no medical data");
      console.log("all medical has been synced!");
      cleanData();
      setIsDashboardLoading(false);
      return;
    }

    setIsDashboardLoading(true);

    const Promises = new Array();
    medicalData.forEach((data) => {
      Promises.push(
        new Promise((resolve, reject) => {
          if (data.photo === null) {
            sendMedicalData(data)
              .then((response) => {
                resolve(response.data);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            uploadImageToFirebase(data.photo, data.v_id).then(
              async (imageUrl) => {
                data["photo"] = imageUrl;
                sendMedicalData(data)
                  .then((response) => {
                    resolve(response.data);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              }
            );
          }
        })
      );
    });

    console.log("promises size", Promises.length);

    Promise.allSettled(Promises).then((value) => {
      console.log(value);
      const deleteIds = new Array();
      value.forEach((e) => {
        if (e.status === "fulfilled") {
          deleteIds.push(e.value);
        }
      });
      const DeletePromises = new Array();

      deleteIds.forEach((id) => {
        DeletePromises.push(
          new Promise((resolve, reject) => {
            removeRecordFromMedicalDataTable(id)
              .then(() => {
                resolve(`ID: ${id} done`);
              })
              .catch((error) => {
                reject(error);
              });
          })
        );
      });
      console.log(deleteIds);
      Promise.allSettled(DeletePromises).then(async (value) => {
        value.forEach((e) => {
          console.log(e.value, e.status);
        });
        getMedicalDataFromTable((medicalData) => {
          if (medicalData.length === 0) {
            console.log("all medical has been synced!");
            cleanData();
          }
        });
      });
    });
  };

  const onForgotPin = () => {
    if (isConnected) {
      Alert.alert(
        "Forgot Pin",
        "Are you sure want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: () => {
              console.log("logging out .... ");
              setIsDashboardLoading(true);
              // login
              // sync all the medical data to the internet
              getMedicalDataFromTable(loadMedicalData).catch((error) => {
                console.log("get medical data from table error: ", error);
                setIsDashboardLoading(false);
              });
              setIsDashboardLoading(false);
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      Alert.alert("No internet connection");
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLockPin(() => {
        return {
          pinOne: "",
          pinTwo: "",
          pinThree: "",
          pinFour: "",
        };
      });
    }
  }, [isFocused]);

  const onPinChange = (name, text) => {
    if (name === "pinOne") {
      setLockPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinTwo") {
      setLockPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinThree") {
      setLockPin((pv) => {
        return { ...pv, [name]: text };
      });
    } else if (name === "pinFour") {
      setLockPin((pv) => {
        return { ...pv, [name]: text };
      });
    }
  };

  const onContinue = async () => {
    setIsDashboardLoading(true);
    const securedPin = await getValueFor("pin");
    if (stringFromObject(lockPin) === securedPin) {
      console.log("lockscreen network", isConnected);
      navigation.navigate("drawerNavigator");
    } else {
      Alert.alert("Incorrect Pin!");
      setIsDashboardLoading(false);
    }
  };

  if (isDashboardLoading) {
    return Loading();
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
              <PinInputField pin={lockPin} onPinChange={onPinChange} />
            </View>
          </View>
        </View>
        <Pressable onPress={onForgotPin}>
          <Text
            style={{
              fontSize: width / 30,
              color: COLOR.primaryColor,
              fontWeight: 400,
            }}
          >
            forgot pin?
          </Text>
        </Pressable>
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
