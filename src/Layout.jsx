import Navbar from "./components/Navbar"
import { useGlobalContext } from "./contexts/GlobalContextProvider"
import RecordsContextProvider from "./contexts/RecordsContextProvider"
import SocketProvider from "./contexts/SocketProvider"
import FormsModal from "./pages/forms/FormsModal"

export default function Layout({children}){

  const { showForm } = useGlobalContext()

  return(
    <SocketProvider>
    <RecordsContextProvider>
      {showForm && <FormsModal />}
      <Navbar />
      {children}
    </RecordsContextProvider>
    </SocketProvider>
  )
}