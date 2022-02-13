import { createContext } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const context = {};
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default notificationContext;
