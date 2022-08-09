import React, { useState, useContext } from "react";

const ModalContext = React.createContext();

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalContextProvider({ children }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [ownershipRequestOpen, setOwnershipRequestOpen] = useState(false);
  const [profileFormOpen, setProfileFormOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
  };
  const handleSignupOpen = () => {
    setSignupOpen(true);
  };
  const handleSignupClose = () => {
    setSignupOpen(false);
  };
  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };
  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleAdvancedSearchOpen = () => {
    setAdvancedSearchOpen(true);
  };

  const handleAdvancedSearchClose = () => {
    setAdvancedSearchOpen(false);
  };

  const handleOwnershipRequestOpen = () => {
    setOwnershipRequestOpen(true);
  };

  const handleOwnershipRequestClose = () => {
    setOwnershipRequestOpen(false);
  };

  const handleProfileFormOpen = () => {
    setProfileFormOpen(true);
  };

  const handleProfileFormClose = () => {
    setProfileFormOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        loginOpen,
        handleLoginOpen,
        handleLoginClose,
        signupOpen,
        handleSignupOpen,
        handleSignupClose,
        forgotPasswordOpen,
        handleForgotPasswordOpen,
        handleForgotPasswordClose,
        advancedSearchOpen,
        handleAdvancedSearchOpen,
        handleAdvancedSearchClose,
        ownershipRequestOpen,
        handleOwnershipRequestClose,
        handleOwnershipRequestOpen,
        profileFormOpen,
        handleProfileFormOpen,
        handleProfileFormClose,
      }}
    >
      {" "}
      {children}
    </ModalContext.Provider>
  );
}
