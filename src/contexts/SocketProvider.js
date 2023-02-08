import { useState, useEffect, useContext, createContext } from 'react'
import io from 'socket.io-client'


const socketApi = createContext()


export const useSocket = () => useContext(socketApi)


export default function SocketProvider({children}) {

    const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))

    const [socket, setSocket] = useState(null)

    useEffect(() => {
      const newSocket = io('wss://wlc-api.onrender.com:3002', {query:{
        org:profile.org
      }})
      setSocket(newSocket)

      return () => newSocket.close()
    }, [profile.org])

  return (
    <socketApi.Provider value={ socket }>
      {children}
    </socketApi.Provider>
  )
}
