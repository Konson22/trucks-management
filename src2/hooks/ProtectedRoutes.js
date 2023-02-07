import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Layout from '../Layout';


export function ProtectedRoutes() {
    
    const profile = JSON.parse(localStorage.getItem('wlc-user-auth'))
    const location = useLocation()

    return profile ?
        <Layout>
            <Outlet />
        </Layout>
        : <Navigate to='/login' state={{from:location}} replace />
}




