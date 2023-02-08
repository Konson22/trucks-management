import { useState, useContext, createContext, useEffect } from 'react'
import axiosInstance from '../hooks/axiosInstance'

const recordsApi = createContext()


export const useRecordsContext = () => useContext(recordsApi)


export default function RecordsContextProvider({children}) {

  const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))
  const [loading, setLoading] = useState(false)
  const [checkOutloading, setCheckOutloading] = useState(false)
  const [clearOutloading, setClearOutloading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState([])


  // useEffect(() => {
  //   let isMounted = true
  //   const controller = new AbortController()
  //   const fetchMessages = async() => {
  //     setLoading(true)
  //     try {
  //       const response = await axiosInstance.post('/records', {user:profile.org}, {
  //         signal:controller.signal,
  //       }).then(res => res);
  //       if(isMounted){
  //         setData(response.data)
  //       }
  //     } catch (error) {
  //       setError(error?.response?.data)
  //     } finally{
  //       setLoading(false)
  //     }
  //   }
  //   profile && fetchMessages();

  //   return () => {
  //     isMounted = false
  //     controller.abort()
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

 useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const fetchMessages = async() => {
      setLoading(true)
      try {
        const response = await axiosInstance.post('/records', {user:profile.org}, {
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

  const checkOut = async id => {
    setCheckOutloading(true)
    try {
      const response = await axiosInstance.post('/records/checkout', {id, name:profile.name}).then(res => res);
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
      const response = await axiosInstance.post('/records/clear-out', {id, name:profile.name}).then(res => res);
      setData(response.data)
    } catch (error) {
      setClearOutloading(false)
    }finally{
      setClearOutloading(false)
    }
  }
  


  return (
    <recordsApi.Provider value={{ loading, error, data, checkOutloading, clearOutloading, setClearOutloading, setData, checkOut, clearForDispatchFn }}>
      {children}
    </recordsApi.Provider>
  )
}
