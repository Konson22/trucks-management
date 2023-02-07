// import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRecordsContext } from "../contexts/RecordsContextProvider";

export default function Dashboard() {

  const profile = JSON.parse(localStorage.getItem('wlc-user-auth'));
  const { loading, error, data } = useRecordsContext()
  // const [message, setMessage] = useState('')
  // const [records, setRecords] = useState([])


  return (
    <div className='px-2 md:px-[5%]'>
      <div className="flex items-center justify-between mt-4">
        <div className="md:block hidden">
          <h3 className="text-xl">Records</h3>
        </div>
        <div className="flex items-center">
          <div className="h-12 bg-white pr-3 md:mx-2 mr-2">
            <input className='h-full flex-1 focus:border-none focus:outline-none bg-transparent pl-3' placeholder='Date' type="date" />
          </div>
          <div className="flex h-12 md:w-[350px] w-full bg-white">
            <input className='h-full w-full focus:border-none focus:outline-none bg-transparent pl-3'  type="search" placeholder="Enter Truck no" />
            <button className="flex items-center h-full bg-orange-400 px-3">
              <span className="md:block hidde"><FaSearch /></span>
              <span className="md:block hidden">Search</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4">
        {loading && <div className='px-8 text-xl'>Loading...</div>}
        {error && <div className='px-8 text-xl'>{error}</div>}
        {(!loading && !error) && <TruckTableData data={data} message='' profile={profile} /> }
      </div>
    </div>
  )
}


function TruckTableData({data, profile}){
  return(
    <table className="w-full">
      <thead className='md:block hidden'>
        <tr >
          <td className='px-2 py-3 text-left border border-white'>Truck No</td>
          <td className='px-2 py-3 text-left border border-white'>Driver Name</td>
          <td className='px-2 py-3 text-left border border-white'>Contact</td>
          <td className='px-2 py-3 text-left border border-white'>Company</td>
          <td className='px-2 py-3 text-left border border-white'>Purpose</td>
          {(profile.org === 'VSS' || profile.org === 'WLC') && <td className='px-2 py-3 text-left border border-white'>Client</td>}
          <td className='px-2 py-3 text-left border border-white'>Arrival Date</td>
          <td className='px-2 py-3 text-left border border-white'>Time in</td>
          <td className='px-2 py-3 text-left border border-white'>Depature Date</td>
          <td className='px-2 py-3 text-left border border-white'>Time out</td>
          <td className='px-2 py-3 text-left border border-white'>Duration</td>
          <td className='px-2 py-3 text-left border border-white'>Actions</td>
        </tr>
      </thead>
      {/* <thead className='md:hidden block'>
        <tr>
          <td className='px-2 py-3 text-left border border-white'>Truck No</td>
          <td className='px-2 py-3 text-left border border-white'>Name</td>
          <td className='px-2 py-3 text-left border border-white'>Contact</td>
          <td className='px-2 py-3 text-left border border-white'>Actions</td>
        </tr>
      </thead> */}
      <tbody>
        {data.length >= 1 && data.map(truck => (
          <tr className='p-2 text-sm'>
            <td className='p-2'>{truck.plate_no}</td>
            <td>KONSON</td>
            <td className='p-2'>0920079070</td>
            <td className='p-2'>
              <button className='px-3 py-1 bg-green-500 rounded'>Clear</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}