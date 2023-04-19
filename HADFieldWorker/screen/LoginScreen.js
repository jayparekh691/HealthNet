import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";
import { login } from "../services/loginServices";
import { getValueFor, removeItem, save, updateSyncTime } from "../utils/Util";
import { log } from "react-native-reanimated";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import SecureStoreProvider, {
  SecureStoreContext,
} from "../contexts/SecureStoreContext";
import {
  cleanDatabase,
  createTables,
  insertAppointments,
} from "../services/databaseServices";
import { getAppointmentList } from "../services/syncServices";
import CustomTextInput from "../components/CustomTextInput";
import { LoadingContext } from "../contexts/LoadingContext";
// import * as SQLite from "expo-sqlite";

const { width, height } = Dimensions.get("screen");

function LoginScreen() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isConnectedState } = useContext(ConnectivityContext);
  const { isLoginLoadingState } = useContext(LoadingContext);

  const [isLoginLoading, setIsLoginLoading] = isLoginLoadingState;
  const [isConnected] = isConnectedState;

  const { syncDateState } = useContext(SecureStoreContext);
  const [syncDate, setSyncDate] = syncDateState;

  const navigation = useNavigation();

  const onInputChange = (name, text) => {
    setLoginData((pv) => {
      return {
        ...pv,
        [name]: text,
      };
    });
  };

  const setupDatabase = async () => {
    return new Promise((resolve, reject) => {
      // clean database: delete the tables from database
      cleanDatabase()
        .then((success) => {
          console.log("database cleaned");

          // create 2 tables
          createTables()
            .then(async (success) => {
              console.log("database created");
              // get the user id from secure store
              const e_id = JSON.parse(await getValueFor("user")).e_id;
              console.log("userid ", e_id);

              // call api for appointment list for the user
              const response = await getAppointmentList(e_id);
              if (response.data) {
                const appointmentList = response.data;
                console.log(appointmentList);
                // create a promise list for each insert table query
                const promiseList = appointmentList.map((row) => {
                  return insertAppointments(row);
                });

                // get reponse for each of the query promises
                Promise.allSettled(promiseList).then((value) => {
                  console.log("value: ", value);
                });
                resolve("inserted data in appointment table");
              } else {
                reject("get appointment list api error");
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleSignIn = async () => {
    // check internet connectivity
    console.log("login screen network: ", isConnected);
    setIsLoginLoading(true);
    if (isConnected) {
      const response = await login(loginData);
      console.log(response.data);
      if (response.data && response.data.roles === "FieldWorker") {
        await save("user", JSON.stringify(response.data));
        setupDatabase()
          .then((success) => {
            // this is would be the latest sync since we have logged in.
            setSyncDate(updateSyncTime());
            navigation.navigate("setuppin");
          })
          .catch((error) => {
            setIsLoginLoading(false);
            Alert.alert(error);
          });
      } else {
        setIsLoginLoading(false);
        Alert.alert("Invalid Email or password");
      }
    } else {
      setIsLoginLoading(false);
      Alert.alert("Please check internet connection!");
    }
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
    <View style={styles.screen}>
      <View
        style={{
          width: width / 2,
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          <CustomTextInput
            value={loginData.email}
            placeholder={"USERNAME"}
            onChangeText={(text) => onInputChange("email", text)}
          />
        </View>
        <View>
          <CustomTextInput
            value={loginData.password}
            placeholder={"PASSWORD"}
            hasSecureEye={true}
            onChangeText={(text) => onInputChange("password", text)}
          />
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <View>
            <CustomButton
              backgroundColor={COLOR.primaryColor}
              textColor="white"
              title="LOGIN"
              onPress={handleSignIn}
              style={{
                elevation: 10,
                shadowColor: "#000000",
                shadowOffset: { width: 4, height: 4 },
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: Styles.screen,
  textinput: {
    fontSize: width / 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "white",
  },
});

export default LoginScreen;
