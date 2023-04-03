export const COLOR = {
  backgroundColor: "#e0eefc",
  textInputBackgroundColor: "#ffffff",
  secondaryColor: "#665e81ff",
  primaryColorLight: "#d1c6faff",
  primaryColor: "#3e4684",
  primaryColorDark: "#292f5b",
  gray: "#848484",
  lightGray: "#e1e0e0",
  darkGray: "#414141",
  white: "#ffffff",
};

export const RANDOM_COLOR = () => {
  let random_color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return random_color;
};
