import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { COLOR } from "../utils/Color";
import { Styles } from "../utils/Styles";
import { getValueFor, removeItem, save, updateSyncTime } from "../utils/util";
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import LoginComponent from "../components/LoginComponent";
import ForgotPasswordComponent from "../components/ForgotPasswordComponent";
import UpdatePasswordComponent from "../components/UpdatePasswordComponent";
// import * as SQLite from "expo-sqlite";

const { width, height } = Dimensions.get("screen");

function LoginScreen() {
  const { isLoginLoadingState } = useContext(LoadingContext);
  const [isLoginLoading, setIsLoginLoading] = isLoginLoadingState;
  const [index, setIndex] = useState(0);
  const [component, setComponent] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (index === 0) {
      setComponent(() => {
        return <LoginComponent index={1} onPress={changeIndex} />;
      });
    } else if (index === 1) {
      setComponent(() => {
        return (
          <ForgotPasswordComponent
            index={0}
            onPress={changeIndex}
            showUpdateComponent={showUpdateComponent}
          />
        );
      });
    }
  }, [index, setComponent]);

  const showUpdateComponent = (id) => {
    setIndex(2);
    setComponent(() => {
      return <UpdatePasswordComponent e_id={id} onUpdate={changeIndex} />;
    });
  };

  const changeIndex = (i) => {
    console.log("change index to ", i);
    setIndex(i);
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

  return <View style={styles.screen}>{component}</View>;
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
