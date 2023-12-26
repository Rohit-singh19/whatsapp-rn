import React, {createContext, useState} from 'react';

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {
  const [confirmation, setConfirmation] = useState(null);
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    photoURL: '',
    phoneNumber: '',
  });

  return (
    <AuthenticationContext.Provider
      value={{
        confirmation,
        setConfirmation,
        userDetails,
        setUserDetails,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
