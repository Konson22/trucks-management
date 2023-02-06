import { FaTimes } from "react-icons/fa"
import { useGlobalContext } from "../../contexts/GlobalContextProvider"
import GatepassForm from "./GatepassForm"
import TrucksRegisterForm from "./TrucksRegisterForm"



export default function FormsModal() {

    // const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))
    const { showForm, setShowForm } = useGlobalContext()
   

  return (
    <div className="fixed inset-0 bg-opacity-20 bg-black backdrop-blur-sm h-[100vh] flex items-center justify-center z-50">
        <div className="bg-gray-200 p-10 rounded shadow-xl relative w-[40%]">
          <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setShowForm(null)}>
            <FaTimes className='text-xl' />
          </div>
          {showForm === 'register-truck' && <TrucksRegisterForm />}
          {showForm === 'icrc-vehicle' && <TrucksRegisterForm />}
          {showForm === 'gatepass' && <GatepassForm />}
        </div>
    </div>
  )
}
