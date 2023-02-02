import axios from 'axios'
import { useState, useContext, createContext, useEffect } from 'react'
import records from '../assets/records.json'

const apiContext = createContext()


export const useGlobalContext = () => useContext(apiContext)


export default function GlobalContextProvider({children}) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [trucksData, setTrucksData] = useState(records)
    

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const fetchMessages = async() => {
      setLoading(true)
      try {
        const response = await axios('http://localhost:3001888/records', {
          signal:controller.signal
        }).then(res => res);
        if(isMounted){
          setTrucksData(response.data)
          console.log(response.data)
        }
      } catch (error) {
        setError(error?.response?.data)
      } finally{
        setLoading(false)
      }
    }
    fetchMessages();

    return () => {
      isMounted = false
      controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const checkOut = async id => {

    try {
      const response = await axios.post('http://localhost:3001/records/checkout', {id}).then(res => res);
      setTrucksData(response.data)
    } catch (error) {
      // console.log(error?.response?.data)
    }
  }


  return (
    <apiContext.Provider value={{ loading, error, profile, trucksData, showForm, setTrucksData, checkOut, setProfile, setShowForm }}>
      {children}
    </apiContext.Provider>
  )
}
