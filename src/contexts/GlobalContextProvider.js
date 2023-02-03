import axios from 'axios'
import { useState, useContext, createContext, useEffect } from 'react'
// import records from '../assets/records.json'

const apiContext = createContext()


export const useGlobalContext = () => useContext(apiContext)


const localStorageData = JSON.parse(localStorage.getItem('wlc-user-auth'))

export default function GlobalContextProvider({children}) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState({
    name:'Konson Ak', org:'VSS', _id:'sduryr'
  })
  const [showForm, setShowForm] = useState(false)
  const [trucksData, setTrucksData] = useState([])


  useEffect(() => {

    localStorageData && console.log('j')

    let isMounted = true
    const controller = new AbortController()
    const fetchMessages = async() => {
      setLoading(true)
      try {
        // const response = await axios('http://localhost:3001/records', {
        const response = await axios('https://trucks-management-api.onrender.com/records', {
          signal:controller.signal,
          withCredentials:true, credentials:'include'
        }).then(res => res);
        if(isMounted){
          setTrucksData(response.data)
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
  }, [profile]);


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
