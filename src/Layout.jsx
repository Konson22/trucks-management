import Navbar from "./components/Navbar"
import { useGlobalContext } from "./contexts/GlobalContextProvider"
import RecordsContextProvider from "./contexts/RecordsContextProvider"
import FormsModal from "./pages/forms/FormsModal"

export default function Layout({children}){

  const { showForm } = useGlobalContext()

  return(
    <RecordsContextProvider>
      {showForm && <FormsModal />}
      <Navbar />
      {children}
    </RecordsContextProvider>
  )
}