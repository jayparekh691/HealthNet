import { Alert, Linking } from "react-native";
function makeCall(number) {
  if (Platform.OS !== "android") {
    mobileNumber = `telprompt:${number}`;
  } else {
    mobileNumber = `tel:${number}`;
  }
  Linking.canOpenURL(mobileNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Sorry, service unavailable !");
      } else {
        return Linking.openURL(mobileNumber);
      }
    })
    .catch((err) => console.log(err));
}

export { makeCall };
