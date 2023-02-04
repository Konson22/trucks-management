import {Routes, Route} from 'react-router-dom'
import { ProtectedRoutes } from './hooks/ProtectedRoutes';
import Dashboard from "./pages/dashboard";
import Login from "./pages/forms/Login";


function App() {

  return (
    <div className='app-wraper'>
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