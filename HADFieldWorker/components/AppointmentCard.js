import React from "react";
import { Dimensions, Text, TouchableWithoutFeedback, View } from "react-native";
import { COLOR, RANDOM_COLOR } from "../utils/Color";
import Util from "../utils/util";
import { makeCall } from "../services/dashboardServices";
import ContactCard from "./ContactCard";

const { width, height } = Dimensions.get("screen");

function AppointmentCard({ data, onPress }) {
  const color = RANDOM_COLOR();
  const date = new Date(data.date);
  const today = new Date();
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "stretch",
        height: height / 8,
        // elevation: 10,
        borderRadius: 16,
        // borderWidth: 0.4,
        backgroundColor: today <= date ? COLOR.white : COLOR.primaryColorDark,
        // shadowColor: "#000000",
        // shadowOffset: { width: 4, height: 4 },
        marginBottom: 20,
        overflow: "hidden",
        padding: 12,
      }}
    >
      <TouchableWithoutFeedback
        style={{
          flex: 1,
        }}
        onPress={() => onPress(data)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 12,
              borderRadius: 16,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  paddingBottom: 4,
                  color:
                    today <= date
                      ? COLOR.secondaryColor
                      : COLOR.primaryColorLight,
                  fontWeight: "600",
                  fontSize: width / 16,
                  // fontSize: 24,
                }}
              >
                {data.name}
                {",  "}
                <Text
                  style={{
                    color:
                      today <= date
                        ? COLOR.secondaryColor
                        : COLOR.primaryColorLight,
                    fontWeight: "300",
                    fontSize: width / 26,
                  }}
                >
                  {data.town}
                </Text>
              </Text>
              <Text
                style={{
                  color:
                    today <= date
                      ? COLOR.secondaryColor
                      : COLOR.primaryColorLight,
                  fontWeight: "300",
                  fontSize: width / 26,
                }}
              >
                {data.city}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              {/* TODO: the below div (mobile number) is redundant used both in
               appointment card and appoinment modal card create a component */}
              <TouchableWithoutFeedback
                onPress={() => {
                  makeCall(data.mobilenumber.substring(4));
                }}
              >
                <View>
                  <ContactCard contactNumber={data.mobilenumber.substring(4)} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View
            style={{
              flex: 4,
            }}
          >
            <View
              style={{
                borderRadius: 16,
                flex: 1,
                padding: 8,
                backgroundColor: COLOR.primaryColorLight,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLOR.primaryColorDark,
                  fontWeight: "400",
                  fontSize: width / 26,
                  padding: 2,
                }}
              >
                {Util.getMonth(date.getMonth())}
              </Text>
              <Text
                style={{
                  color: COLOR.primaryColorDark,
                  fontWeight: "600",
                  fontSize: width / 14,
                  padding: 2,
                }}
              >
                {date.getDate()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default AppointmentCard;
