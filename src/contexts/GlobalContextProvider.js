import { useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const apiContext = createContext()


export const useGlobalContext = () => useContext(apiContext)


export default function GlobalContextProvider({children}) {

  const [showForm, setShowForm] = useState(null)
  const [notificatios, setNotificatios] = useState([])
  const [currentRecords, setCurrentRecords] = useState('TRUCKS RECORDS')
  const navigate = useNavigate()

  const logOutFn = async() => {
    setNotificatios([])
    localStorage.clear()
    navigate('/login')
  }


  return (
    <apiContext.Provider value={{ showForm, currentRecords, notificatios, setCurrentRecords, setShowForm, logOutFn }}>
      {children}
    </apiContext.Provider>
  )
}
