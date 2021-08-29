import React, { useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  timeout: 1000,
});


const AppProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  return (
    <AppContext.Provider value={{
      axios: axiosInstance,
      socket,
      setSocket
     }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }