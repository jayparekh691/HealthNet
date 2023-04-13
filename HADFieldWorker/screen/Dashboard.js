import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { COLOR } from "../utils/Color";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentModal from "../components/AppointmentModal";
import {
  getAppointmentFromTable,
  getMedicalDataFromTable,
  removeRecordFromMedicalDataTable,
} from "../services/databaseServices";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { sendMedicalData } from "../services/syncServices";
import { LoadingContext } from "../contexts/LoadingContext";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
const { width, height } = Dimensions.get("screen");
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// TODO: Prevent going back to lockscreen once navigated to dashboard screen

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
  const [isConnected, setIsConnected] = isConnectedState;

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

  const onShowOTP = () => {
    setIsAppointmentModalActive(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          style={{
            marginRight: 12,
          }}
          name="sync"
          color={COLOR.primaryColor}
          size={28}
          onPress={syncDB}
        />
      ),
      headerTitleStyle: {
        fontSize: width / 24,
      },
    });
  }, [navigation]);

  const uploadImageToFirebase = (image, visitId) => {
    const date = new Date().toDateString();
    return new Promise(async (resolve, reject) => {
      console.log("inside firebase");
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

  const loadMedicalData = async (medicalData) => {
    if (medicalData.length === 0) {
      console.log("no medical data");
      setIsDashboardLoading(false);
      return;
    }

    setIsDashboardLoading(true);

    const Promises = new Array();
    medicalData.forEach((data) => {
      Promises.push(
        new Promise((resolve, reject) => {
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
      Promise.allSettled(DeletePromises).then((value) => {
        value.forEach((e) => {
          console.log(e.value, e.status);
        });
        setIsDashboardLoading(false);
      });
    });
  };

  const syncDB = () => {
    // send medical data
    getMedicalDataFromTable(loadMedicalData).catch((error) => {
      console.log("get medical data from table error: ", error);
      setIsDashboardLoading(false);
    });

    // get new appointment list
    getAppointmentList(e_id).then((response) => {
      if (response.data) {
        const appointmentList = response.data;
        // create a promise list for each insert table query
        const promiseList = appointmentList.map((row) => {
          return insertAppointments(row);
        });
        // get reponse for each of the query promises
        Promise.allSettled(promiseList).then((value) => {
          console.log("value: ", value);
        });
        console.log("inserted data in appointment table");
      } else {
        console.log("get appointment list api error");
      }
    });
  };

  const loadAppointmentFromDatabase = (appointmentList) => {
    setAppointmentData(appointmentList);
    setIsDashboardLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setIsDashboardLoading(true);
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
            selectionColor={COLOR.primaryColor}
            placeholder="Search"
            placeholderTextColor={COLOR.primaryColor}
            onChangeText={onFilterChange}
          />
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
              return new Date(v.date) >= today;
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
    paddingRight: 14,
    paddingVertical: 16,
  },
});

export default Dashboard;
