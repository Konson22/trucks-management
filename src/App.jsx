import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import { useGlobalContext } from './contexts/GlobalContextProvider';
import RecordsContextProvider from './contexts/RecordsContextProvider';
// import { ProtectedRoutes } from './hooks/ProtectedRoutes';
import Dashboard from "./pages/dashboard";
import Login from "./pages/forms/Login";
import TrucksRegisterForm from './pages/forms/TrucksRegisterForm';


function App() {

  const { showForm } = useGlobalContext()

  return (
    <div className='app-wraper'>
      <RecordsContextProvider>
        {showForm && <TrucksRegisterForm />}
        <Navbar />
      <Routes>
        {/* <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />} />
        </Route> */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </RecordsContextProvider>
    </div>
  );
}




export default App;