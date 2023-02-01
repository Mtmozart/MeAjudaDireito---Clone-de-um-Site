import React,{ createContext } from "react";

import useAuth from "../hooks/useAuth";
import useCookies from "../hooks/useCookies";

const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, register, logout, login, update } = useAuth();
  const { cookie, acceptCookie} = useCookies();

  return (
    <Context.Provider
      value={{ authenticated, cookie, register, logout, login, update, acceptCookie}}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };