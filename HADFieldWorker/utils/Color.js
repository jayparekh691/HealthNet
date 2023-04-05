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
  shade1: "#CEC793",
  shade2: "#CCDBF5",
  shade3: "#6B72A9",
  shade4: "#7c7c7c",
  shade5: "#3c4061",
  divider: "#8f8f8f",
};

export const RANDOM_COLOR = () => {
  let random_color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return random_color;
};
