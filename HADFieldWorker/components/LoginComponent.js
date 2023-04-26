import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomTextInput from "./CustomTextInput";
import { COLOR } from "../utils/Color";
import CustomButton from "./CustomButton";
import { log } from "react-native-reanimated";
import { ConnectivityContext } from "../contexts/ConnectivityContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { login } from "../services/loginServices";
import { getValueFor, save, updateSyncTime } from "../utils/util";
import {
  cleanDatabase,
  createTables,
  insertAppointments,
} from "../services/databaseServices";
import { getAppointmentList } from "../services/syncServices";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

function LoginComponent({ onPress, index }) {
  const navigation = useNavigation();

  const { isConnectedState } = useContext(ConnectivityContext);
  const [isConnected] = isConnectedState;

  const { isLoginLoadingState } = useContext(LoadingContext);
  const [_, setIsLoginLoading] = isLoginLoadingState;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (name, text) => {
    console.log(loginData);
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
                console.log("appointmentList", appointmentList);
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
    console.log(loginData);
    // check internet connectivity
    console.log("login screen network: ", isConnected);
    setIsLoginLoading(true);
    if (isConnected) {
      const response = await login(loginData);
      console.log(response.data);
      if (response.data && response.data.roles === "FieldWorker") {
        console.log("saving user data");
        await save("user", JSON.stringify(response.data));
        setupDatabase()
          .then(async (success) => {
            console.log("setup done");
            // this is would be the latest sync since we have logged in.
            await updateSyncTime(new Date());
            console.log("navigating to setuppin");
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

  return (
    <View
      style={{
        maxWidth: 400,
        width: "60%",
      }}
    >
      <View>
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
      <TouchableWithoutFeedback
        activeOpacity={0}
        onPress={() => {
          onPress(index);
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              color: COLOR.primaryColorDark,
            }}
          >
            Forgot Password?
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View
        style={{
          alignSelf: "center",
          width: "60%",
        }}
      >
        <View
          style={{
            marginTop: 24,
          }}
        >
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
  );
}

export default LoginComponent;
