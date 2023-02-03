import { Outlet, Navigate, useLocation } from 'react-router-dom';

const localStorageData = JSON.parse(localStorage.getItem('wlc-user-auth'))

export function ProtectedRoutes() {

    const location = useLocation()

    return localStorageData 
    ? <Outlet />  
    : <Navigate to='/login' state={{from:location}} replace />
}
