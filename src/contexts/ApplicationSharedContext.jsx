import { createContext, useState } from "react";

export const ApplicationContext = createContext(null);

const ApplicationSharedContext = ({ children }) => {
  const [showMobileNav, setShowMobileNav]= useState(false)
  const context = {
   showMobileNav,
   setShowMobileNav 
  };
  return (
    <ApplicationContext.Provider value={context}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationSharedContext;
