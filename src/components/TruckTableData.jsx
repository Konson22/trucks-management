import { useGlobalContext } from "../contexts/GlobalContextProvider"

export default function TruckTableData({data}) {

    const { profile, checkOut } = useGlobalContext()

  return (
    <table className="w-full">
        <thead className='bg-gray-300'>
            <tr>
                <td className='px-2 py-3 text-left border border-white'>Truck No</td>
                <td className='px-2 py-3 text-left border border-white'>Driver Name</td>
                <td className='px-2 py-3 text-left border border-white'>Contact</td>
                <td className='px-2 py-3 text-left border border-white'>Company</td>
                <td className='px-2 py-3 text-left border border-white'>Purpose</td>
                {profile && (profile.org === 'VSS' || profile.org === 'WLC') && <td className='px-2 py-3 text-left border border-white'>Client</td>}
                <td className='px-2 py-3 text-left border border-white'>Arrival Date</td>
                <td className='px-2 py-3 text-left border border-white'>Time in</td>
                <td className='px-2 py-3 text-left border border-white'>Depature Date</td>
                <td className='px-2 py-3 text-left border border-white'>Time out</td>
                <td className='px-2 py-3 text-left border border-white'>Duration</td>
                <td className='px-2 py-3 text-left border border-white'>Actions</td>
            </tr>
        </thead>
        <tbody>
        {profile && data.length >= 1 ? data.map(row => {
            const duration = row.depature && parseInt(row.depature.date.split('/').join('')) - parseInt(row.arrival.date.split('/').join(''))
            return(
                <tr  className='hover:bg-gray-100 border-b' key={row._id}>
                    <td className='p-2'>{row.plate_no}</td>
                    <td className='p-2'>{row.driver_name}</td>
                    <td className='p-2'>{row.contact}</td>
                    <td className='p-2'>{row.company}</td>
                    <td className='p-2'>{row.purpuse}</td>
                    {(profile.org === 'VSS' || profile.org === 'WLC') && <td className='p-2'>{row.client}</td>}
                    <td className='p-2'>{row.arrival.date}</td>
                    <td className='p-2'>{row.arrival.time}</td>
                    <td className='p-2'>{row.depature ? row.arrival.date : 'Waiting'}</td>
                    <td className='p-2'>{row.depature ? row.arrival.time : 'Waiting'}</td>
                    <td className='p-2'>{row.depature ? duration+' Days' : 'Waiting'}</td>
                    <td className='p-2 flex text-white'>
                        {profile.org === 'VSS' && <button 
                            className={`
                            py-1 px-2 text-white ${row.depature ? 'bg-red-500 cursor-not-allowed' : 'bg-yellow-500'} 
                            mr-2 rounded cursor-pointer
                            `} 
                            onClick={() => checkOut(row._id)}
                        >
                            Check out
                        </button>}
                        {(profile.org !== 'VSS') && <button 
                            className={`
                            py-1 px-2 text-white bg-green-500 
                            mr-2 rounded cursor-pointer
                            `} 
                            onClick={() => checkOut(row._id)}
                        >
                            Clear out
                        </button>}
                    </td>
                </tr>
            )
        }) : 'No data' }
        </tbody>
    </table>
  )
}
