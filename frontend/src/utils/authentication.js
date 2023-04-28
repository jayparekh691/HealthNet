import { deleteKey } from "../utils/localStorage";

export const handleAuthentication = (response, navigationHandler, url) => {
  if (response.status === 401 || response.status === 403) {
    deleteKey("token");
    navigationHandler(url);
  }
};

export const logout = (navigationHandler, url) => {
  deleteKey("token");
  navigationHandler(url);
};
