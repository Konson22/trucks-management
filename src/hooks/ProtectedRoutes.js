import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGlobalContext } from '../contexts/GlobalContextProvider';
import RecordsContextProvider from '../contexts/RecordsContextProvider';
import TrucksRegisterForm from '../pages/forms/TrucksRegisterForm';

const localStorageData = JSON.parse(localStorage.getItem('wlc-user-auth'))

export function ProtectedRoutes() {

    const location = useLocation()

    return localStorageData ?
        <Layout>
            <Outlet />
        </Layout>
        : <Navigate to='/login' state={{from:location}} replace />
}


function Layout({children}){

    const { showForm } = useGlobalContext()

    return(
        <RecordsContextProvider>
            {showForm && <TrucksRegisterForm />}
            <Navbar />
            {children}
        </RecordsContextProvider>
    )
}

export function AuthRoutes() {

    const location = useLocation()

    return !localStorageData 
    ? <Outlet />  
    : <Navigate to='/' state={{from:location}} replace />
}
