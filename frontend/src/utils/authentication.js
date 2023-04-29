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
    toast.error("Please relogin again. Your session has expired");
  }
};

export const logout = (navigationHandler, url) => {
  deleteKey("token");
  navigationHandler(url);
};
