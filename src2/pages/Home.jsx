import { useState, useEffect } from "react"
import Searchbar from "../components/Searchbar"
import { useRecordsContext } from "../contexts/RecordsContextProvider"


export default function Dashboard() {

  const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))
  
  const { loading, error, data } = useRecordsContext()
  const [message, setMessage] = useState('')
  const [records, setRecords] = useState([])


  useEffect(() => {
    if(data.length >= 1){
      setRecords(data)
    }
    console.log(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading,  data])


  const handleSearch = str => {
    const results = data.filter(rec => rec.plate_no.toLowerCase().startsWith(str.toLowerCase()))
    if(results.length >= 1){
      setMessage('')
      setRecords(results)
    }else{
      setRecords([])
      setMessage(`No Match!`)
    }
  }
  
  
  const handleSearchByDate = dateStr => {
    const myDate = new Date(dateStr).toLocaleDateString()
    const results = data.filter(rec => rec.arrival.date === myDate)
    if(results.length >= 1){
      setMessage('')
      setRecords(results)
    }else{
      setRecords([])
      setMessage(`No Record on Date ${myDate}`)
    }
  }
  
  
  const handleSelectSearch = value => {
    setMessage('')
    if(value === 'all'){
      setRecords(data)
    }else{
      const results = data.filter(rec => rec.client === value)
      if(results.length >= 1){
        setRecords(results)
      }else{
        setRecords([])
        setMessage(`No Records found for ${value}`)
      }
    }
  }


  return (
    <div className='app-container px-[1.5%]'>
      <div className="md:flex items-center justify-between my-6 mx-3">
        <div className="">
          <h1 className="text-2xl">TRUCKS REGISTERATION LOG</h1>
        </div>
        <Searchbar handleSelectSearch={handleSelectSearch} setSelectedDate={handleSearchByDate} handleSearch={handleSearch} profile={profile} />
      </div>
      <div className="app-content bg-white">
        {loading && <div className='px-8 text-xl'>Loading...</div>}
        {error && <div className='px-8 text-xl'>{error}</div>}
        {(!loading && !error) && <TruckTableData data={records} message={message} profile={profile} /> }
      </div>
    </div>
  )
}


function TruckTableData({data, profile, message}) {

  const { checkOut, clearForDispatchFn, clearOutloading, checkOutloading } = useRecordsContext()

  return (
    <>
    <table className="w-full">
      <thead className='bg-gray-300'>
        <tr>
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
      <tbody>
        {data.length >= 1 && data.map(truck => {
          const duration = truck.depature && parseInt(truck.depature.date.split('/').join('')) - parseInt(truck.arrival.date.split('/').join(''))
          return(
            <tr  className={`hover:bg-red-100 border-b`} key={truck._id}>
              <td className='p-2'>{truck.plate_no}</td>
              <td className='p-2'>{truck.driver_name}</td>
              <td className='p-2'>{truck.contact}</td>
              <td className='p-2'>{truck.company}</td>
              <td className='p-2'>{truck.purpuse}</td>
              {(profile.org === 'VSS' || profile.org === 'WLC') && <td className='p-2'>{truck.client}</td>}
              <td className='p-2'>{truck.arrival.date}</td>
              <td className='p-2'>{truck.arrival.time}</td>
              <td className={`
                p-2
                ${!truck.cleared ? 'text-red-500' : ''}
                ${(truck.cleared && !truck.depature) ? 'text-yellow-500' : ''}
              `}>
                {!truck.cleared && 'waiting'}
                {(truck.cleared && !truck.depature) && 'offloaded'}
                {(truck.cleared && truck.depature) && truck.depature.date}
              </td>
              <td className={`
                p-2
                ${!truck.cleared ? 'text-red-500' : ''}
                ${(truck.cleared && !truck.depature) ? 'text-yellow-500' : ''}
              `}>
                {!truck.cleared && 'waiting'}
                {(truck.cleared && !truck.depature) && 'offloaded'}
                {(truck.cleared && truck.depature) && truck.depature.time}
              </td>
              <td className={`
                p-2
                ${!truck.cleared ? 'text-red-500' : ''}
                ${(truck.cleared && !truck.depature) ? 'text-yellow-500' : ''}
              `}>
                {!truck.cleared && 'waiting'}
                {(truck.cleared && !truck.depature) && 'offloaded'}
                {(truck.cleared && truck.depature) && duration+' Days'}
              </td>
              <td className='p-2 flex text-white'>
                {profile.org === 'VSS' && 
                  <div>
                    {!truck.cleared && <button className='rounded px-2 py-1 bg-yellow-400 cursor-not-allowed'>Not Cleared</button>}
                    {(truck.cleared && !truck.depature) && 
                      <button className='rounded px-2 py-1 bg-green-400' onClick={() => checkOut(truck._id)}>
                        {checkOutloading ? "Loading..." : "Cleared"}
                      </button>}
                    {(truck.cleared && truck.depature) && 
                      <button className='rounded cursor-not-allowed px-2 py-1 bg-red-400'>
                        Depatured
                      </button>
                    }
                  </div>
                }
                {profile.org !== 'VSS' && 
                  <div>
                    {!truck.cleared && 
                      <button className='rounded px-2 py-1 bg-yellow-400' onClick={() => clearForDispatchFn(truck._id)}>
                        {clearOutloading ? 'Loading...' : 'Releas'}
                      </button>
                    }
                    {(truck.cleared && !truck.depature) && <button className='rounded px-2 py-1 bg-green-400 cursor-not-allowed'>Cleared</button>}
                    {(truck.cleared && truck.depature) && 
                      <button className='rounded cursor-not-allowed px-2 py-1 bg-red-400'>
                        Depatured
                      </button>
                    }
                  </div>
                }
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    {message && <div className='p-8 text-xl'>{message}</div>}
    </>
  )
}
