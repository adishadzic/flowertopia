import React from 'react';

const NewContext = React.createContext();

const NewProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <NewContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        handleLoginSuccess,
        handleLogout,
      }}
    >
      {children}
    </NewContext.Provider>
  );
};

export { NewContext, NewProvider };
