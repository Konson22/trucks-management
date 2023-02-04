import { useState, useEffect } from "react"
import Searchbar from "../../components/Searchbar"
import { useRecordsContext } from "../../contexts/RecordsContextProvider"
import axiosInstance from "../../hooks/axiosInstance"


export default function DashboardPage() {

  const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))
  
  // const { loading, error, data } = useRecordsContext()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [records, setRecords] = useState([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const fetchMessages = async() => {
      setLoading(true)
      try {
        const response = await axiosInstance.post('/records', {user:profile.org}, {
        // const response = await axios('https://rose-drab-seahorse.cyclic.app/records', {
          signal:controller.signal,
        }).then(res => res);
        if(isMounted){
          setRecords(response.data)
        }
      } catch (error) {
        setError(error?.response?.data)
      } finally{
        setLoading(false)
      }
    }
    profile && fetchMessages();

    return () => {
      isMounted = false
      controller.abort()
    }
    // if(!loading && !error && data.length >= 1){
    //   setRecords(data)
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSearch = str => {
    const results = records.filter(rec => rec.plate_no.toLowerCase().startsWith(str.toLowerCase()))
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
    const results = records.filter(rec => rec.arrival.date === myDate)
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
      setRecords(records)
    }else{
      const results = records.filter(rec => rec.client === value)
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
      <div className="flex items-center justify-between my-6 mx-3">
        <div className="">
          <h1 className="text-2xl">{profile && profile.org} Trucks 20</h1>
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

  const { checkOut, clearForDispatchFn } = useRecordsContext()

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
            <tr  className='hover:bg-gray-100 border-b' key={truck._id}>
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
                ${!truck.status ? 'text-red-500' : ''}
                ${(truck.status && !truck.depature) ? 'text-yellow-500' : ''}
              `}>
                {!truck.status && 'waiting'}
                {(truck.status && !truck.depature) && 'offloaded'}
                {(truck.status && truck.depature) && truck.depature.date}
              </td>
              <td className={`
                p-2
                ${!truck.status ? 'text-red-500' : ''}
                ${(truck.status && !truck.depature) ? 'text-yellow-500' : ''}
              `}>
                {!truck.status && 'waiting'}
                {(truck.status && !truck.depature) && 'offloaded'}
                {(truck.status && truck.depature) && truck.depature.time}
              </td>
              <td className={`
                p-2
                ${!truck.status ? 'text-red-500' : ''}
                ${(truck.status && !truck.depature) ? 'text-yellow-500' : ''}
              `}>
                {!truck.status && 'waiting'}
                {(truck.status && !truck.depature) && 'offloaded'}
                {(truck.status && truck.depature) && duration+' Days'}
              </td>
              {/* <td className='p-2'>{truck.depature ? duration+' Days' : 'Waiting'}</td> */}
              <td className='p-2 flex text-white'>
                  {profile.org === 'VSS' && 
                    <button className={`
                        py-1 px-2 text-white 
                        ${!truck.status ? 'bg-red-500 cursor-not-allowed' : ''}
                        ${(truck.status && !truck.depature) ? 'bg-yellow-500 cursor-not-allowed' : ''}
                        ${(truck.status && truck.depature) ? 'bg-green-500 cursor-not-allowed' : ''}
                        mr-2 rounded
                      `} 
                      disabled={(!truck.status || truck.depature) && true}
                      onClick={() => checkOut(truck._id)}
                    >
                      {!truck.status && 'Not cleared'}
                      {(truck.status && !truck.depature) && 'Ready to go'}
                      {(truck.status && truck.depature) && 'Dispatched'}
                    </button>
                  }
                  {(profile.org !== 'VSS') && <button 
                      className={`
                        py-1 px-2 text-white
                        ${!truck.status ? 'bg-red-500 cursor-not-allowed' : ''}
                        ${(truck.status && !truck.depature) ? 'bg-yellow-500 cursor-not-allowed' : ''}
                        ${(truck.status && truck.depature) ? 'bg-green-500 cursor-not-allowed' : ''}
                        mr-2 rounded
                      `} 
                      // disabled={(truck.status || truck.depature) && true}
                      onClick={() => clearForDispatchFn(truck._id)}
                  >
                    {!truck.status && 'Not cleared'}
                    {(truck.status && !truck.depature) && 'Ready to go'}
                    {(truck.status && truck.depature) && 'Dispatched'}
                    {/* {truck.depature && 'Left'} */}
                  </button>}
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
