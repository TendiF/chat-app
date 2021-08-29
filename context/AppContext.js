import React, { useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090/',
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