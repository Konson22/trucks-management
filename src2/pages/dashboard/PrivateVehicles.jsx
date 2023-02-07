import { useState, useEffect } from "react"
import Searchbar from "../../components/Searchbar"
import { useRecordsContext } from "../../contexts/RecordsContextProvider"


export default function PrivateVehicles() {

  const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))
  
  const { loading, error, data } = useRecordsContext()
  const [message, setMessage] = useState('')
  const [records, setRecords] = useState([])


  useEffect(() => {
    if(data.length >= 1){
      setRecords(data)
    }
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
      <div className="flex items-center justify-between my-6 mx-3">
        <div className="">
          <h1 className="text-2xl">VEHICLES REGISTERATION LOG</h1>
        </div>
        <Searchbar 
            handleSelectSearch={handleSelectSearch} 
            setSelectedDate={handleSearchByDate}
            handleSearch={handleSearch} profile={profile} 
            recordTitle={`${profile.org} VEHICLES`}
        />
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

  // const { checkOut, clearForDispatchFn } = useRecordsContext()

  return (
    <>
    <table className="w-full">
      <thead className='bg-gray-300'>
        <tr>
          <td className='px-2 py-3 text-left border border-white'>Unit</td>
          <td className='px-2 py-3 text-left border border-white'>Date out</td>
          <td className='px-2 py-3 text-left border border-white'>Date in</td>
          <td className='px-2 py-3 text-left border border-white'>Guard</td>
          <td className='px-2 py-3 text-left border border-white'>Time out</td>
          <td className='px-2 py-3 text-left border border-white'>Time in</td>
          <td className='px-2 py-3 text-left border border-white'>Duration</td>
          <td className='px-2 py-3 text-left border border-white'>Guard</td>
          <td className='px-2 py-3 text-left border border-white'>Actions</td>
        </tr>
      </thead>
     
    </table>
    <p className="text-red-50 text-xl">Gonna be ready soon Still under work</p>
    {message && <div className='p-8 text-xl'>{message}</div>}
    </>
  )
}
