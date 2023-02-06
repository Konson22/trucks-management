import { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom'
import { ProtectedRoutes } from './hooks/ProtectedRoutes';
import Dashboard from "./pages/dashboard";
import PrivateVehicles from './pages/dashboard/PrivateVehicles';
import Login from "./pages/forms/Login";


function App() {

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
    <div className='app-wraper'>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/vehicles' element={<PrivateVehicles />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
    </Suspense>
  );
}




export default App;