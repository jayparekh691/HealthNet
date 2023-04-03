import React, { useEffect, useState } from "react";
import {
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
import { checkVisited } from "../services/dashboardServices";

const { width, height } = Dimensions.get("screen");

function Dashboard({ navigation }) {
  const [appointmentData, setAppointmentData] = useState(
    createAppointmentData()
  );

  const [isAppointmentModalActive, setIsAppointmentModalActive] =
    useState(false);
  const [appointmentModalData, setAppointmentModalData] = useState({
    v_id: "",
    instruction: "",
    name: "",
    age: "",
    address: "",
    city: "",
    gender: "",
    state: "",
    pincode: "",
    mobilenumber: "",
    town: "",
    visited: "",
    date: "",
    otp: "",
    f_id: "",
  });

  const onFilterChange = () => {};

  const onAppointmentCardPressed = (data) => {
    if (checkVisited(data)) {
      navigation.navigate("medicalData", data);
    } else {
      setIsAppointmentModalActive(true);
      setAppointmentModalData(data);
    }
  };

  const onAppointmentModalClose = () => {
    setIsAppointmentModalActive(false);
  };

  const onShowOTP = () => {
    setIsAppointmentModalActive(false);
  };

  function createAppointmentData() {
    const newData = [];
    data.forEach((a) => {
      const v = a.followup.visitList;
      for (let i = 0; i < v.length; i++) {
        if (v[i].visited === false) {
          newData.push({
            v_id: v[i].v_id,
            instruction: a.followup.instructions,
            name: a.patient.name,
            age: a.patient.age,
            address: a.patient.address,
            city: a.patient.city,
            gender: a.patient.gender,
            state: a.patient.state,
            pincode: a.patient.pincode,
            mobilenumber: a.patient.mobilenumber,
            town: a.patient.town,
            visited: v[i].visited,
            date: v[i].date,
            otp: v[i].otp,
            f_id: v[i].fieldWorker.e_id,
          });
          break;
        }
      }
    });
    return newData;
  }

  // useEffect(() => {
  //   setAppointmentData(createAppointmentData());
  // }, [appointmentData]);

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
          <View>
            <TextInput
              // value={password}
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
          <Ionicons
            name="filter"
            color={COLOR.primaryColor}
            size={width / 16}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          style={{
            paddingHorizontal: 20,
          }}
          keyExtractor={(itemData, i) => itemData.v_id}
          data={appointmentData.filter((v) => {
            return !v.visited;
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
