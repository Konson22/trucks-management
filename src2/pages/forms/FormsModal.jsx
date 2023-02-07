import { useGlobalContext } from "../../contexts/GlobalContextProvider"
import GatepassForm from "./GatepassForm"
import TrucksRegisterForm from "./TrucksRegisterForm"



export default function FormsModal() {

  const { showForm } = useGlobalContext()

  return (
    <div className="fixed inset-0 bg-opacity-20 bg-black backdrop-blur-sm h-[100vh] flex items-center justify-center z-50">
      {showForm === 'register-truck' && <TrucksRegisterForm />}
      {showForm === 'icrc-vehicle' && <TrucksRegisterForm />}
      {showForm === 'gatepass' && <GatepassForm />}
    </div>
  )
}
