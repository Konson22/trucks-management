import { FiBell, FiUser } from 'react-icons/fi'
import { useGlobalContext } from '../contexts/GlobalContextProvider'


export default function Navbar() {

  const { setShowForm } = useGlobalContext()

  return (
    <div className='h-[4.5rem] bg-gray-700 text-white flex items-center justify-between px-[3%]'>
      <div className="">
        <h1 className="text-2xl font-bold text-white">WLC Trucks Management</h1>
      </div>
      <div className="flex items-center">
        <button className="px-3 py-2 bg-orange-400" onClick={() => setShowForm(true)}>Register Truck</button>
        <div className="mx-3">
          <FiBell className='text-2xl' />
        </div>
        <div className="">
          <FiUser className='text-2xl' />
        </div>
      </div>
    </div>
  )
}
