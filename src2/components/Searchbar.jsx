import { useState } from "react";
import { clients } from "../assets/data";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Searchbar({setSelectedDate, recordTitle='TRUCKS RECORDS', handleSearch, handleSelectSearch, profile}) {
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex">
      {(profile.org !== 'VSS' && profile.org !== 'WLC') &&
        <div 
          className="flex items-center justify-between h-12 focus:border-none cursor-pointer relative focus:outline-none px-4 bg-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{recordTitle}</span>
          <span >
            <FaChevronDown className="ml-3" />
          </span>
          {isOpen && <div className="absolute left-0 top-full z-10 w-full border rounded bg-gray-100">
            <Link className='block px-3 py-2 hover:bg-blue-100' to='/'>
              TRUCKS
            </Link>
            <Link className='block px-3 py-2 hover:bg-blue-100' to='/vehicles'>
              {profile.org} VEHICLES
            </Link>
          </div>}
        </div>
      }
      {(profile.org === 'VSS' || profile.org === 'WLC') &&
        <select className="flex h-12 focus:border-none focus:outline-none px-4 bg-white ml-2" onChange={e => handleSelectSearch(e.target.value)}>
          <option value="all">All RECORDS</option>
          {clients.map(client => (
            <option value={client} key={client}>{client}</option>
          ))}
        </select>
      }
      <div className="h-12 bg-white pr-3 mx-2">
        <input className='h-full flex-1 focus:border-none focus:outline-none bg-transparent pl-3' type="date"
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="md:flex hidden h-12 w-[350px] bg-white">
        <input 
          className='h-full flex-1 focus:border-none focus:outline-none bg-transparent pl-3' 
          type="search" placeholder="Enter Truck no" 
          onChange={e => handleSearch(e.target.value)}
        />
        <button className="h-full bg-orange-400 px-3">Search</button>
      </div>
    </div>
  )
}
