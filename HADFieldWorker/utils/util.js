import { MONTHS } from "./Constants";
import * as SecureStore from "expo-secure-store";

export const getMonth = (i) => MONTHS[i];

export const stringFromObject = (pin) => {
  return Object.values(pin).reduce((v, ans) => {
    let result = v.concat(ans);
    return result;
  }, "");
};

export const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const removeItem = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export const getValueFor = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log(`value for the key ${key} doesn't exist!`);
    return null;
  }
};
