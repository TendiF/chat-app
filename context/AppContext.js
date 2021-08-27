import React from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'


const AppContext = React.createContext()

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090/',
  timeout: 1000,
});

let socket = io("http://localhost:8090")

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{
      axios: axiosInstance,
      socket
     }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }