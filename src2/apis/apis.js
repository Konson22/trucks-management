import axiosInstance from "../hooks/axiosInstance"

export const authUser = () => {
    const verifyPromise = verifyToken()
    return wrapePromise(verifyPromise)
}

const wrapePromise = (promise) => {
    let status = 'pending'

    let results;

    let suspender = promise.then(res => {
            status = 'success';
            results = res
        },
        err => {
            status = 'error';
            results = err

        }
    )

    return{
        read(){
            if(status === 'pending'){
                throw suspender
            }else if(status === 'error'){
                throw results
            }else if(status === 'success'){
                throw results
            }
        }
    }
}


const verifyToken = () => {
    return axiosInstance('/auth').then(res => res.data)
}