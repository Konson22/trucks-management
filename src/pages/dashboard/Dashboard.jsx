import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar";
import TruckTableData from "../../components/TruckTableData";
import { useGlobalContext } from "../../contexts/GlobalContextProvider";


export default function Dashboard() {

  const { loading, error, trucksData, profile } = useGlobalContext()
  // const [selectedDate, setSelectedDate] = useState(null)
  const [data, setData] = useState([])


  useEffect(() => {
    (!loading) && setData(trucksData)
  }, [loading, trucksData])
  // console.log(selectedDate)

  useEffect(() => {
    if(!loading && trucksData.length >= 1){
      setData(trucksData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, trucksData, profile])


  const handleSearch = str => {
    const results = trucksData.filter(rec => rec.plate_no.toLowerCase().includes(str.toLowerCase()))
    setData(results)
  }
  
  
  const handleSearchByDate = dateStr => {
    console.log(dateStr)
    // const results = trucksData.filter(rec => rec.plate_no.toLowerCase().includes(str.toLowerCase()))
    // setData(results)
  }

  return (
    <div className='app-container px-[3%]'>
      <div className="flex items-center justify-between my-6">
        <div className="">
          <h1 className="text-2xl">{profile && profile.org} Trucks 20</h1>
        </div>
        <Searchbar setSelectedDate={handleSearchByDate} handleSearch={handleSearch} />
      </div>
      <div className="app-content bg-white">
        {loading && <div className='px-8 text-xl'>Loading...</div>}
        {error && <div className='px-8 text-xl'>Error</div>}
        {(!loading && !error ) && <TruckTableData data={data} />}
      </div>
    </div>
  )
}
