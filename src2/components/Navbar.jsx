import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { FiBell, FiPrinter, FiUser, FiTruck, FiClipboard } from 'react-icons/fi'
import { useGlobalContext } from '../contexts/GlobalContextProvider'


export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))

  const { setShowForm, logOutFn } = useGlobalContext()

  return (
    <div className='h-[4.5rem] bg-gray-700 text-white flex items-center justify-between md:px-[3%] px-2'>
      <div className="flex-1">
        <h1 className="flex items-center text-2xl font-bold text-white">
          <span className="">WLC</span>
          <span className="text-yellow-400">Gate</span>
        </h1>
      </div>
      <div className="">
        <ul className="flex">
          <li className="px-3">
            <Link className='flex items-center' to='/'><FiTruck className='text-2xl mr-1' /> Vehicles</Link>
          </li>
          <li className="px-3">
            <Link className='flex items-center' to='/gatepass'><FiClipboard className='text-2xl mr-1' /> Gatepass</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        { profile.org === 'VSS' ?
          <button className="flex items-center px-3 py-2 bg-orange-400 rounded relative" onClick={() => setIsOpen(!isOpen)}>
            Register <span className="md:block hidden">Truck</span>
            <span >
            <FaChevronDown className="ml-3" />
          </span>
          {isOpen && <div className="text-gray-600 absolute left-0 top-full z-10 w-full border rounded bg-gray-100">
            <div className="px-3 py-2 hover:bg-blue-100" onClick={() => setShowForm('register-truck')}>
              <span>TRUCKS</span>
            </div>
            <div className="px-3 py-2 hover:bg-blue-100"  onClick={() => setShowForm('icrc-vehicle')}>
              <span>ICRC VEHICLS</span>
            </div>
          </div>
          }
          </button> :
          <button className="px-3 py-2 bg-orange-400 rounded" onClick={() => setShowForm('gatepass')}>Issue Getpass</button> 
        }

        {profile.org === 'VSS' &&
          <div className="ml-6 relative">
            <FiPrinter className='text-2xl' />
            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-red-400 absolute top-[-1rem] right-[-1rem] text-[0.8rem]">
              10
            </div>
          </div>
        }
        <div className="mx-6 relative">
          <FiBell className='text-[1.8rem]' />
        </div>
        <div className="flex items-center relative" onClick={() => setOpenUserMenu(!openUserMenu)}>
          <FiUser className='text-[1.8rem]' />
          <span className="md:block hidden ml-2">{profile.name}</span>
          <FaChevronDown className={`ml-2 duration-300 ${openUserMenu ? 'rotate-[180deg]' : ''}`} />
          {openUserMenu && <div className="absolute left-0 text-gray-600 top-full z-10 w-full border rounded bg-gray-100">
            <div className='block px-3 py-2 hover:bg-blue-100'>
              Account
            </div>
            <div className='block px-3 py-2 hover:bg-blue-100' onClick={logOutFn}>
              Logout
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}
