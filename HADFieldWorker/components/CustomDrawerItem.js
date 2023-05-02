import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLOR } from "../utils/Color";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

function CustomDrawerItem({ style, textStyle, title, onPress }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    drawerStyle: {
      backgroundColor: navigation.isFocused ? COLOR.backgroundColor : null,
      paddingVertical: 12,
      paddingHorizontal: 8,
      marginHorizontal: 8,
      borderRadius: 4,
      marginVertical: 4,
    },
    textStyle: {
      fontSize: width / 32,
      fontWeight: "500",
      color: COLOR.darkGray,
    },
  });

  return (
    <View style={[styles.drawerStyle, style]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default CustomDrawerItem;
