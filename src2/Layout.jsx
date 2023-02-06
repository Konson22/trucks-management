import {Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/dashboard/Dashboard";


export default function Layout() {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
    </Routes>
  )
}
