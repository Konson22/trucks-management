import { useState, useContext, createContext, useEffect } from 'react'
import axiosInstance from '../hooks/axiosInstance'
import recordsJson from '../assets/records.json'

const recordsApi = createContext()


export const useRecordsContext = () => useContext(recordsApi)

const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))


export default function RecordsContextProvider({children}) {
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(recordsJson)


  useEffect(() => {

    let isMounted = true
    const controller = new AbortController()
    const fetchMessages = async() => {
      setLoading(true)
      try {
        const response = await axiosInstance.post('/records', {user:'VSS'}, {
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
    try {
      const response = await axiosInstance.post('/records/checkout', {id}).then(res => res);
      setData(response.data)
    } catch (error) {
      // console.log(error?.response?.data)
    }
  }
 
 
  const clearForDispatchFn = async id => {
    try {
      const response = await axiosInstance.post('/records/clear-out', {id}).then(res => res);
      setData(response.data)
    } catch (error) {
      // console.log(error?.response?.data)
    }
  }
  


  return (
    <recordsApi.Provider value={{ loading, error, data, setData, checkOut, clearForDispatchFn }}>
      {children}
    </recordsApi.Provider>
  )
}
