import { useEffect, useState } from "react"
import { clients } from "../../assets/data"
import { useGlobalContext } from "../../contexts/GlobalContextProvider"


export default function DashboardPage() {

    
  const { loading, error, trucksData } = useGlobalContext()
  const [selectedDate, setSelectedDate] = useState(null)
  const [data, setData] = useState(trucksData)

  console.log(selectedDate)

  useEffect(() => {
    if(!loading && trucksData.length >= 1){
      setData(trucksData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, trucksData])


  return (
    <div className="app-container px-[1.5%]">
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
        <div className="app-content bg-white">
            {loading && <div className='px-8 text-xl'>Loading...</div>}
            {error && <div className='px-8 text-xl'>Error</div>}
            {data.length >= 1 ? 
            <table className="w-full">
                <thead className='bg-gray-300'>
                    <tr>
                        <td className='px-2 py-3 text-left border border-white'>Truck No</td>
                        <td className='px-2 py-3 text-left border border-white'>Driver Name</td>
                        <td className='px-2 py-3 text-left border border-white'>Contact</td>
                        <td className='px-2 py-3 text-left border border-white'>Company</td>
                        <td className='px-2 py-3 text-left border border-white'>Purpose</td>
                        <td className='px-2 py-3 text-left border border-white'>Client</td>
                        <td className='px-2 py-3 text-left border border-white'>Arrival Date</td>
                        <td className='px-2 py-3 text-left border border-white'>Time in</td>
                        <td className='px-2 py-3 text-left border border-white'>Depature Date</td>
                        <td className='px-2 py-3 text-left border border-white'>Time out</td>
                        <td className='px-2 py-3 text-left border border-white'>Duration</td>
                        <td className='px-2 py-3 text-left border border-white'>Actions</td>
                    </tr>
                </thead>
                <TableBody data={data} />
                <TableBody data={data} />
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
          return(
          <tr  className='hover:bg-gray-100 border-b' key={row._id}>
            <td className='p-2'>{row.plate_no}</td>
            <td className='p-2'>{row.driver_name}</td>
            <td className='p-2'>{row.contact}</td>
            <td className='p-2'>{row.company}</td>
            <td className='p-2'>{row.purpuse}</td>
            <td className='p-2'>{row.client}</td>
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