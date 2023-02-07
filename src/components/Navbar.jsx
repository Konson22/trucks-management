import { FiBell, FiPrinter, FiUser, FiTruck, FiSearch } from 'react-icons/fi'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContextProvider'

export default function Navbar() {

    const profile = JSON.parse(localStorage.getItem('wlc-user-auth'));
    const [openProfileDropDown, setOpenProfileDropDown] = useState(false)
    const [openUploadButton, setOpenUploadButton] = useState(false)
    const { notificatios, setShowForm, logOutFn } = useGlobalContext()


    return (
        <div className='md:h-[4.5rem] h-[4rem] bg-gray-700 text-white flex items-center justify-between md:px-[3%] px-2'>
            <div className="flex-1">
                <h1 className="flex items-center text-2xl font-bold text-white">
                <span className="mr-2">WLC</span>
                <span className="text-yellow-400">Gate</span>
                </h1>
            </div>
            <div className="flex items-center">
               {profile.org !== 'VSS' && 
                <>
                    <div className="relative">
                        <FiTruck className='text-[1.8rem] text-2xl' />
                    </div>
                    <div className="md:ml-6 ml-4 relative">
                        <FiPrinter className='md:text-[1.8rem] text-2xl' />
                    </div>
                    <button className="flex items-center px-3 py-2 md:ml-6 ml-4 bg-yellow-500 rounded" onClick={() => setShowForm('gatepass')}>
                        Issue
                        <span className="md:block hidden ml-1">gateass</span>
                    </button>
                </>
                }
                {profile.org === 'VSS' && 
                  <button className="flex items-center relative px-3 py-2 md:ml-6 ml-4 bg-yellow-500 rounded" 
                    onClick={() => setOpenUploadButton(!openUploadButton)}
                  >
                    Register <span className="md:flex hidden mx-1">Truck</span>
                    <FaChevronDown className={`ml-1 duration-300  ${openUploadButton ? 'rotate-[180deg]':''}`} />
                    {openUploadButton && 
                      <div className="text-gray-600 absolute left-0 top-full z-10 w-full border rounded bg-gray-100">
                        <div className="px-3 py-2 hover:bg-blue-100" onClick={() => setShowForm('register-truck')}>
                          <span>TRUCKS</span>
                        </div>
                        <div className="px-3 py-2 hover:bg-blue-100"  onClick={() => setShowForm('icrc-vehicle')}>
                          <span>ICRC VEHICLS</span>
                        </div>
                      </div>
                    }
                  </button>
                }
                <div className="md:hidden  md:ml-6 ml-4 relative">
                  <FiSearch className='md:text-[1.8rem] text-2xl' />
                </div>
                <div className="md:ml-6 ml-4 relative">
                  <FiBell className='md:text-[1.8rem] text-2xl' />
                  {notificatios.lengh >= 1 && 
                    <div className="md:h-5 h-4 md:w-5 w-4 bg-red-500 rounded-full flex items-center justify-center absolute top-[-0.7rem] right-[-0.7rem] text-[.7rem]">
                      {notificatios.length}
                    </div>
                  }
                </div>
                <div className="flex items-center relative md:ml-6 ml-4" onClick={() => setOpenProfileDropDown(!openProfileDropDown)}>
                  <FiUser className='text-[1.8rem]' />
                  <span className="md:block hidden ml-2">Kon</span>
                  <FaChevronDown className={`md:block hidden ml-2 duration-300 ${openProfileDropDown ? 'rotate-[180deg]' : ''}`} />
                  {openProfileDropDown && 
                    <div className="absolute left-0 text-gray-600 top-full z-10 w-full border rounded bg-gray-100">
                        <div className='block px-3 py-2 hover:bg-blue-100'>
                            Account
                        </div>
                        <div className='block px-3 py-2 hover:bg-blue-100' onClick={logOutFn}>
                            Logout
                        </div>
                    </div>
                  }
                </div>
            </div>
        </div>
    )
  }
  

  /*
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { FiBell, FiPrinter, FiUser, FiTruck, FiClipboard } from 'react-icons/fi'
import { useGlobalContext } from '../contexts/GlobalContextProvider'


export default function Navbar() {

  
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
          <div className="md:ml-6 ml-4 relative">
            <FiPrinter className='text-2xl' />
            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-red-400 absolute top-[-1rem] right-[-1rem] text-[0.8rem]">
              10
            </div>
          </div>
        }
        <div className="mx-6 relative">
          <FiBell className='text-[1.8rem]' />
        </div>
        
      </div>
    </div>
  )
}

  */