import React from "react";
import {
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLOR } from "../utils/Color";
import CustomButton from "./CustomButton";
import DetailField from "./DetailField";
import ContactCard from "./ContactCard";
import { makeCall } from "../services/dashboardServices";

function AppointmentModal({ visible, onModalClose, data, showOTP }) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onModalClose}
      style={{}}
    >
      <TouchableWithoutFeedback onPress={onModalClose}>
        <View
          style={{
            flex: 1,
          }}
        ></View>
      </TouchableWithoutFeedback>
      <View
        style={{
          justifyContent: "flex-end",
          backgroundColor: COLOR.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 12,
          overflow: "hidden",
          elevation: 10,
          shadowColor: "#000000",
          shadowOffset: { width: -4, height: -4 },
        }}
      >
        <View
          style={{
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              alignItems: "stretch",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: COLOR.darkGray,
                  fontWeight: "400",
                  fontSize: 24,
                  alignSelf: "flex-end",
                }}
              >
                Patient Details
              </Text>
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
            <View
              style={{
                marginBottom: 8,
              }}
            >
              <DetailField title={"name"} info={data.name} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  flex: 4,
                  paddingRight: 4,
                }}
              >
                <DetailField
                  title={"town"}
                  info={data.town}
                  style={{ alignItems: "stretch" }}
                />
              </View>
              <View
                style={{
                  flex: 5,
                  paddingLeft: 4,
                }}
              >
                <DetailField
                  title={"city"}
                  info={data.city}
                  style={{ alignItems: "stretch" }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  flex: 2,
                  paddingRight: 4,
                }}
              >
                <DetailField
                  title={"state"}
                  info={data.state}
                  style={{ alignItems: "stretch" }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 4,
                }}
              >
                <DetailField
                  title={"pincode"}
                  info={data.pincode}
                  style={{ alignItems: "stretch" }}
                />
              </View>
            </View>
            <View>
              <DetailField
                title={"address"}
                info={data.address}
                style={{
                  alignItems: "stretch",
                }}
              />
            </View>
          </View>
        </View>

        <View>
          <CustomButton
            backgroundColor={COLOR.primaryColor}
            textColor={COLOR.backgroundColor}
            title="Continue"
            onPress={showOTP}
          />
        </View>
      </View>
    </Modal>
  );
}

export default AppointmentModal;
