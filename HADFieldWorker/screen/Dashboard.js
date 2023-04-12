import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { COLOR } from "../utils/Color";
import { Ionicons } from "@expo/vector-icons";
import AppointmentCard from "../components/AppointmentCard";
import data from "../data/fieldWorkerData";
import AppointmentModal from "../components/AppointmentModal";
import {
  getAppointmentFromTable,
  getMedicalDataFromTable,
  removeRecordFromMedicalDataTable,
} from "../services/databaseServices";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { sendMedicalData } from "../services/syncServices";
import { log } from "react-native-reanimated";
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

  const uploadImageToFirebase = (image, visitId) => {
    const date = new Date().toDateString();
    return new Promise(async (resolve, reject) => {
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
      // if there is not medical data then return
      setIsDashboardLoading(false);
      return;
    }
    const data = medicalData[0];
    uploadImageToFirebase(data.photo, data.v_id)
      .then(async (imageUrl) => {
        data["photo"] = imageUrl;
        const response = await sendMedicalData(data);
        if (response.data) {
          console.log("data: ", response.data);
          removeRecordFromMedicalDataTable(response.data)
            .then((success) => {
              console.log("data removed");
              setIsDashboardLoading(false);
              Alert.alert("Data Synced Successfully!");
            })
            .catch((error) => {
              console.log("error in removing medical data:", response.data);
              setIsDashboardLoading(false);
            });
        } else {
          console.log("error in sending medical data");
          setIsDashboardLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsDashboardLoading(false);
      });
  };

  const syncDB = () => {
    setIsDashboardLoading(true);
    if (isConnected) {
      // send all medicalData rows and delete after send
      getMedicalDataFromTable(loadMedicalData)
        .then((success) => {
          console.log(success);
          setIsDashboardLoading(false);
        })
        .catch((error) => {
          Alert.alert("Sync error!");
          setIsDashboardLoading(false);
        });
      // TODO:  get new appoinment data
    } else {
      setIsDashboardLoading(false);
      Alert.alert("Sync failed, please connect to internet!");
    }
  };

  const loadAppointmentFromDatabase = (appointmentList) => {
    setAppointmentData(appointmentList);
    setIsDashboardLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
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
          <View
            style={{
              flex: 1,
            }}
          >
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
            padding: 15,
            elevation: isAppointmentModalActive ? 0 : 4,
            shadowColor: "#000000",
            shadowOffset: { width: -10, height: -10 },
            borderRadius: 8,
            marginBottom: 20,
            backgroundColor: "white",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <MaterialCommunityIcons
            name="sync"
            color={COLOR.primaryColor}
            size={28}
            onPress={syncDB}
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
