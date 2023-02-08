import { useState, useContext, createContext, useEffect } from 'react'
import axiosInstance from '../hooks/axiosInstance'
import recidJson from '../assets/records.json'
// import { useSocket } from './SocketProvider'


const recordsApi = createContext()


export const useRecordsContext = () => useContext(recordsApi)


export default function RecordsContextProvider({children}) {

  const profile = JSON.parse(localStorage.getItem('wlc-user-auth'));
  // const socket = useSocket()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [checkOutloading, setCheckOutloading] = useState(false)
  const [clearOutloading, setClearOutloading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [data, setData] = useState(recidJson)


useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const fetchMessages = async() => {
      setLoading(true)
      try {
        const response = await axiosInstance.post('/records', {org:profile.org}, {
          signal:controller.signal,
        }).then(res => res);
        if(isMounted){
          setData(response.data)
        }
      } catch (error) {
        setError(error?.response?.data)
      } finally{
        setLoading(false)
      }
    }
    profile && fetchMessages();

    return () => {
      isMounted = false
      controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   setLoading(false)
  //   if(!socket) return
  //   socket.emit('get-data')

  //   socket.on('initial-recieve', responseData => {
  //     setData(responseData)
  //   })

  //   return () => socket.disconnect()
  // }, [socket, profile])
  
  // useEffect(() => {
  //   if(!socket) return
  //   socket.on('recieve', responseData => {
  //     if(profile.org === responseData.client){
  //       setData(prev => [...prev, responseData])
  //       setNotifications(prev => [...prev, 'You have new truck'])
  //     }
  //   })
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket])


  const checkOut = async id => {
    setCheckOutloading(true)
    try {
      const response = await axiosInstance.post('/records/checkout', {id, name:profile.name, org:profile.org}).then(res => res);
      setData(response.data)
    } catch (error) {
      setCheckOutloading(false)
    }finally{
      setCheckOutloading(false)
    }
  }
 
 
  const clearForDispatchFn = async id => {
    setClearOutloading(true)
    try {
      const response = await axiosInstance.post('/records/clear-out', {id, name:profile.name, org:profile.org}).then(res => res);
      setData(response.data)
    } catch (error) {
      setClearOutloading(false)
    }finally{
      setClearOutloading(false)
    }
  }
  

  const values = {
    loading, 
    data, 
    error,
    checkOutloading, 
    notifications,
    clearOutloading, 
    setData, 
    checkOut, 
    setNotifications,
    setClearOutloading, 
    clearForDispatchFn,
  }

  return (
    <recordsApi.Provider value={ values }>
      {children}
    </recordsApi.Provider>
  )
}
