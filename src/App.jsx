import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import { useGlobalContext } from './contexts/GlobalContextProvider';
import { ProtectedRoutes } from './hooks/ProtectedRoutes';
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/forms/Login";
import TrucksRegisterForm from './pages/forms/TrucksRegisterForm';


function App() {

  const { showForm } = useGlobalContext()

  return (
    <div className='app-wraper'>
      <Navbar />
      {showForm && <TrucksRegisterForm />}
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}




export default App;