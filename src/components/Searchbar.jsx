import { clients } from "../assets/data";
import { useGlobalContext } from "../contexts/GlobalContextProvider";

export default function Searchbar({setSelectedDate, handleSearch}) {

  const { profile } = useGlobalContext()

  return (
    <div className="flex">
      {profile && (profile.org === 'VSS' || profile.org === 'WLC') &&
        <select className="flex h-12 focus:border-none focus:outline-none px-4 bg-white">
          <option value="all">CLIENTS</option>
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
      <div className="flex h-12 w-[350px] bg-white">
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
