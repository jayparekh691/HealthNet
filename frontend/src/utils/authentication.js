import { deleteKey } from "../utils/localStorage";

export const handleAuthentication = (
  response,
  navigationHandler,
  url,
  toast
) => {
  if (response.status === 401 || response.status === 403) {
    deleteKey("token");
    navigationHandler(url);
    if (toast) toast.error("Please relogin again. Your session has expired");
  } else if (response.status === 409) {
    toast.error("The entered email is already in use.");
  }
};

export const logout = (navigationHandler, url) => {
  deleteKey("token");
  navigationHandler(url);
};
