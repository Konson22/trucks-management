import { clients } from "../../assets/data"

export default function SubNav({setSelectedDate}) {
  return (
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
  )
}
