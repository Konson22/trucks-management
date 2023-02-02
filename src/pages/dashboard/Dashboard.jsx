import { useEffect, useState } from "react"
import { clients } from "../../assets/data"
import { useGlobalContext } from "../../contexts/GlobalContextProvider"

export default function Dashboard() {

  const { loading, error, trucksData } = useGlobalContext()
  const [selectedDate, setSelectedDate] = useState(null)
  const [data, setData] = useState(trucksData)

  useEffect(() => {
    if(!loading && trucksData.length >= 1){
      setData(trucksData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, trucksData])

  useEffect(() => {
    if(selectedDate){
      // const result = selectedDate.split('-').reverse().join('/')
      // trucksData.filter(truck => truck.)

      // const result Date(selectedDate)
      // console.log(result)
    }
  }, [selectedDate])



  return (
    <div className='px-[3%] mt-4'>
      <div className="flex items-center justify-between my-6">
        <div className="">
          <h1 className="text-2xl">Trucks ({trucksData.length})</h1>
        </div>
        <div className="flex">
          <select className="flex h-12 focus:border-none focus:outline-none px-4 bg-white">
            <option value="all">CLIENTS</option>
            {clients.map(client => (
              <option value={client} key={client}>{client}</option>
            ))}
          </select>
          <div className="h-12 bg-white pr-3 mx-2">
            <input className='h-full flex-1 focus:border-none focus:outline-none bg-transparent pl-3' type="date"
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="flex h-12 w-[350px] bg-white">
            <input className='h-full flex-1 focus:border-none focus:outline-none bg-transparent pl-3' type="search" placeholder="Enter Truck no" />
            <button className="h-full bg-orange-400 px-3">Search</button>
          </div>
        </div>
      </div>
      <div className="bg-white">
        {loading && <div className='px-8 text-xl'>Loading...</div>}
        {error && <div className='px-8 text-xl'>Error</div>}
        {data.length >= 1 ? 
          <table className="w-full">
            <thead className='bg-gray-300'>
              <tr>
                <th className='px-2 py-3 text-left border border-white'>Truck No</th>
                <th className='px-2 py-3 text-left border border-white'>Driver Name</th>
                <th className='px-2 py-3 text-left border border-white'>Company</th>
                <th className='px-2 py-3 text-left border border-white'>Client</th>
                <th className='px-2 py-3 text-left border border-white'>Purpose</th>
                <th className='px-2 py-3 text-left border border-white'>Arrival Date</th>
                <th className='px-2 py-3 text-left border border-white'>Arrival Time</th>
                <th className='px-2 py-3 text-left border border-white'>Depature Date</th>
                <th className='px-2 py-3 text-left border border-white'>Depature Time</th>
                <th className='px-2 py-3 text-left border border-white'>Duration</th>
                <th className='px-2 py-3 text-left border border-white'>Actions</th>
              </tr>
            </thead>
            <TableBody data={data} />
          </table>
          : 'No Records'
        }
      </div>
    </div>
  )
}

function TableBody({data}){

  const { checkOut } = useGlobalContext()

  return(
    <tbody>
      {data.map(row => {
        const duration = row.depature && parseInt(row.depature.date.split('/').join('')) - parseInt(row.arrival.date.split('/').join(''))
        // console.log(duration)
        return(
        <tr  className='hover:bg-gray-100 border-b' key={row._id}>
          <td className='p-2'>{row.plate_no}</td>
          <td className='p-2'>{row.driver_name}</td>
          <td className='p-2'>{row.company}</td>
          <td className='p-2'>{row.client}</td>
          <td className='p-2'>{row.purpuse}</td>
          <td className='p-2'>{row.arrival.date}</td>
          <td className='p-2'>{row.arrival.time}</td>
          <td className='p-2'>{row.depature ? row.arrival.date : 'Waiting'}</td>
          <td className='p-2'>{row.depature ? row.arrival.time : 'Waiting'}</td>
          <td className='p-2'>{row.depature ? duration+' Days' : 'Waiting'}</td>
          <td className='p-2 flex text-white'>
            <button 
              className={`
                py-1 px-2 text-white ${row.depature ? 'bg-red-500 cursor-not-allowed' : 'bg-yellow-500'} 
                mr-2 rounded cursor-pointer
              `} 
              onClick={() => checkOut(row._id)}
            >
              Check out
            </button>
          </td>
        </tr>
        )
      })}
    </tbody>
  )
}
// function TableRow({data, keyId}){

//   const { checkOut } = useGlobalContext()

//   const arrival = new Date(data.arrival.arrivalDate)
//   const depature = data.depature && new Date(data.depature.depatureDate)
//   const offloadDate = data.offloadDate && new Date(data.offloadDate)

//   const now = Date.now()

//   const duration =  offloadDate && new Date(now).getDate() - offloadDate.getDate()


//   return(
//     <tr  className='hover:bg-gray-100 border-b' key={keyId}>
//       <td className='p-2'>{data.plate_no}</td>
//       <td className='p-2'>{data.driver_name}</td>
//       <td className='p-2'>{data.company}</td>
//       <td className='p-2'>{data.client}</td>
//       <td className='p-2'>{data.purpuse}</td>
//       <td className='p-2'>{arrival.toLocaleDateString()}</td>
//       <td className='p-2'>{arrival.toLocaleTimeString()}</td>
//       <td className='p-2'>{arrival.toLocaleDateString()}</td>
//       <td className='p-2'>{depature ? depature.toLocaleDateString() : 'Pending'}</td>
//       <td className='p-2'>{depature ? depature.toLocaleTimeString() : 'Pending'}</td>
//       <td className='p-2'>{`${offloadDate ? duration+' Days' : 'waiting...'}`}</td>
//       <td className='p-2 flex'>
//         <button className={`py-1 px-2 ${!depature ? 'bg-green-500' : 'bg-blue-500'} mr-2 rounded cursor-pointer`} onClick={() => checkOut(data._id)}>Check out</button>
//       </td>
//     </tr>
//   )
// }