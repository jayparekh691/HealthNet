import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Styles } from "../utils/Styles";
import AppointmentCard from "../components/AppointmentCard";
import { COLOR } from "../utils/Color";
import { getMedicalDataFromTable } from "../services/databaseServices";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

function RecordsScreen({ navigation }) {
  const [medicalData, setMedicalData] = useState([]);
  const isFocused = useIsFocused();
  const loadMedicalData = (data) => {
    setMedicalData(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: width / 24,
      },
    });
  }, [navigation]);

  useEffect(() => {
    getMedicalDataFromTable(loadMedicalData)
      .then((success) => {
        // console.log(success);
      })
      .catch((error) => {
        Alert.alert("Sync error!");
      });
  }, [isFocused]);

  return (
    <View style={styles.screen}>
      <FlatList
        style={{
          paddingHorizontal: 20,
        }}
        keyExtractor={(itemData, i) => itemData.v_id}
        data={medicalData}
        renderItem={(itemData) => {
          console.log(itemData.item);
          return (
            <View
              style={{
                backgroundColor: COLOR.white,
                padding: 8,
                marginTop: 8,
                flexDirection: "column",
                borderWidth: 1,
                borderRadius: 8,
              }}
            >
              {itemData.item.v_id.toString().length > 0 ? (
                <Text
                  style={{
                    marginBottom: 12,
                    fontSize: 16,
                    fontWeight: "300",
                  }}
                >
                  VISIT ID: {itemData.item.v_id}
                </Text>
              ) : null}
              {itemData.item.bloodPressure.length > 0 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "300",
                  }}
                >
                  BP :{" "}
                  <Text
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {itemData.item.bloodPressure}
                  </Text>{" "}
                  mmHg
                </Text>
              ) : null}
              {itemData.item.sugarLevel.length > 0 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "300",
                  }}
                >
                  SUGAR LEVEL :{" "}
                  <Text
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {itemData.item.sugarLevel}
                  </Text>{" "}
                  mg/dL
                </Text>
              ) : null}
              {itemData.item.temperature.length > 0 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "300",
                  }}
                >
                  TEMPERATURE :{" "}
                  <Text
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {itemData.item.temperature}
                  </Text>{" "}
                  °F
                </Text>
              ) : null}
              {itemData.item.spo2Level.length > 0 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "300",
                  }}
                >
                  OXYGEN SATURATION :{" "}
                  <Text
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {itemData.item.spo2Level}
                  </Text>{" "}
                  %
                </Text>
              ) : null}
              {itemData.item.date.length > 0 ? (
                <Text
                  style={{
                    marginTop: 12,
                    fontSize: 16,
                    fontWeight: "300",
                  }}
                >
                  VISITED DATE :{" "}
                  <Text
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {itemData.item.date}
                  </Text>
                </Text>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
}

export default RecordsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: COLOR.backgroundColor,
  },
});
