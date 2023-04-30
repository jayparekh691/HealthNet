import React, { useContext, useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import RecordsScreen from "../screen/RecordsScreen";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../utils/Color";
import Dashboard, { uploadImageToFirebase } from "../screen/Dashboard";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "react-native";
import CustomDrawerItem from "../components/CustomDrawerItem";
import Divider from "../components/Divider";
import { removeItem } from "../utils/util";
import { SecureStoreContext } from "../contexts/SecureStoreContext";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import {
  getMedicalDataFromTable,
  removeRecordFromMedicalDataTable,
} from "../services/databaseServices";
import { sendMedicalData } from "../services/syncServices";

const Drawer = createDrawerNavigator();
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

function DrawerNavigation(props) {
  // useEffect(() => {
  //   (async () => {
  //     await removeItem("pin");
  //     await removeItem("user");
  //     await removeItem("token");
  //     setPin(null);
  //   })();
  // }, []);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const { pinState } = useContext(SecureStoreContext);
  const [pin, setPin] = pinState;

  const { isConnectedState } = useContext(ConnectivityContext);
  const [isConnected] = isConnectedState;

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
      setDrawerLoading(false);
      return;
    }

    setDrawerLoading(true);

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

  const onLogout = (navigation) => {
    navigation.closeDrawer();

    if (isConnected) {
      Alert.alert(
        "LOGOUT",
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
              setDrawerLoading(true);

              // sync all the medical data to the internet
              getMedicalDataFromTable(loadMedicalData).catch((error) => {
                console.log("get medical data from table error: ", error);
                setDrawerLoading(false);
              });
              setDrawerLoading(false);
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
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <DrawerItemList {...props} />
            <View
              style={{
                height: height,
                justifyContent: "flex-end",
              }}
            >
              <Divider
                style={{
                  marginTop: 10,
                }}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  onLogout(props.navigation);
                }}
              >
                <View
                  style={{
                    marginBottom: 200,
                    backgroundColor: COLOR.primaryColorDark,
                    borderRadius: 4,
                    alignItems: "center",
                    margin: 12,
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 16,
                      color: COLOR.white,
                      fontWeight: "500",
                      fontSize: width / 28,
                    }}
                  >
                    LOGOUT
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </DrawerContentScrollView>
      )}
      screenOptions={({ navigation }) => ({
        headerLeft: () => {
          return (
            <Feather
              style={{
                marginLeft: 12,
              }}
              name="sidebar"
              color={COLOR.primaryColor}
              size={28}
              onPress={() => navigation.toggleDrawer()}
            />
          );
        },
        headerShown: !drawerLoading ? true : false,
        headerTintColor: COLOR.primaryColor,
        drawerActiveTintColor: COLOR.primaryColor,
        drawerActiveBackgroundColor: COLOR.backgroundColor,
      })}
    >
      <Drawer.Screen
        options={{
          headerTitle: "Appointments",
          title: "Dashboard",
        }}
        name="dashboard"
        component={drawerLoading ? Loading : Dashboard}
      />
      <Drawer.Screen
        options={{
          headerTitle: "Appoinment Records",
          title: "Records",
        }}
        name="recordScreen"
        component={drawerLoading ? Loading : RecordsScreen}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
