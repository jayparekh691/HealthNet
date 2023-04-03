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

function checkVisited(data) {
  // check in local database
  // is visited is true return true
  // else return false
  return true;
}

function markVisited(navigation, data) {
  // mark visited in local database
  return checkVisited(data);
}

export { makeCall, markVisited, checkVisited };
