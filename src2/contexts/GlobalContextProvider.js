import { useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const apiContext = createContext()


export const useGlobalContext = () => useContext(apiContext)


export default function GlobalContextProvider({children}) {

  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()


  const logOutFn = async() => {
    localStorage.clear()
    navigate('/login')
  }


  return (
    <apiContext.Provider value={{ showForm, setShowForm, logOutFn }}>
      {children}
    </apiContext.Provider>
  )
}
