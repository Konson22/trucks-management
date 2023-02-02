import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import { useGlobalContext } from './contexts/GlobalContextProvider';
import Dashboard from "./pages/dashboard/Dashboard";
import TrucksRegisterForm from './pages/forms/TrucksRegisterForm';


function App() {

  const { showForm } = useGlobalContext()

  return (
    <div className="app-wraper">
      {showForm && <TrucksRegisterForm />}
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  );
}




export default App;