import React, { useContext, useEffect, useState } from "react";
import {
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
import { getValueFor, removeItem, save } from "../utils/Util";
import { log } from "react-native-reanimated";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import { SecureStoreContext } from "../contexts/SecureStoreContext";
import {
  cleanDatabase,
  createTables,
  insertAppointments,
} from "../services/databaseServices";
import { getAppointmentList } from "../services/syncServices";
import CustomText from "../components/CustomText";
// import * as SQLite from "expo-sqlite";

const { width, height } = Dimensions.get("screen");

function LoginScreen() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isConnected] = useContext(ConnectivityContext);
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
          console.log(success);

          // create 2 tables
          createTables()
            .then(async (success) => {
              console.log(success);
              // get the user id from secure store
              const e_id = JSON.parse(await getValueFor("user")).e_id;
              console.log(e_id);

              // call api for appointment list for the user
              const response = await getAppointmentList(e_id);
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
    if (false) {
      (async () => {
        await removeItem("pin");
        await removeItem("user");
        await cleanDatabase();
        console.log("cleaned!");
      })();
    } else {
      // check internet connectivity
      if (isConnected) {
        const response = await login(loginData);
        if (response.data && response.data.role === "FieldWorker") {
          await save("user", JSON.stringify(response.data));
          setupDatabase()
            .then((success) => {
              console.log(success);
              navigation.navigate("setuppin");
            })
            .catch((error) => {
              Alert.alert(error);
            });
        } else {
          Alert.alert("Invalid Email or password");
        }
      } else {
        Alert.alert("Please check internet connection!");
      }
    }
  };
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
          <CustomText
            value={loginData.email}
            placeholder={"USERNAME"}
            onChangeText={(text) => onInputChange("email", text)}
          />
        </View>
        <View>
          <CustomText
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
