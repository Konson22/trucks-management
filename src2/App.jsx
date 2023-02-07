import { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom'
import { ProtectedRoutes } from './hooks/ProtectedRoutes';
import Dashboard from './pages/Home';
import PrivateVehicles from './pages/dashboard/PrivateVehicles';
import Login from "./pages/forms/Login";
import Gatepass from './pages/Gatepass';
import Missing from './pages/Missing';


function App() {

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
    <div className='app-wraper'>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/vehicles' element={<PrivateVehicles />} />
          <Route path='/gatepass' element={<Gatepass />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Missing />} />
      </Routes>
    </div>
    </Suspense>
  );
}




export default App;