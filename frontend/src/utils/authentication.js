export const handleAuthentication = (response, navigationHandler, url) => {
  if (response.status === 401 || response.status === 403) {
    navigationHandler[0] = navigationHandler[navigationHandler.length - 1];
    navigationHandler(url, { replace: true });
  }
};
