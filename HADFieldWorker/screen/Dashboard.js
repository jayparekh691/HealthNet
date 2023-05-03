import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLOR } from "../utils/Color";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentModal from "../components/AppointmentModal";
import {
  getAppointmentFromTable,
  getMedicalDataFromTable,
  insertAppointments,
  removeAppointmentsWithPID,
  removeRecordFromMedicalDataTable,
} from "../services/databaseServices";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused, useRoute } from "@react-navigation/native";
import {
  getAppointmentList,
  removeVisitList,
  sendMedicalData,
} from "../services/syncServices";
import { LoadingContext } from "../contexts/LoadingContext";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
const { width } = Dimensions.get("screen");
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { getValueFor, updateSyncTime } from "../utils/util";
import { BackHandler } from "react-native";
import { SecureStoreContext } from "../contexts/SecureStoreContext";
import { Ionicons } from "@expo/vector-icons";
import { AppStateContext } from "../contexts/AppStateContext";
import { SafeAreaView } from "react-native-safe-area-context";

// TODO: Prevent going back to lockscreen once navigated to dashboard screen

export const uploadImageToFirebase = (image, visitId) => {
  const date = new Date().toLocaleTimeString();
  return new Promise(async (resolve, reject) => {
    console.log("inside firebase");
    if (image === null) resolve("null");
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "PatientImages/" + date + "$" + visitId);
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            reject("storage/unauthorized");
            break;
          case "storage/canceled":
            // User canceled the upload
            reject("storage/canceled");
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            reject("storage/unknown");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

function Dashboard({ navigation }) {
  const isFocused = useIsFocused();
  const today = new Date();

  const [appointmentData, setAppointmentData] = useState([]);
  const [isAppointmentModalActive, setIsAppointmentModalActive] =
    useState(false);
  const [appointmentModalData, setAppointmentModalData] = useState(null);
  const [filter, setFilter] = useState("");

  const { isDashboardLoadingState } = useContext(LoadingContext);
  const [isDashboardLoading, setIsDashboardLoading] = isDashboardLoadingState;

  const { isConnectedState } = useContext(ConnectivityContext);
  const [isConnected] = isConnectedState;

  const [syncDate, setSyncDate] = useState(null);

  const updateTimeStamp = async () => {
    const date = await getValueFor("synctimestamp");
    console.log("date in dashboard: ", date);
    setSyncDate(date);
  };

  useEffect(() => {
    (async () => {
      if (isMediaActive === "loading") {
        setIsMediaActive("false");
      }
      await updateTimeStamp();
    })();
  }, []);

  const onFilterChange = (text) => {
    setFilter(text);
    if (text === "") {
      console.log("0");
    }
    if (text === null) {
      console.log("null");
    }
  };

  const onAppointmentCardPressed = (data) => {
    setIsAppointmentModalActive(true);
    setAppointmentModalData(data);
  };

  const onAppointmentModalClose = () => {
    setIsAppointmentModalActive(false);
  };

  // const onShowOTP = () => {
  //   setIsAppointmentModalActive(false);
  // };

  const sortComparator = (prop) => (a, b) => {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };

  const { isBackgroundState } = useContext(AppStateContext);
  const { isMediaActiveState } = useContext(AppStateContext);

  const [isBackground, setIsBackground] = isBackgroundState;
  const [isMediaActive, setIsMediaActive] = isMediaActiveState;

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // const backListener = navigation.addListener("beforeRemove", (e) => {
    //   e.preventDefault();
    //   Alert.alert("Do you want to exit?", null, [
    //     { text: "Stay", style: "cancel" },
    //     {
    //       text: "Leave",
    //       style: "destructive",
    //       onPress: () => {
    //         BackHandler.exitApp();
    //       },
    //     },
    //   ]);
    // });

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/active|foreground/) &&
        nextAppState === "background"
      ) {
        if (isMediaActive === "false") {
          console.log("BACKGROUND: ", isMediaActive);
        } else if (isMediaActive === "true") {
          console.log("BACKGROUND: ", isMediaActive);
        } else if (isMediaActive === "loading") {
          console.log("BACKGROUND: ", isMediaActive);
        }
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("FOREGROUND: ", isMediaActive);
        // backListener();
        if (isMediaActive === "false") {
          console.log("navigate to lockscreen");
          navigation.navigate("lockScreen");
        } else if (isMediaActive === "true") {
          setIsMediaActive("false");
        } else if (isMediaActive === "loading") {
          setIsMediaActive("true");
        }
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [isMediaActive, appState]);

  const loadAppointmentFromDatabase = (appointmentList) => {
    setAppointmentData(appointmentList.sort(sortComparator("date")));
    setIsDashboardLoading(false);
  };

  // NOTE: sync button is not part of dashboard screen, but it is part of drawer header
  // so changing state of dashboard doesn't affect the state of syncDB function
  // to update the syncDB state along with dashboard, mention the states in the useEffect [...]
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              marginRight: 10,
              backgroundColor: COLOR.lightGray,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontWeight: "200",
                letterSpacing: 0.6,
              }}
            >
              {" "}
              LAST SYNC
            </Text>
            <Text
              style={{
                fontWeight: "500",
                letterSpacing: 0.6,
                textAlign: "center",
              }}
            >
              {syncDate}
            </Text>
          </View>

          <MaterialCommunityIcons
            style={{
              marginRight: 12,
            }}
            name="sync"
            color={COLOR.primaryColor}
            size={28}
            onPress={() => {
              syncDB();
            }}
          />
        </View>
      ),
      headerTitleStyle: {
        fontSize: width / 24,
      },
    });
  }, [navigation, isConnected, syncDate]);

  const getNewAppointments = async () => {
    const e_id = JSON.parse(await getValueFor("user")).e_id;
    console.log(e_id);
    // get new appointment list
    getAppointmentList(e_id).then(async (response) => {
      if (response.data) {
        const appointmentList = response.data;
        console.log("appointment list", appointmentList.length);
        // create a promise list for each insert table query
        const promiseList = appointmentList.map((row) => {
          return insertAppointments(row);
        });
        // get reponse for each of the query promises
        Promise.allSettled(promiseList).then((value) => {
          console.log("value: ", value);
        });
        await getAppointmentFromTable(loadAppointmentFromDatabase);
        setIsDashboardLoading(false);
        console.log("inserted data in appointment table");
      } else {
        setIsDashboardLoading(false);
        console.log("get appointment list api error");
      }
    });
  };

  const removeReassignedVisitList = async () => {
    const e_id = JSON.parse(await getValueFor("user")).e_id;
    await removeVisitList(e_id).then((response) => {
      if (response.data) {
        // new pid list
        const newPIDs = response.data;
        console.log("new PID: ", newPIDs);

        getAppointmentFromTable((appointmentList) => {
          // local pid list
          let localFids = [];
          appointmentList.forEach((appointment) => {
            localFids.push(appointment.followup_id);
          });
          console.log("local fids: ", localFids);

          // expired pid list
          let removeFids = localFids.filter((fid) => {
            return !newPIDs.includes(fid);
          });
          console.log("remove fids: ", removeFids);

          removeAppointmentsWithPID(removeFids)
            .then((success) => {
              console.log(success);
              setIsDashboardLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsDashboardLoading(false);
            });
        }).catch((error) => {
          console.log("remove reassigned: get appointment from table error!");
        });
      } else {
        setIsDashboardLoading(false);
        console.log("remove reassigned visit list api error");
      }
    });
  };

  const loadMedicalData = async (medicalData) => {
    if (medicalData.length === 0) {
      console.log("no medical data");
      await removeReassignedVisitList();
      await getNewAppointments();
      await updateSyncTime(new Date());
      await updateTimeStamp();
      setIsDashboardLoading(false);
      return;
    }

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
        await removeReassignedVisitList();
        await getNewAppointments();
        await updateSyncTime(new Date());
        await updateTimeStamp();
        setIsDashboardLoading(false);
      });
    });
  };

  const syncDB = async () => {
    // send medical data
    console.log("dashboard network: ", isConnected);
    setIsDashboardLoading(true);
    if (isConnected) {
      // login
      getMedicalDataFromTable(loadMedicalData).catch((error) => {
        console.log("get medical data from table error: ", error);
        setIsDashboardLoading(false);
      });
    } else {
      Alert.alert("No Internet Connection!");
      setIsDashboardLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        // setIsDashboardLoading(true);
        await getAppointmentFromTable(loadAppointmentFromDatabase);
      })();
    }
  }, [isFocused]);

  // change the opacity of the dashboard header on modal active
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { opacity: isAppointmentModalActive ? 0.4 : 1 },
    });
  }, [isAppointmentModalActive]);

  return (
    <View
      style={[
        styles.screen,
        {
          opacity: isAppointmentModalActive ? 0.4 : 1,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            elevation: isAppointmentModalActive ? 0 : 4,
            shadowColor: "#000000",
            borderRadius: 8,
            marginBottom: 20,
            backgroundColor: "white",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: width / 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: width / 16,
                height: width / 16,
              }}
              source={require("../assets/search.png")}
            />
          </View>

          <TextInput
            value={filter}
            style={styles.textinput}
            keyboardType="default"
            selectionColor={COLOR.primaryColorLight}
            placeholder="Search"
            placeholderTextColor={COLOR.primaryColor}
            onChangeText={onFilterChange}
          />

          {filter && (
            <Ionicons
              style={{
                alignSelf: "center",
                padding: 8,
              }}
              name="close-circle-sharp"
              size={width / 20}
              color={COLOR.primaryColor}
              onPress={() => {
                setFilter("");
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {isDashboardLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={COLOR.primaryColor} />
          </View>
        ) : (
          <FlatList
            style={{
              paddingHorizontal: 20,
            }}
            keyExtractor={(itemData, i) => itemData.v_id}
            data={appointmentData.filter((v) => {
              return (
                new Date(v.date) >= today &&
                v.name.toLowerCase().includes(filter.toLowerCase())
              );
            })}
            renderItem={(itemData) => {
              return (
                <AppointmentCard
                  data={itemData.item}
                  onPress={onAppointmentCardPressed}
                />
              );
            }}
          />
        )}

        <AppointmentModal
          visible={isAppointmentModalActive}
          data={appointmentModalData}
          onModalClose={onAppointmentModalClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: COLOR.backgroundColor,
  },
  textinput: {
    flex: 1,
    fontSize: width / 22,
    color: COLOR.primaryColor,
    paddingVertical: 12,
  },
});

export default Dashboard;
